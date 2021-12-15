// Save the first operand, second operand and operator in a variable
// Every time the user clicks a button, it should add to the first operand
// After clicking an operator, the next click on the operands should go to the second operand to be evaluated
// Finnaly, after clicking the =, the computer should take the two operand and evaluates the results
// Now the first operand should be equal to the result

const operands = document.querySelectorAll(".operand");
const operators = document.querySelectorAll(".operator");
const evaluateBtn = document.getElementById("evaluate");
const display = document.getElementById("display");

let firstNumber = "";
let secondNumber = "";
let operator = "";
let result = 0;

operands.forEach((operand) => {
  operand.addEventListener("click", () => {
    if (operator) {
      secondNumber += operand.value;
      display.textContent = secondNumber;
    } else {
      firstNumber += operand.value;
      display.textContent = firstNumber;
    }
  });
});

operators.forEach((signal) => {
  signal.addEventListener("click", () => {
    if (!operator && firstNumber) {
      operator = signal.value;
    }
  });
});

evaluateBtn.addEventListener("click", () => {
  if (firstNumber && secondNumber && operator) {
    result = evaluateResult(
      operator,
      Number(firstNumber),
      Number(secondNumber)
    );
    firstNumber = result;
    secondNumber = "";
    operator = "";
    display.textContent = result;
  }
});

function sum(a, b) {
  return a + b;
}

function divide(a, b) {
  return a / b;
}

function multiply(a, b) {
  return a * b;
}

function subtract(a, b) {
  return a - b;
}

function evaluateResult(signal, a, b) {
  switch (signal) {
    case "+":
      return sum(a, b);
      break;
    case "-":
      return subtract(a, b);
      break;
    case "*":
      return multiply(a, b);
      break;
    case "/":
      return divide(a, b);
      break;
    default:
      break;
  }
}
