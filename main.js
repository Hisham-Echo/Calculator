// VARS
let input = document.getElementById("in");
let output = document.getElementById("out");
let del = document.querySelector(".del");
let left = document.querySelector(".lefty button");
let right = document.querySelector(".righty button");
let nums = [...document.querySelectorAll(".num button")];
let ops = [...document.querySelectorAll(".op button")];
let equal = ops.pop();
let keyRegex = /^[0-9 \/ * \- \+ \( \) .]/;
let numRegex = /[0-9]/;
let opRegex = /[\*\+\/\-]/;

//?
function operateOnEntry(userEntry) {
    // This is where the calculations occur when hitting =
    const operationsMD = ["*", "/"];
    let indexOfOperand;
    let operation;

    while (userEntry.includes("*") || userEntry.includes("/")) {
        let i = 0;
        if (!userEntry.includes("*")) {
            i++;
        }
        indexOfOperand = userEntry.indexOf(operationsMD[i]);
        userEntry = calculatorOperations.calculationSequence(
            operationsMD[i],
            indexOfOperand,
            userEntry
        );
    }
    while (userEntry.includes("+") || userEntry.includes("-")) {
        indexOfOperand = 1;
        userEntry = calculatorOperations.calculationSequence(
            userEntry[1],
            indexOfOperand,
            userEntry
        );
    }
    return userEntry;
}

let calculatorOperations = {
    "*": (arg1, arg2) => {
        return arg1 * arg2;
    },
    "/": (arg1, arg2) => {
        return arg1 / arg2;
    },
    "+": (arg1, arg2) => {
        return arg1 + arg2;
    },
    "-": (arg1, arg2) => {
        return arg1 - arg2;
    },
    returnIndexOfEntry: (index, userEntry) => {
        let arg1 = Number(userEntry[index - 1]);
        let arg2 = Number(userEntry[index + 1]);
        return [arg1, arg2];
    },
    returnSpliced: (index, newTotal, userEntry) => {
        userEntry.splice(index - 1, 3, newTotal);
        return userEntry;
    },
    calculationSequence: (operation, indexOfOperand, userEntry) => {
        let getArgs = calculatorOperations.returnIndexOfEntry(
            indexOfOperand,
            userEntry
        );
        let newTotalForEntry = calculatorOperations[operation](
            getArgs[0],
            getArgs[1]
        );
        let newUserEntry = calculatorOperations.returnSpliced(
            indexOfOperand,
            newTotalForEntry,
            userEntry
        );
        return newUserEntry;
    },
};
//?

// input keyboard
window.addEventListener("keydown", (e) => {
    input.blur(); //! block insterting two digits on a keypress
    if (keyRegex.test(e.key)) {
        input.value += e.key;
    } else if (e.key == "Backspace" || e.key == "Delete") {
        input.value = input.value.slice(0, -1);
    } else if (e.key == "Enter") {
        equal.click(); // generate result
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

// Hitting =
equal.addEventListener("click", (e) => {
    let nums = input.value.split(opRegex);
    let ops = input.value.split(numRegex).filter((str) => str !== "");

    //? Error handling
    if (ops.length + 1 == nums.length && nums[nums.length - 1] == "") {
        output.textContent = "ERROR";
    } else {
        // convert string to number
        nums = nums.map((num) => +num);

        // putting it all together
        for (let i = 0; i < ops.length; i++) {
            for (let j = 1; j < nums.length - i; j += 2) {
                nums.splice(j, 0, ops[0]);
                ops.shift();
            }
            break;
        }

        let result = operateOnEntry(nums);

        //? Error handling
        if (Number.isNaN(+result)) {
            output.textContent = "ERROR";
        } else {
            output.textContent = result;
        }
    }
});
