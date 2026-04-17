let display = document.getElementById('result');
let currentInput = '0';
let previousInput = '';
let operator = null;
let shouldResetDisplay = false;

function updateDisplay() {
  display.textContent = currentInput;
}

function handleNumber(number) {
  if (shouldResetDisplay) {
    currentInput = '';
    shouldResetDisplay = false;
  }
  if (currentInput === '0' && number !== '0') {
    currentInput = number;
  } else if (currentInput.length < 12) {
    currentInput += number;
  }
  updateDisplay();
}

function handleOperator(nextOperator) {
  const inputValue = parseFloat(currentInput);

  if (operator && shouldResetDisplay) {
    operator = nextOperator;
    return;
  }

  if (previousInput === '') {
    previousInput = inputValue;
  } else if (operator) {
    const result = calculate(previousInput, inputValue, operator);
    currentInput = String(result);
    previousInput = result;
  }

  shouldResetDisplay = true;
  operator = nextOperator;
  updateDisplay();
}

function calculate(first, second, operator) {
  switch (operator) {
    case '+': return first + second;
    case '−': return first - second;
    case '×': return first * second;
    case '÷': return second !== 0 ? first / second : 'Erro';
    default: return second;
  }
}

function handleEquals() {
  if (operator === null) return;

  let inputValue = parseFloat(currentInput);
  let result = calculate(previousInput, inputValue, operator);

  if (result === 'Erro') {
    currentInput = 'Erro';
  } else {
    currentInput = String(Number(result.toFixed(8))); // evita números muito longos
  }

  operator = null;
  previousInput = '';
  shouldResetDisplay = true;
  updateDisplay();
}

function resetCalculator() {
  currentInput = '0';
  previousInput = '';
  operator = null;
  shouldResetDisplay = false;
  updateDisplay();
}

function toggleSign() {
  if (currentInput === '0' || currentInput === 'Erro') return;
  currentInput = String(parseFloat(currentInput) * -1);
  updateDisplay();
}

function handlePercent() {
  if (currentInput === '0' || currentInput === 'Erro') return;
  currentInput = String(parseFloat(currentInput) / 100);
  updateDisplay();
}

// Event Listeners
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', () => {
    const value = button.textContent;

    if (!isNaN(value)) {
      handleNumber(value);
    } else {
      switch (button.id) {
        case 'ac':
          resetCalculator();
          break;
        case 'plus-minus':
          toggleSign();
          break;
        case 'percent':
          handlePercent();
          break;
        case 'divide':
          handleOperator('÷');
          break;
        case 'multiply':
          handleOperator('×');
          break;
        case 'subtract':
          handleOperator('−');
          break;
        case 'add':
          handleOperator('+');
          break;
        case 'equals':
          handleEquals();
          break;
        case 'comma':
          if (!currentInput.includes(',')) {
            currentInput += ',';
            updateDisplay();
          }
          break;
      }
    }
  });
});

// Inicializa
updateDisplay();