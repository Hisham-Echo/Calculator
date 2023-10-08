// VARS
let input = document.getElementById("in");
let output = document.getElementById("out");
let del = document.querySelector(".del");
let left = document.querySelector(".lefty");
let right = document.querySelector(".righty");
let nums = [...document.querySelectorAll(".num button")];
let ops = [...document.querySelectorAll(".op button")];
let equal = ops.pop();

// Functions
function add(a, b) {
    // a = [...a.map((n) => +n)];
    // let opertion = a.reduce((r, n) => r + n);
    // return opertion;
    return +a + +b;
}

function subtract(a, b) {
    // a = [...a.map((n) => +n)];
    // let opertion = a.reduce((r, n) => r - n);
    // return opertion;
    return +a - +b;
}

function multiply(a, b) {
    //     a = [...a.map((n) => +n)];
    //     let opertion = a.reduce((r, n) => r * n);
    //     return opertion;
    return +a * +b;
}

function divide(a, b) {
    // a = [...a.map((n) => +n)];
    // let opertion = a.reduce((r, n) => r / n);
    // return opertion;
    return +a / +b;
}

// function mod(a) {
//     a = [...a.map((n) => +n)];
//     let opertion = a.reduce((r, n) => r % n);
//     return opertion;
// }

let keyRegex = /^[0-9 \/ * \- \+ \( \) .]/;

// input keyboard
window.addEventListener("keydown", (e) => {
    input.blur(); // block insterting two digits on a keypress
    if (keyRegex.test(e.key)) {
        input.value += e.key;
    } else if (e.key == "Backspace" || e.key == "Delete") {
        input.value = input.value.slice(0, -1);
    } else if (e.key == "Enter") {
        equal.click(); // result function
    }
});

// input calc
nums.forEach((num) => {
    num.addEventListener("click", (e) => {
        input.value += e.target.textContent;
    });
});
ops.forEach((op) => {
    op.addEventListener("click", (e) => {
        input.value += e.target.textContent;
    });
});
left.addEventListener("click", (e) => {
    input.value += e.target.textContent;
});
right.addEventListener("click", (e) => {
    input.value += e.target.textContent;
});

del.onclick = () => (input.value = input.value.slice(0, -1));

let opRegex = /\*\+\/\-/g;
// let regex = /[0-9]+\+\/\-\*[0-9]/;
// Calculating Result
equal.addEventListener("click", (e) => {
    let fin = [];
    console.log(input.value.split(/[0-9]/g));
    console.log(input.value.split(/\+|\/|\-|\*/));
    // !
    let ops = input.value.split(/[0-9]/);
    ops.pop();
    ops.shift();
    console.log(ops);
    // !
    ops.forEach((o) => (o.length > 1 ? "error" : true));

    for (i = 0; i < ops.length; i++) {
        if (ops[i].length > 1) {
            break;
        } else {
            nums = input.value.split(/\+|\/|\-|\*/);
            console.log(nums);
            switch (ops[i]) {
                case "+":
                    fin.push(add(nums[i], nums[i + 1]));
                    console.log("add", fin);
                    break;
                case "-":
                    fin.push(subtract(nums[i], nums[i + 1]));
                    console.log("sub", fin);
                    break;
                case "*":
                    fin.push(multiply(nums[i], nums[i + 1]));
                    console.log("mul", fin);
                    break;
                case "/":
                    fin.push(divide(nums[i], nums[i + 1]));
                    console.log("div", fin);
                    break;
            }
        }
    }

    output.textContent = add(input.value.split("+"));
    // console.log(input.value.split(/[0-9]+(\+\/\-\*)*[0-9]/));
});

//? Reduce


// !!!!!
// function operateOnEntry(userEntry) {
//     let indexOfOperand;
//     let operation;
//     Object.keys(calculatorOperations).forEach(function(functionName) {
//       while (userEntry.includes(functionName)) {
//         indexOfOperand = userEntry.indexOf(functionName);
//         userEntry = calculationSequence(functionName, indexOfOperand, userEntry);
//       }
//     });
//     return userEntry;
//   }
//   const returnIndexOfEntry = (index, userEntry) => {
//     const arg1 = Number(userEntry[index - 1]);
//     const arg2 = Number(userEntry[index + 1]);
//     return [arg1, arg2];
//   };
//   const returnSpliced = (index, newTotal, userEntry) => {
//     userEntry.splice((index - 1), 3, newTotal);
//     return userEntry;
//   };
//   const calculationSequence = (operation, indexOfOperand, userEntry) => {
//     const getArgs = returnIndexOfEntry(indexOfOperand, userEntry);
//     const newTotalForEntry = calculatorOperations[operation](getArgs[0], getArgs[1]);
//     const newUserEntry = returnSpliced(indexOfOperand, newTotalForEntry, userEntry);
//     return newUserEntry;
//   }
//   const calculatorOperations = {
//     'x': (arg1, arg2) => arg1 * arg2,
//     '/': (arg1, arg2) => arg1 / arg2,
//     '+': (arg1, arg2) => arg1 + arg2,
//     '-': (arg1, arg2) => arg1 - arg2
//   };
//   var userEntry = [3, '+', 3, 'x', 3];
//   console.log(operateOnEntry(userEntry));

// !!!!!!!!!!
// function operateOnEntry(userEntry) {
//     //this is where the calculations occur when hitting =
//     const operationsMD = ['x', '/'];
//     let indexOfOperand;
//     let operation;
    
//     while (userEntry.includes('x') || userEntry.includes('/')) {
//         let i = 0;
//         if (!userEntry.includes('x')) {
//             i++;
//         }
//         indexOfOperand = userEntry.indexOf(operationsMD[i]);
//         userEntry = calculatorOperations
//             .calculationSequence(operationsMD[i], indexOfOperand, userEntry);
//     }
//     while (userEntry.includes('+') || userEntry.includes('-')) {
//         indexOfOperand = 1;
//         userEntry = calculatorOperations
//             .calculationSequence(userEntry[1], indexOfOperand, userEntry);
//     }
//     return userEntry;
//     }
    
//     let calculatorOperations = {
//     'x': (arg1, arg2) => {
//         return arg1 * arg2;
//     },
//     '/': (arg1, arg2) => {
//         return arg1 / arg2;
//     },
//     '+': (arg1, arg2) => {
//         return arg1 + arg2;
//     },
//     '-': (arg1, arg2) => {
//         return arg1 - arg2;
//     },
//     returnIndexOfEntry: (index, userEntry) => {
//         let arg1 = Number(userEntry[index - 1]);
//         let arg2 = Number(userEntry[index + 1]);
//         return [arg1, arg2];
//     },
//     returnSpliced: (index, newTotal, userEntry) => {
//         userEntry.splice((index - 1), 3, newTotal);
//         return userEntry;
//     },
//     calculationSequence: (operation, indexOfOperand, userEntry) => {
    
//         let getArgs = calculatorOperations.returnIndexOfEntry(indexOfOperand, userEntry);
//         let newTotalForEntry = calculatorOperations[operation](getArgs[0], getArgs[1]);
//         let newUserEntry = calculatorOperations.returnSpliced(indexOfOperand, newTotalForEntry, userEntry);
//         return newUserEntry;
//     }
//     };