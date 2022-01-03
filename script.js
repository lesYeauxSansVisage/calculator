const operands = document.querySelectorAll(".operand");
const operators = document.querySelectorAll(".operator");
const evaluateBtn = document.getElementById("evaluate");
const resetBtn = document.getElementById("clear");
const resultEl = document.getElementById("result");
const operationTextEl = document.getElementById("operation-text");

let firstNumber = "";
let secondNumber = "";
let operator = "";
let result = 0;
let operationText = "";

//This variable is a way to check if the first number was already defined, if it was, then it won't change unless the calculator is reseted
let presssed = false;

operands.forEach((operand) => {
  operand.addEventListener("click", () => {
    if (!result && !operator && !secondNumber && !presssed) {
      console.log("FirstNumber Actualized");
      firstNumber += operand.value;
      operationText = firstNumber;
      changeOperationText(operationText);
      resultEl.innerText = firstNumber;
    } else if (firstNumber && operator) {
      secondNumber += operand.value;
      operationText = `${firstNumber} ${operator} ${secondNumber}`;
      changeOperationText(operationText);
      resultEl.innerText = secondNumber;
      console.log("Nice, we just need to click the '=' to make the operation");
    }
  });
});

operators.forEach((signal) => {
  signal.addEventListener("click", () => {
    if (firstNumber && !operator && !secondNumber) {
      operator = signal.value;
      operationText = `${firstNumber} ${operator}`;
      changeOperationText(operationText);
      console.log(
        "Inserted the signal, needing just the second number to make the operation!"
      );
    } else if (firstNumber && secondNumber) {
      console.log(
        "Two numbers and you clicked another signal, we're going to evalute!"
      );
      operationText = `${firstNumber} ${operator} ${secondNumber} =`;
      changeOperationText(operationText);
      result = evaluateResult(operator, firstNumber, secondNumber);
      resultEl.innerText = result;
      firstNumber = String(result);
      secondNumber = "";
      operator = signal.value;
    }
  });
});

evaluateBtn.addEventListener("click", () => {
  if (firstNumber && secondNumber && operator) {
    console.log("Nice, now we evakuate the result");
    operationText += " =";
    changeOperationText(operationText);
    result = evaluateResult(operator, firstNumber, secondNumber);
    if (!result && result !== 0) {
      console.log("You got an error");
      operationTextEl.innerText = "";
      resultEl.innerText = "NOPE!";
      setTimeout(() => {
        resetCalculator();
      }, 2000);
      return;
    }
    resultEl.innerText = result;
    firstNumber = String(result);
    result = 0;
    secondNumber = "";
    operator = "";
  }
});

resetBtn.addEventListener("click", resetCalculator);

function sum(a, b) {
  return a + b;
}

function divide(a, b) {
  if (b) {
    return a / b;
  }
  resultEl.innerText = "You cant do that!";
}

function multiply(a, b) {
  return a * b;
}

function subtract(a, b) {
  return a - b;
}

function evaluateResult(signal, a, b) {
  a = Number(a);
  b = Number(b);
  presssed = true;
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

function resetCalculator() {
  firstNumber = "";
  secondNumber = "";
  operator = "";
  result = 0;
  operationText = "";
  presssed = false;
  operationTextEl.innerText = "";
  resultEl.innerText = "0";
}

function changeOperationText(text) {
  operationTextEl.innerText = text;
}
