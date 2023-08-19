import './styles/styles.scss';
import './styles/desktop.scss';

const billInput = document.getElementById('billInput');
const peopleInput = document.getElementById('peopleInput');
const percentageButtons = document.querySelectorAll('.percentage-button');
const customPercentageInput = document.querySelector('.custom-percentage-input');
const tipResult = document.querySelector('.tip-result');
const totalResult = document.querySelector('.total-result');
const errorMessage = document.querySelector('.error-message');
const resetButton = document.querySelector('.reset-button');

function calculateTip() {

  const billAmount = parseFloat(billInput.value);
  const numberOfPeople = parseInt(peopleInput.value);

  let tipPercentage = 0;
  if (customPercentageInput.value !== '') {
    tipPercentage = parseFloat(customPercentageInput.value);
  } else {
    percentageButtons.forEach(button => {
      if (button.classList.contains('active')) {
        tipPercentage = parseFloat(button.textContent);
      }
    });
  }

  if (isNaN(billAmount) || isNaN(numberOfPeople) || numberOfPeople <= 0) {
    tipResult.textContent = '$0.00';
    totalResult.textContent = '$0.00';
    errorMessage.classList.add('inactive');
    return;
  } else {
    errorMessage.classList.add('inactive');
  }

  const tipAmount = (billAmount * tipPercentage) / 100 / numberOfPeople;
  const totalAmount = (billAmount + (billAmount * tipPercentage) / 100) / numberOfPeople;

  tipResult.textContent = `${tipAmount.toFixed(2)}`;
  totalResult.textContent = `${totalAmount.toFixed(2)}`;
}

percentageButtons.forEach(button => {
  button.addEventListener('click', () => {
    percentageButtons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    customPercentageInput.value = '';
    calculateTip();
  });
});

customPercentageInput.addEventListener('input', () => {
  percentageButtons.forEach(button => button.classList.remove('active'));
  calculateTip();
});

billInput.addEventListener('input', calculateTip);
peopleInput.addEventListener('input', calculateTip);

peopleInput.addEventListener('blur', () => {
  if (peopleInput.value.trim() === '') {
    errorMessage.classList.remove('inactive');
  }
});

resetButton.addEventListener('click', () => {
  billInput.value = '';
  peopleInput.value = '';
  customPercentageInput.value = '';
  percentageButtons.forEach(button => button.classList.remove('active'));
  tipResult.textContent = '$0.00';
  totalResult.textContent = '$0.00';
  errorMessage.classList.add('inactive');
});