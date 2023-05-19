const calculate = require('./calculator');

// Tests
function testCalculate(){
    // Testing single digit addition
    const test1 = calculate("1+2");
    console.log(test1 === 3 ? "Test 1 passed" : "Test 1 failed");

    // Testing double digit addition
    const test2 = calculate("12+34");
    console.log(test2 === 46 ? "Test 2 passed" : "Test 2 failed");

    // Testing double operation
    const test3 = calculate("12+34-56");
    console.log(test3 === -10 ? "Test 3 passed" : "Test 3 failed");

    // Testing all operations
    const test4 = calculate("12+34-56*78/90");
    console.log(test4 === -8.666666666666666 ? "Test 4 passed" : "Test 4 failed");

    // Testing two consecutive operators
    const test5 = calculate("12++34");
    console.log(test5 === "Input Error" ? "Test 5 passed" : "Test 5 failed");

    // Testing an operator at start
    const test6 = calculate("+12/34");
    console.log(test6 === "Input Error" ? "Test 6 passed" : "Test 6 failed");

    // Testing an operator at the end
    const test7 = calculate("12+34-");
    console.log(test7 === "Input Error" ? "Test 7 passed" : "Test 7 failed");

    // Testing just put a number
    const test8 = calculate("12");
    console.log(test8 === 12 ? "Test 8 passed" : "Test 8 failed");

    // Testing operations with decimal points
    const test9 = calculate("1.2+3.4-5.6*7.8/9.0");
    console.log(test9 === -0.8666666666666667 ? "Test 9 passed" : "Test 9 failed");

    // Testing two decimal points in a number
    const test10 = calculate("1.2.3+4.5.6");
    console.log(test10 === "Input Error" ? "Test 10 passed" : "Test 10 failed");

    // Testing -12*3
    const test11 = calculate("0-1*12*3");
    console.log(test11 === -36 ? "Test 11 passed" : "Test 11 failed");

    // Testing divide by zero
    const test12 = calculate("1/0");
    console.log(test12 === "Math Error" ? "Test 12 passed" : "Test 12 failed");

    // Testing divide zero by zero
    const test13 = calculate("0/0");
    console.log(test13 === "Math Error" ? "Test 13 passed" : "Test 13 failed");
}

testCalculate();