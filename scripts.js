document.addEventListener('DOMContentLoaded', function() {
    const homePriceInput = document.getElementById('home-price');
    const downPaymentInput = document.getElementById('down-payment');
    const downPaymentPercentInput = document.getElementById('down-payment-percent');
    const interestRateInput = document.getElementById('interest-rate');
    const loanTermSelect = document.getElementById('loan-term');
    const propertyTaxInput = document.getElementById('property-tax');
    const hoaDuesInput = document.getElementById('hoa-dues');
    const totalPaymentElem = document.getElementById('number');
    const principalInterestElem = document.getElementById('principal-interest');
    const propertyTaxesElem = document.getElementById('property-taxes');
    const hoaDuesElem = document.getElementById('hoa-dues');
  
    function calculateMortgage() {
      const homePrice = parseFloat(homePriceInput.value.replace(/[^0-9.]/g, '')) || 0;
      const downPayment = parseFloat(downPaymentInput.value.replace(/[^0-9.]/g, '')) || 0;
      const downPaymentPercent = parseFloat(downPaymentPercentInput.value.replace(/[^0-9.]/g, '')) || 0;
      const interestRate = parseFloat(interestRateInput.value.replace(/[^0-9.]/g, '')) || 0;
      const loanTerm = parseInt(loanTermSelect.value, 10) || 30;
      const propertyTax = parseFloat(propertyTaxInput.value.replace(/[^0-9.]/g, '')) || 0;
      const hoaDues = parseFloat(hoaDuesInput.value.replace(/[^0-9.]/g, '')) || 0;
  
      // Handle down payment percent if provided
      if (downPaymentPercent > 0) {
        downPayment = (homePrice * (downPaymentPercent / 100));
      }
  
      const principal = homePrice - downPayment;
      const monthlyInterestRate = (interestRate / 100) / 12;
      const numberOfPayments = loanTerm * 12;
  
      // Avoid division by zero
      if (numberOfPayments <= 0 || monthlyInterestRate < 0) {
        totalPaymentElem.textContent = '$0.00';
        principalInterestElem.textContent = '$0.00 (0%)';
        propertyTaxesElem.textContent = '$0.00 (0%)';
        hoaDuesElem.textContent = '$0.00 (0%)';
        return;
      }
  
      // Calculate the monthly mortgage payment
      const monthlyPayment = (principal * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments));
  
      const totalMonthlyPayment = (monthlyPayment || 0) + propertyTax + hoaDues;
      const principalPercentage = ((monthlyPayment || 0) / totalMonthlyPayment) * 100;
      const propertyTaxPercentage = (propertyTax / totalMonthlyPayment) * 100;
      const hoaDuesPercentage = (hoaDues / totalMonthlyPayment) * 100;
  
      totalPaymentElem.textContent = `$${totalMonthlyPayment.toFixed(2)}`;
      principalInterestElem.textContent = `$${(monthlyPayment || 0).toFixed(2)} (${principalPercentage.toFixed(0)}%)`;
      propertyTaxesElem.textContent = `$${propertyTax.toFixed(2)} (${propertyTaxPercentage.toFixed(0)}%)`;
      hoaDuesElem.textContent = `$${hoaDues.toFixed(2)} (${hoaDuesPercentage.toFixed(0)}%)`;
    }
  
    // Add event listeners to update calculation on input change
    homePriceInput.addEventListener('input', calculateMortgage);
    downPaymentInput.addEventListener('input', calculateMortgage);
    downPaymentPercentInput.addEventListener('input', calculateMortgage);
    interestRateInput.addEventListener('input', calculateMortgage);
    loanTermSelect.addEventListener('change', calculateMortgage);
    propertyTaxInput.addEventListener('input', calculateMortgage);
    hoaDuesInput.addEventListener('input', calculateMortgage);
  
    // Initialize calculation on page load
    calculateMortgage();
  
    // Reset functionality
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', function() {
      homePriceInput.value = '';
      downPaymentInput.value = '';
      downPaymentPercentInput.value = '';
      interestRateInput.value = '';
      loanTermSelect.value = '30';
      propertyTaxInput.value = '';
      hoaDuesInput.value = '';
  
      calculateMortgage();
    });
  });
  