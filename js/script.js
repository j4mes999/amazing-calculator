"use strict"
const DIV = "/";
const MUL = "X";
const ADD = "+";
const SUB = "-";

/**
 * Adds two numbers
 * @param {number} num1 
 * @param {number} num2 
 * @returns 
 */
function add(num1, num2){
    return num1 + num2;
}

/**
 * Subtract num2 from num1
 * @param {number} num1 
 * @param {number} num2 
 * @returns 
 */
function subtract(num1, num2){
    return num1 - num2;
}

/**
 * Multiply two numbers
 * @param {number} num1 
 * @param {number} num2 
 * @returns 
 */
function multiply(num1, num2){
    return num1 * num2;
}

/**
 * Divides two numbers
 * @param {number} num1 
 * @param {number} num2 
 * @returns 
 */
function divide(num1, num2){
    return num1 / num2;
}

/**
 * Calls the given operation in operator and returns
 * the result
 * @param {string} operator 
 * @param {number} num1 
 * @param {number} num2 
 */
function operate(operator, num1, num2){
    switch(operator){
        case ADD:
            return add(num1, num2);        
        case SUB:
            return subtract(num1, num2);
        case MUL:
            return multiply(num1, num2);
        case DIV:
            return divide(num1, num2);
    }
}

/**
 * Clear the content screen and memory
 */
function clearContent(){
    screen.textContent = "";
    displayContent = "";
}

/**
 * 
 * @param {string} key 
 * @returns true if key is an operator 
 */
function isOperator(key){
    if(key == DIV || key == MUL || key == ADD || key == SUB) return true;
    else return false;
}

/**
 * Calls the operate function with the correct
 * parameters
 * @param {string} content 
 */
function callOperate(content){
    const array = content.split(" ");
    screen.textContent = operate(array[1], parseInt(array[0]), parseInt(array[2]));
}

/**
 * returns how many operands has exp
 * @param {string} exp 
 */
function getNumberOperands(exp){
    const array = exp.split(" ");
    return array.length <= 2 ? 1 : 2;
}

//Event Listeners

const keys = document.querySelectorAll(".key");
const screen = document.querySelector(".screen");
let displayContent = "";
let flag = false;
//for tomorrow: separate digits and operators
//create a stack and record all the events, when press
//a digit validate the last event, if e = result reset
//screen content and continue, otherwise continue normally
keys.forEach(key => key.addEventListener("click", () => {
    
    if(isOperator(key.textContent)){
        if(getNumberOperands(displayContent) == 1){
            displayContent += " " +key.textContent +" ";
            screen.textContent = "";
            console.log("1 operand");
        }else{
          flag = true;
          callOperate(displayContent);
          displayContent = screen.textContent + " " +key.textContent +" ";
          console.log("2 operand");
        }
    }else if(flag){
        screen.textContent = key.textContent;
        displayContent += key.textContent;
        flag = false;
    }else{
        screen.textContent += key.textContent;
        displayContent += key.textContent;
    }
    console.log(displayContent);
}));

const equalKey = document.querySelector(".key-equal");
equalKey.addEventListener( "click", () => callOperate(displayContent));

const clearKey = document.querySelector(".key-clear");
clearKey.addEventListener( "click", () => clearContent());

