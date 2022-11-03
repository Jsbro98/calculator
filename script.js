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


const makeNegative =(input) => {
    return String(-input);
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
    console.log(input);
    let value = returnValueOfElmnt(element);
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
const returnExactOperator = (string) => {
    const array = [...string];
    for (index of array) {
        if (isValueAnOperator(index)) {
            return index;
        };
    };
};


const splitInputString = (string) => {
    const operator = returnExactOperator(string);

    const array = string.split(`${operator}`);

    return array.map(string => Number(string));

};

// master evaluate function

function evaluate(inputString) {
    const operator = returnExactOperator(inputString);

    const [num1, num2] = splitInputString(inputString);

    switch (operator) {
        case ('+'):
           return add(num1, num2);
        case ('-'):
           return subtract(num1, num2);
        case ('*'):
           return multiply(num1, num2);
        case ('/'):
           return divide(num1, num2);
    };
};