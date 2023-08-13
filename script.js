let firstNumber;
let secondNumber;
let operation;
let numbers = document.querySelectorAll('.numbers');
let inputScreen = document.querySelector('.input-screen');
let outputScreen = document.querySelector('.output-screen span');
let clearEntryButton = document.querySelector('#clear-entry');
let clearButton = document.querySelector('#clear');
let basicOperators = document.querySelectorAll('.basic-operators');
let equalButton = document.querySelector('.equals');

const add = (firstNum, secondNum) => {
  return firstNum + secondNum;
};

const subtract = (firstNum, secondNum) => {
  return firstNum - secondNum;
};

const multiply = (firstNum, secondNum) => {
  return firstNum * secondNum;
};

const divide = (firstNum, secondNum) => {
  return firstNum / secondNum;
};

const operate = (firstNum, secondNum, operation) => {
  if (operation === '+') {
    return add(firstNum, secondNum);
  } else if (operation === '-') {
    return subtract(firstNum, secondNum);
  } else if (operation.charCodeAt() === 215) {
    return multiply(firstNum, secondNum);
  } else if (operation.charCodeAt() === 247) {
    return divide(firstNum, secondNum);
  }
};

const inputNumber = (e) => {
  if (
    inputScreen.textContent === '0' ||
    inputScreen.classList.contains('temporary') ||
    inputScreen.classList.contains('result')
  ) {
    if (inputScreen.classList.contains('temporary')) {
      inputScreen.classList.remove('temporary');
    } else if (inputScreen.classList.contains('result')) {
      outputScreen.textContent = '';
      inputScreen.classList.remove('result');
    }
    inputScreen.textContent = e.target.textContent;
  } else if (inputScreen.textContent.length < 14) {
    inputScreen.textContent = `${inputScreen.textContent}${e.target.textContent}`;
  }
};

numbers.forEach((number) => {
  number.addEventListener('click', inputNumber);
});

const chooseOperator = (e) => {
  if (
    outputScreen.textContent === '' ||
    inputScreen.classList.contains('temporary') ||
    inputScreen.classList.contains('result')
  ) {
    if (inputScreen.classList.contains('temporary')) {
      number = outputScreen.textContent.slice(0, -2);
      outputScreen.textContent = `${number} ${e.target.textContent}`;
      inputScreen.classList.remove('temporary');
    } else if (inputScreen.classList.contains('result')) {
      outputScreen.textContent = `${inputScreen.textContent} ${e.target.textContent}`;
      inputScreen.classList.remove('result');
    } else {
      outputScreen.textContent = `${inputScreen.textContent} ${e.target.textContent}`;
    }

    inputScreen.classList.add('temporary');
  } else {
    firstNumber = outputScreen.textContent.slice(0, -2);
    operation = outputScreen.textContent.slice(-1);
    secondNumber = inputScreen.textContent;
    outputScreen.textContent = `${operate(
      +firstNumber,
      +secondNumber,
      operation
    )} ${e.target.textContent}`;
    inputScreen.textContent = outputScreen.textContent.slice(0, -2);
    inputScreen.classList.add('temporary');
  }
};

basicOperators.forEach((operator) => {
  operator.addEventListener('click', chooseOperator);
});

const clearEntry = () => {
  if (inputScreen.classList.contains('result')) {
    outputScreen.textContent = '';
  }
  inputScreen.textContent = '0';
};

clearEntryButton.addEventListener('click', clearEntry);

const clear = () => {
  inputScreen.textContent = '0';
  outputScreen.textContent = '';
};

clearButton.addEventListener('click', clear);

const showResult = (e) => {
  if (!inputScreen.classList.contains('result')) {
    if (inputScreen.classList.contains('temporary')) {
      inputScreen.classList.remove('temporary');
    }

    if (outputScreen.textContent === '') {
      outputScreen.textContent = `${inputScreen.textContent} ${e.target.textContent}`;
    } else {
      firstNumber = outputScreen.textContent.slice(0, -2);
      operation = outputScreen.textContent.slice(-1);
      secondNumber = inputScreen.textContent;
      outputScreen.textContent = `${firstNumber} ${operation} ${secondNumber} ${e.target.textContent}`;
      inputScreen.textContent = `${operate(
        +firstNumber,
        +secondNumber,
        operation
      )}`;
    }

    inputScreen.classList.add('result');
  }
};

equalButton.addEventListener('click', showResult);
