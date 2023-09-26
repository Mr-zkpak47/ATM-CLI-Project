#! /usr/bin/env node
import inquirer from "inquirer";
import { faker } from "@faker-js/faker";
import chalk from "chalk";
import chalkAnimation from "chalk-animation";

//Requirements
// User Data
// Atm Machine
// Atm Function

const sleep = () => {
  return new Promise((res) => {
    setTimeout(res, 2000);
  });
};

async function welcome() {
  console.clear();
  let rainbowTitle = chalkAnimation.rainbow(`Let's Use Atm Machine : `);
  await sleep();
  rainbowTitle.stop();
  console.log(
    chalk.yellow(`
  
    █▀▄ █▀▀ █░█ █▀▀ █░░ █▀█ █▀█   █▄▄ █▄█   ▀█ █▀█ █░█ ▄▀█ █ █▄▄
    █▄▀ ██▄ ▀▄▀ ██▄ █▄▄ █▄█ █▀▀   █▄█ ░█░   █▄ █▄█ █▀█ █▀█ █ █▄█
  
    `)
  );
}

await welcome();

interface User {
  id: number;
  pin: number;
  name: string;
  accountNumber: number;
  balance: number;
}

const createUser = () => {
  let users: User[] = [];
  for (let i = 1; i < 5; i++) {
    let user: User = {
      id: i,
      pin: 1000 + i,
      name: faker.person.fullName(),
      accountNumber: Math.floor(1000000 * Math.random() + 9000000),
      balance: 10000000 * i,
    };
    users.push(user);
  }
  return users;
};

//Atm Machine

const atmMachine = async (users: User[]) => {
  const res = await inquirer.prompt({
    type: "number",
    message: "Enter pin code:",
    name: "pin",
  });
  // console.log(res);
  const user = users.find((val) => val.pin == res.pin);
  if (user) {
    console.log(chalk.green("Welcome " + user.name));
    atmFunc(user);
  } else {
    console.log(chalk.red("Invalid User Pin"));
    exit();
  }
};

//Atm Function

const atmFunc = async (user: User) => {
  const ans = await inquirer.prompt({
    type: "list",
    message: "What do you want to select: ",
    name: "select",
    choices: ["withdraw", "balance", "deposit", "exit"],
  });
  if (ans.select == "withdraw") {
    const amount = await inquirer.prompt({
      type: "number",
      message: "Enter Amount: ",
      name: "rupee",
    });
    if (amount.rupee > user.balance) {
      console.log(chalk.red("Your entered amount is insufficient"));
    } else if (amount.rupee < 2500) {
      console.log(chalk.red("You can only withdraw amount greater than 2500"));
    } else {
      console.log(chalk.cyan("Withdraw Amount : " + amount.rupee));
      console.log(chalk.cyan(`Balance : ${user.balance - amount.rupee}`));
    }
    exit();
  }
  if (ans.select == "balance") {
    console.log(chalk.cyan(`Your current balance is : ${user.balance}`));
    exit();
  }
  if (ans.select == "deposit") {
    const deposite = await inquirer.prompt({
      type: "number",
      message: "Enter the amount you want to deposite : ",
      name: "rupee",
    });
    console.log(chalk.cyan(`Deposit Amount : ${deposite.rupee}`));
    console.log(chalk.cyan(`Current Balance : ${user.balance + deposite.rupee}`));
    exit();
  }
  if (ans.select == "exit") {
    exit();
  }
  // console.log(ans);
};

const users = createUser();
atmMachine(users);
// console.log(users)

const exit = async () => {
  const exitAns = await inquirer.prompt({
    type: "list",
    message: "Choose The following Option: ",
    name: "tran",
    choices: ["Do you want to use Atm Again", "Do you want to exit"],
  });
  if (exitAns.tran == "Do you want to use Atm Again") {
    atmMachine(users);
  } else {
    console.log(chalk.magenta(`Thank you for using our atm machine.`));
  }
};