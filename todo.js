#! /usr/bin/env node
import inquirer from 'inquirer';
import chalk from 'chalk';
import chalkAnimation from 'chalk-animation';
class TodoList {
    constructor() {
        this.todos = [];
        this.idCounter = 1;
    }
    async start() {
        const { name } = await inquirer.prompt({
            type: 'input',
            name: 'name',
            message: 'What is your name?'
        });
        const welcomeMessage = chalkAnimation.rainbow(`Welcome to the ToDo List App, ${name}!`);
        setTimeout(() => welcomeMessage.stop(), 2000);
        this.mainMenu();
    }
    async mainMenu() {
        const { action } = await inquirer.prompt({
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['Add a task', 'Remove a task', 'View tasks', 'Exit']
        });
        switch (action) {
            case 'Add a task':
                await this.addTask();
                break;
            case 'Remove a task':
                await this.removeTask();
                break;
            case 'View tasks':
                this.viewTasks();
                break;
            case 'Exit':
                console.log(chalk.green.bold('Goodbye!'));
                process.exit();
        }
        this.mainMenu();
    }
    async addTask() {
        const { task } = await inquirer.prompt({
            type: 'input',
            name: 'task',
            message: 'Enter the task:'
        });
        this.todos.push({ id: this.idCounter++, task });
        console.log(chalk.yellowBright.bold('Task added!'));
    }
    async removeTask() {
        if (this.todos.length === 0) {
            console.log(chalk.red.bold('No tasks to remove!'));
            return;
        }
        const { id } = await inquirer.prompt({
            type: 'list',
            name: 'id',
            message: 'Select a task to remove:',
            choices: this.todos.map(todo => ({ name: todo.task, value: todo.id }))
        });
        this.todos = this.todos.filter(todo => todo.id !== id);
        console.log(chalk.redBright.bold('Task removed!'));
    }
    viewTasks() {
        if (this.todos.length === 0) {
            console.log(chalk.yellow.bold('No tasks to show!'));
        }
        else {
            console.log(chalk.blue.bold('Your tasks:'));
            this.todos.forEach(todo => console.log(`${todo.id}. ${todo.task}`));
        }
    }
}
const todoList = new TodoList();
todoList.start();
