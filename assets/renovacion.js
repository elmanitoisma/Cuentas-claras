(() => {
  const panel = document.getElementById('comparar-plazos');
  const inputs = Array.from(panel.querySelectorAll('input'));
  const result = document.getElementById('ren-resultado');
  const euros = new Intl.NumberFormat('es-ES', {style: 'currency', currency: 'EUR'});
  const percent = new Intl.NumberFormat('es-ES', {minimumFractionDigits: 2, maximumFractionDigits: 4});

  function compare() {
    const [capital, annual, first, second] = inputs.map(input => input.valueAsNumber);
    if (inputs.some(input => !Number.isFinite(input.valueAsNumber) || !input.validity.valid) || capital <= 0) {
      result.textContent = 'Introduce un capital mayor que cero y completa los tres tipos con valores iguales o superiores a cero.';
      return;
    }
    const fixedInterest = capital * annual / 100;
    const renewalInterest = capital * (first + second) / 200;
    const threshold = 2 * annual - first;
    const comparison = threshold < 0
      ? 'Solo el primer semestre ya supera los intereses del depósito anual.'
      : 'Para igualarlos se necesita un ' + percent.format(threshold) + ' % TIN al renovar.';
    result.textContent = 'El depósito anual paga ' + euros.format(fixedInterest) +
      ' brutos y los dos semestres suman ' + euros.format(renewalInterest) + '. ' + comparison;
  }
  panel.addEventListener('input', compare);
  compare();
})();
