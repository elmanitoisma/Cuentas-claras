(()=>{
'use strict';
const eur=(n,d=0)=>new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:d}).format(Number.isFinite(n)?n:0);
const pct=n=>new Intl.NumberFormat('es-ES',{maximumFractionDigits:1}).format(Number.isFinite(n)?n:0)+' %';
const num=id=>Math.max(0,parseFloat(document.getElementById(id)?.value)||0);
const raw=id=>parseFloat(document.getElementById(id)?.value)||0;
const out=html=>{const el=document.querySelector('[data-output]');if(el)el.innerHTML=html};
const metric=(label,value)=>`<div class="metric"><span>${label}</span><strong>${value}</strong></div>`;
const metrics=items=>`<div class="metrics">${items.map(([a,b])=>metric(a,b)).join('')}</div>`;
const note=t=>`<p class="note">${t}</p>`;
const notice=(title,text,cls='')=>`<div class="notice ${cls}"><strong>${title}</strong>${text}</div>`;
function chart(values,contrib){
  const W=700,H=230,p=9,max=Math.max(...values,1),n=Math.max(values.length-1,1);
  const X=i=>p+i*(W-2*p)/n,Y=x=>H-p-x*(H-2*p)/max;
  const pts=a=>a.map((x,i)=>`${X(i).toFixed(1)},${Y(x).toFixed(1)}`).join(' ');
  const area=pts(values)+` ${X(n)},${H-p} ${X(0)},${H-p}`;
  return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Evolución estimada"><polygon points="${area}" fill="var(--teal-soft)"/><polyline points="${pts(values)}" fill="none" stroke="var(--teal)" stroke-width="3"/>${contrib?`<polyline points="${pts(contrib)}" fill="none" stroke="var(--gold)" stroke-width="2.5" stroke-dasharray="7 5"/>`:''}</svg>${contrib?'<div class="legend"><span><i style="background:var(--teal)"></i>Total</span><span><i style="background:var(--gold)"></i>Aportado</span></div>':''}`;
}
function annuityPayment(P,n,annual){const r=annual/1200;return r===0?P/n:P*r/(1-Math.pow(1+r,-n))}
function annuityPrincipal(payment,n,annual){const r=annual/1200;return r===0?payment*n:payment*(1-Math.pow(1+r,-n))/r}
let trackedCalculator=false;
const calculators={
  compound(){
    const ini=num('c-ini'),mes=num('c-mes'),years=Math.min(60,Math.max(1,Math.round(num('c-years')))),annual=num('c-rate'),r=annual/1200;
    let bal=ini,con=ini;const B=[bal],C=[con];
    for(let m=1;m<=years*12;m++){bal=bal*(1+r)+mes;con+=mes;if(m%12===0){B.push(bal);C.push(con)}}
    out(`<div class="big"><small>Capital estimado en ${years} años</small>${eur(bal)}</div>${metrics([['Aportado por ti',eur(con)],['Crecimiento estimado',eur(bal-con)],['Rentabilidad usada',pct(annual)]])}${chart(B,C)}${note('Escenario teórico con rentabilidad constante. No incluye impuestos, inflación, comisiones ni variaciones del mercado.')}`);
  },
  mortgage(){
    const P=num('m-amount'),years=Math.max(1,Math.round(num('m-years'))),annual=num('m-rate'),n=years*12,q=annuityPayment(P,n,annual),total=q*n,interest=Math.max(0,total-P),pc=total?P/total*100:0;
    out(`<div class="big"><small>Cuota mensual estimada</small>${eur(q,2)}</div>${metrics([['Capital',eur(P)],['Intereses totales',eur(interest)],['Total pagado',eur(total)]])}<div><div class="split"><b style="width:${pc}%;background:var(--teal)"></b><b style="width:${100-pc}%;background:var(--gold)"></b></div><div class="legend" style="margin-top:9px"><span><i style="background:var(--teal)"></i>Capital</span><span><i style="background:var(--gold)"></i>Intereses</span></div></div>${note('Cálculo con sistema francés, tipo constante y cuotas mensuales. No incluye comisiones, seguros, impuestos ni otros gastos asociados.')}`);
  },
  goal(){
    const target=num('g-target'),start=num('g-start'),years=Math.max(1,Math.round(num('g-years'))),annual=num('g-rate'),n=years*12,r=annual/1200,f=Math.pow(1+r,n);
    const monthly=Math.max(0,r===0?(target-start)/n:(target-start*f)*r/(f-1));const end=start*f+monthly*(r===0?n:(f-1)/r);const user=monthly*n;
    out(`<div class="big"><small>Aportación mensual estimada</small>${eur(monthly,2)}</div>${metrics([['Objetivo',eur(target)],['Aportaciones futuras',eur(user)],['Capital final estimado',eur(end)]])}${start*f>=target?notice('Objetivo ya cubierto por el escenario','Con la rentabilidad introducida, el capital inicial alcanzaría por sí solo el objetivo.'):note('Aportaciones al final de cada mes y rentabilidad constante. No incluye impuestos ni comisiones.')}`);
  },
  loan(){
    const P=num('l-amount'),months=Math.max(1,Math.round(num('l-months'))),annual=num('l-rate'),feePct=num('l-fee'),q=annuityPayment(P,months,annual),interest=q*months-P,fee=P*feePct/100,total=q*months+fee;
    out(`<div class="big"><small>Cuota mensual estimada</small>${eur(q,2)}</div>${metrics([['Intereses',eur(interest)],['Comisión inicial',eur(fee)],['Desembolso total',eur(total)]])}${note('Estimación con cuota constante y TIN. Para comparar ofertas reales, revisa la TAE y las condiciones completas de cada entidad.')}`);
  },
  deposit(){
    const P=num('d-amount'),months=Math.max(1,Math.round(num('d-months'))),annual=num('d-rate'),tax=num('d-tax'),gross=P*annual/100*months/12,withheld=gross*tax/100,net=gross-withheld;
    out(`<div class="big"><small>Interés neto estimado</small>${eur(net,2)}</div>${metrics([['Interés bruto',eur(gross,2)],['Retención usada',eur(withheld,2)],['Total al vencimiento',eur(P+net,2)]])}${notice('Supuesto fiscal configurable',`Has indicado una retención del ${pct(tax)}. Modifícala para probar otro escenario. La fiscalidad real depende de tu situación y de la normativa aplicable.`,'warn')}`);
  },
  car(){
    const income=num('car-income'),expenses=num('car-expenses'),down=num('car-down'),limit=num('car-limit'),months=Math.max(1,Math.round(num('car-months'))),annual=num('car-rate');
    const byIncome=income*limit/100,available=Math.max(0,income-expenses),payment=Math.min(byIncome,available),principal=annuityPrincipal(payment,months,annual),budget=down+principal,totalLoan=payment*months,interest=Math.max(0,totalLoan-principal),after=income-expenses-payment;
    out(`<div class="big"><small>Precio de coche en este escenario</small>${eur(budget)}</div>${metrics([['Cuota límite elegida',eur(payment,2)],['Financiación estimada',eur(principal)],['Intereses estimados',eur(interest)]])}${notice('Cómo se obtiene',`La herramienta limita la cuota al ${pct(limit)} de tus ingresos y, además, nunca supera el margen que queda tras los gastos que has introducido. Después calcula qué capital podría financiar esa cuota.`)}${after<0?notice('El escenario no cuadra','Los gastos introducidos ya superan el ingreso disponible.','negative'):note(`Margen mensual después de gastos y de la cuota modelada: ${eur(after,2)}. No es una recomendación de compra: es un escenario basado en el límite que tú has elegido.`)}`);
  },
  independence(){
    const income=num('i-income');const vals=['i-rent','i-bills','i-food','i-transport','i-debt','i-leisure','i-other'].map(num);const total=vals.reduce((a,b)=>a+b,0),left=income-total,rate=income?left/income*100:0;
    out(`<div class="big"><small>Margen mensual</small>${eur(left,2)}</div>${metrics([['Ingresos',eur(income)],['Gastos introducidos',eur(total)],['Margen sobre ingresos',pct(rate)]])}${left<0?notice('Déficit en este presupuesto',`Tus gastos superan los ingresos en ${eur(Math.abs(left),2)} al mes. Prueba a cambiar partidas para construir otro escenario.`,'negative'):notice('Presupuesto resultante',`Después de todas las partidas que has introducido quedarían ${eur(left,2)} al mes. Decide tú qué parte destinarías a ahorro, imprevistos u otros objetivos.`)}`);
  },
  emergency(){
    const exp=num('e-expenses'),months=Math.max(1,num('e-months')),saved=num('e-saved'),target=exp*months,missing=Math.max(0,target-saved),coverage=exp?saved/exp:0;
    out(`<div class="big"><small>Objetivo según ${months} meses elegidos</small>${eur(target)}</div>${metrics([['Ya tienes',eur(saved)],['Te faltaría',eur(missing)],['Cobertura actual',`${coverage.toFixed(1)} meses`]])}${note('Tú eliges cuántos meses quieres cubrir. La herramienta solo multiplica tus gastos esenciales mensuales por ese horizonte y compara el resultado con tu ahorro actual.')}`);
  },
  budget(){
    const income=num('b-income'),needs=num('b-needs'),wants=num('b-wants'),save=num('b-save'),sum=needs+wants+save;
    out(`<div class="big"><small>Ahorro / objetivos</small>${eur(income*save/100)}</div>${metrics([['Necesidades',eur(income*needs/100)],['Deseos',eur(income*wants/100)],['Total porcentajes',pct(sum)]])}${sum!==100?notice('Los porcentajes no suman 100 %',`Ahora mismo suman ${pct(sum)}. Puedes usarlos como simulación, pero quedará ${sum<100?'una parte sin asignar':'más presupuesto asignado que ingreso disponible'}.`,'warn'):note('El 50/30/20 es solo una plantilla de reparto. Los porcentajes son editables para adaptarlos a tu propio presupuesto.')}`);
  },
  homebuy(){
    const price=num('h-price'),downPct=num('h-down'),costPct=num('h-costs'),saved=num('h-saved'),down=price*downPct/100,costs=price*costPct/100,cash=down+costs,mortgage=Math.max(0,price-down),gap=saved-cash;
    out(`<div class="big"><small>Efectivo estimado necesario</small>${eur(cash)}</div>${metrics([['Entrada',eur(down)],['Otros costes estimados',eur(costs)],['Hipoteca teórica',eur(mortgage)]])}${gap>=0?notice('Ahorro suficiente para este supuesto',`Con los porcentajes introducidos sobrarían ${eur(gap)} respecto al efectivo calculado.`):notice('Ahorro pendiente',`Con los porcentajes introducidos faltarían ${eur(Math.abs(gap))} para cubrir entrada y costes estimados.`,'warn')}${note('Los gastos reales de compra dependen de la operación, la vivienda y tu situación. Por eso el porcentaje de costes es editable.')}`);
  }
};
function run(){const type=document.body.dataset.calc;if(type&&calculators[type]){calculators[type]();if(!trackedCalculator){track('calculator_view',{calculator:type});trackedCalculator=true}}}
document.querySelectorAll('[data-calc-input]').forEach(el=>el.addEventListener('input',run));

// Share/copy helpers
async function copyLink(){try{await navigator.clipboard.writeText(location.href);flash('Enlace copiado')}catch{flash('Copia la URL del navegador')}}
function flash(text){const b=document.querySelector('[data-copy]');if(!b)return;const old=b.textContent;b.textContent=text;setTimeout(()=>b.textContent=old,1600)}
document.querySelector('[data-copy]')?.addEventListener('click',copyLink);
document.querySelector('[data-share]')?.addEventListener('click',async()=>{if(navigator.share){try{await navigator.share({title:document.title,url:location.href})}catch{}}else copyLink()});

// Preserve organic campaign attribution locally; no data leaves the browser unless analytics is enabled.
const params=new URLSearchParams(location.search);const keys=['utm_source','utm_medium','utm_campaign','utm_content'];const attribution={};keys.forEach(k=>{if(params.get(k))attribution[k]=params.get(k)});try{if(Object.keys(attribution).length)localStorage.setItem('cc_attribution',JSON.stringify(attribution))}catch{}

// Optional GA4: disabled by default. Only loads after consent.
function gaId(){return window.CC_CONFIG?.GA_MEASUREMENT_ID?.trim()||''}
function loadGA(){const id=gaId();if(!id||window.__ccGaLoaded)return;window.__ccGaLoaded=true;const s=document.createElement('script');s.async=true;s.src=`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;document.head.appendChild(s);window.dataLayer=window.dataLayer||[];window.gtag=function(){dataLayer.push(arguments)};gtag('js',new Date());gtag('config',id,{anonymize_ip:true});}
function track(name,params={}){if(typeof window.gtag==='function')window.gtag('event',name,params)}
if(gaId()){
  let pref=null;try{pref=localStorage.getItem('cc_analytics_consent')}catch{} const box=document.querySelector('[data-cookie]');
  if(pref==='yes')loadGA(); else if(pref!=='no')box?.classList.add('show');
  document.querySelector('[data-cookie-accept]')?.addEventListener('click',()=>{try{localStorage.setItem('cc_analytics_consent','yes')}catch{}box?.classList.remove('show');loadGA()});
  document.querySelector('[data-cookie-reject]')?.addEventListener('click',()=>{try{localStorage.setItem('cc_analytics_consent','no')}catch{}box?.classList.remove('show')});
}
run();
})();
