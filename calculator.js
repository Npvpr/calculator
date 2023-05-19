// Default values
let operandStr = "";
let operand1 = NaN;
let operand2 = NaN;
let operator = "";
let result = NaN;
let lastAnswer = NaN;

function setDefault(){
    operandStr = "";
    operand1 = NaN;
    operand2 = NaN;
    operator = "";
}

// get and set values from DOM
const screen_operation = document.getElementById("operation");
const screen_result = document.getElementById("result");
const clearBtn = document.getElementById("clear");
const answerBtn = document.getElementById("answer");
const deleteBtn = document.getElementById("delete");
const equalBtn = document.getElementById("equal");
const numberBtns = document.querySelectorAll(".btn.nocheck");
console.log(numberBtns);

// Event Listeners
window.addEventListener('keydown', handleKeyboardInput)
clearBtn.addEventListener("click", clear);
answerBtn.addEventListener("click", answer);
deleteBtn.addEventListener("click", deleteBack);
equalBtn.addEventListener("click", equal);

numberBtns.forEach((num) => {
    num.addEventListener("click", number);
})

function handleKeyboardInput(e){
    if (e.key === 'Escape') clear()
    if (e.key === 'ArrowUp') answer()
    if (e.key === 'Backspace') deleteBack()
    if (e.key === '=' || e.key === 'Enter') equal()
    if ((e.key >= 0 && e.key <= 9) || (e.key === '.') || 
    (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')){
        screen_operation.textContent += String(e.key);
    }
}

function clear(){
    screen_operation.textContent = "";
    screen_result.textContent = "";
    setDefault();
}

function answer(){
    screen_operation.textContent += String(lastAnswer);
}

function deleteBack(){
    screen_operation.textContent = screen_operation.textContent.slice(0, -1);
}

function equal(){
    lastAnswer = calculate(screen_operation.textContent);
    screen_result.textContent = String(lastAnswer);
    screen_operation.textContent = "";
    lastAnswer = +lastAnswer;
}

function number(){
    screen_operation.textContent += this.textContent;
}

function calculate(calString){
    for(let i = 0; i < calString.length; i++){
        /* 1. put numbers into the operandStr
        2. when you see an operator, convert operandStr(string) to operand1(number)
        3. make operandStr NaN
        4. save the operator
        5. when end or found another operator, check operand1, if exists, convert operandStr to operand2
        6. calculate with saved operator and put into operand1
        7. if no more operator, return operand1
       */
        if(calString[i] === "+" || calString[i] === "-" || calString[i] === "*" || calString[i] === "/"){
            // for -1, +1, signs at start
            if(i === 0 && (calString[i] === "-" || calString[i] === "+")){
                operandStr += calString[i];
            }
            // for 1++1, two consecutive operators without operand before
            else if(operandStr === ""){
                return showError("Input Error");
            }
            // for normal conditions
            else{
                // for 1+1, first 1
                if(isNaN(operand1)){
                    operand1 = +operandStr;
                }
                // for 1+1+1, second 1
                else{
                    operand2 = +operandStr;
                    operand1 = operation(operator);
                }
                operator = calString[i];
                operandStr = "";
            }
        }
        // for 1.1.1, more than one dots in one operand
        else if((calString[i] === ".") && (operandStr.includes("."))){
            return showError("Input Error");
        }
        // for normal conditions
        else{
            operandStr += calString[i];
        }
    }
    // Afer loop, at the end
    // for 1+2-, no operand after last operator
    if(operandStr === ""){
        return showError("Input Error");
    }
    // for 12, no operand yet, user just put one number
    else if(isNaN(operand1) && operator === ""){
        operand1 = +operandStr;
    }
    // for 1+2, normal conditions
    else{
        operand2 = +operandStr;
        operand1 = operation(operator);
    }
    // console.log(operand1);
    // for 1/0, Infinity, 0/0, NaN
    if(operand1 === Infinity || isNaN(operand1)){
        return showError("Math Error");
    }
    result = operand1;
    setDefault();
    return result;
}

function operation(operator){
    // console.log(`operandStr: ${operandStr}, operand1: ${operand1}, operand2: ${operand2}, operator: ${operator}`);
    switch(operator){
        case "+":
            return operand1 + operand2;
        case "-":
            return operand1 - operand2;
        case "*":
            return operand1 * operand2;
        case "/":
            return operand1 / operand2;
    }
}

// Error handling
function showError(type){
    setDefault();
    return type;
}

// module.exports = calculate;