// starting by adding the selectors
const keypadButtons = Array.from(document.querySelectorAll('.keypad'));
const equationButtons = Array.from(document.querySelectorAll('.equation'));
const equalsButton = document.querySelector('.equals-button');
const inputDisplay = document.querySelector('number-display');
const clearButton = document.querySelector('.clear-button');

// adding the click event listener function
const addClickListenser = (element, callback) => {
    return element.addEventListener('click', callback);
};

// master input
let input = '';


// creating some pure functions

const clearInput = () => {
    input = '';
    return input;
};


const makeNumNegative = (value = input) => {
    return String(-value);
};

const add = (num1, num2) => {
    return num1 + num2;
};

const subtract = (num1, num2) => {
    return num1 - num2
};

const multiply = (num1, num2) => {
    return num1 * num2;
};

const divide = (num1, num2) => {
    if (num2 === 0) {return "Error"}
    return num1 / num2;
};

const returnValueOfElmnt = (element) => {
    return element.target.value;
};

const addToInput = (element) => {
    let value = returnValueOfElmnt(element);

    if (input.length === 0 && isValueAnOperator(value)) {return};

   return input += value;
}

// functions to evaluate the value type

const isValueAnOperator = (value) => {
    // using teneray operator to shorten
    return value === '+' ? true : 
            value === '-' ? true : 
            value === '*' ? true :
            value === '/' ? true : false;
};

const isValueNegative = value => value === '(-)' ? true : false;


// core functions to make the input string into an array of our two numbers
const returnExactOperator = (string = input) => {
    const array = [...string];
    for (index of array) {
        if (isValueAnOperator(index)) {
            return index;
        };
    };
};


const splitInputString = (string = input, anOperator = undefined) => {
    const operator = anOperator ?? returnExactOperator();

    if (!operator) {return};

    const array = string.split(`${operator}`);

    if (!Number(array[0]) || !Number(array[1])) {return};

    return array.map(string => Number(string));

};

// master evaluate function

function evaluate() {
    const operator = returnExactOperator(input);

    const [num1, num2] = splitInputString(input, operator);

    switch (operator) {
        case ('+'):
           return input = String(add(num1, num2));
        case ('-'):
           return input = String(subtract(num1, num2));
        case ('*'):
           return input = String(multiply(num1, num2));
        case ('/'):
           return input = String(divide(num1, num2));
    };
};

// creating function to change the numbers to negative

const makeNegative = () => {
  if (isNaN(Number(input)) || input.length === 0) {
    if (splitInputString() === undefined) {return}
    const operator = returnExactOperator();
    const array = splitInputString();
    array[2] = makeNumNegative(array[1]);
    array[1] = operator;
    return input = array.join('');
  } else {
    return input = String(-input);
  }

};


// adding event listeners to the buttons

keypadButtons.forEach(button => addClickListenser(button, addToInput));
equationButtons.forEach(button => addClickListenser(button, addToInput));
addClickListenser(clearButton, clearInput);
addClickListenser(equalsButton, evaluate);