import inquirer from "inquirer";
import { faker } from '@faker-js/faker';
let pins = [];
let users = [];
const generatePin = async () => {
    let askPin = await inquirer.prompt({
        type: "input",
        name: "pin",
        message: "Enter Pin : "
    });
    pins.push(askPin.pin);
};
const createUser = async () => {
    for (let i = 0; i <= 5; i++) {
        let user = {
            id: i,
            pin: i + 1000,
            name: faker.person.fullName(),
            accountNumber: Math.floor((Math.random() * 90000000) + 10000000),
            balance: 1000000 + i
        };
        users.push(user);
    }
    return users;
};
const atmMachine = async (users) => {
    const res = await inquirer.prompt({
        type: "input",
        name: "pin",
        message: "Enter a pin code : "
    });
    await createUser();
    let user = users.find((val) => val.pin == res.pin);
    if (user) {
        atmFunc(user);
    }
    else {
        console.log("You are not a user.");
    }
};
const atmFunc = async (user) => {
    const ans = await inquirer.prompt({
        type: "list",
        name: "select",
        message: "Please select the method : ",
        choices: ["Withdraw", "Deposit", "View", "Exit"]
    });
    if (ans.select == "Withdraw") {
        const amount = await inquirer.prompt({
            type: "input",
            name: "rupee",
            message: "Enter the amount you want to withdraw : "
        });
        if (amount.rupee > user.balance) {
            console.log("Your enterd amount is insuffiecient.");
        }
        else {
            console.log(`Wihtdraw Amount : ${amount.rupee}`);
            console.log(`Yor current balance is : ${user.balance - amount.rupee}`);
        }
    }
    if (ans.select == "Deposit") {
        console.log("Deposit");
    }
    if (ans.select == "View") {
        console.log(user.balance);
    }
    if (ans.select == "Exit") {
        console.log("Exit");
    }
};
// console.log(await createUser())
await atmMachine(users);
// await atmFunc(users)
