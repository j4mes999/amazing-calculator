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
    opStack = [];
    numStack = [];
    output = "";
    input = "";
    auxScreen.textContent = "";
}


/**
 * 
 * Draws in the aux screen the content of the stacks 
 */
function drawAuxScreen(){
    if(numStack.length >= 1 && opStack.length >= 1)
      auxScreen.textContent = numStack[0] + " " + opStack[0]; 
}

//Event Listeners

const digits = document.querySelectorAll(".key.digit");
const operators = document.querySelectorAll(".key.operator");
const screen = document.querySelector(".user-input");
const auxScreen = document.querySelector(".aux-screen");

let opStack = []; // stack where the operator will be store
let numStack = []; // stack where the operands will be store
let input = "";
let output = "";

//Event listener when a digit is pressed
digits.forEach(key => key.addEventListener("click", () => {
    input += key.textContent;
    screen.textContent = input;  
}));

//Event listener when an operator key is pressed
operators.forEach(key => key.addEventListener("click", () =>{
    
    console.log("numStack out: "+numStack + " opStack out: "+opStack +
                 " input: " + input);
    if( numStack.length == 0 && input !== ""){
      input = screen.textContent;  
      numStack.push(parseFloat(input));
      opStack.push(key.textContent);
      console.log("numStack: "+numStack + " opStack: "+opStack);
      drawAuxScreen();  
      input = "";
    }else if(numStack.length == 1 && input !== ""){
        input = screen.textContent;
        output = operate(opStack.pop(), numStack.pop(), parseFloat(input));
        screen.textContent = output;
        opStack.push(key.textContent);
        numStack.push(parseFloat(output));
        drawAuxScreen();
        console.log("numStack2: "+numStack + " opStack2: "+opStack);
        input = "";
        output = "";
    }else if(numStack.length == 0 && opStack.length == 0 && input === "" && screen.textContent !== ""){
        input = screen.textContent;
        numStack.push(parseFloat(input));
        opStack.push(key.textContent);
        drawAuxScreen();
        input = "";
    }
}));

//event listener when the equals key is pressed
const equalKey = document.querySelector(".equal");
equalKey.addEventListener( "click", () => {
  if(numStack.length >= 1){
    output = operate(opStack.pop(), numStack.pop(), parseFloat(screen.textContent));
    screen.textContent = output;
    auxScreen.textContent = output;
    output = "";
    input = ""; //if 2 x 3 = 6 and then type a number, 6 is lost and works fine, if commented after pressing = and number both values concat
  }
});

const clearKey = document.querySelector(".clear");
clearKey.addEventListener( "click", () => clearContent());

