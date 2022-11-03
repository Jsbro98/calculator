// starting by adding the selectors
const keypadButtons = Array.from(document.querySelectorAll('.keypad'));
const equationButtons = Array.from(document.querySelectorAll('.equation'));
const equalsButton = document.querySelector('.equals-button');
const inputDisplay = document.querySelector('number-display');

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
    if (num2 === 0)
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

const returnExactOperator = (string) => {
    const array = [...string];
    for (index of array) {
        if (isValueAnOperator(index)) {
            return index;
        };
    };
};

// core function to make the input string into an array of our two numbers

const splitInputString = (string) => {
    const operator = returnExactOperator(string);

    return string.split(`${operator}`);

};