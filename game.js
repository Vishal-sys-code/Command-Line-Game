#!/usr/bin/env node
//ESM modules
import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let playerName;

//as in command line there would be only one thing at a time so we will use a helper function for set-time
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r,ms));

async function welcome(){
    const rainbowTitle = chalkAnimation.rainbow(
        'Welcome to the Command Line Game \n'
    );
    await sleep();
    rainbowTitle.stop();
    console.log(`
        ${chalk.bgBlue('HOW TO PLAY')}
        I am a process in your System.
        If you get any question wrong you will be ${chalk.bgRed('Killed')}
        So do everything correct.... 
    `);
}

//We will use a package inquirer which will collect all the data from the user which is necessary in the game
async function userDeatils(){
    const ans = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name',
        default(){
            return 'Player';
        },
    });
    playerName = ans.player_name;
}

//For choosing a correct option
async function handleCorrectOption(isCorrect){
    const spinner = createSpinner("Checking Answer...").start();
    if(isCorrect){
        spinner.success({text: `Amazing ${playerName}. That's a legit answer`});
    }
    else{
        spinner.error({ text: `💀💀💀 Game over, OOPS! you lose ${playerName}!`});
        process.exit(1);
    }
}

function winner(){
    console.clear();
    /*const msg = `Congrats, ${playerName} !\n $ You are the Winner`;
    figlet(msg,(err, data) => {
        console.log(gradient.pastel.multiline(data));
    });*/
    figlet(`Congrats, ${playerName} !\n You are the Winner`, (err,data) => {
        console.log(gradient.pastel.multiline(data)+"\n");
        console.log(
            chalk.green(
                `Programming isn't about what you sit in front of screen 8 hours straight; it's about making the command line cool.`
            )
        );
        process.exit(0);
    });
}

//List of the questions in the game
async function question1(){
    const answers = await inquirer.prompt({
        name:'question_1',
        type: 'list',
        message: 'Who is the Founder Apple?\n',
        choices: [
            'Steve Jobs',
            'Steve Wozniak',
            'Steve Balmer',
            'Tim Cook',
        ],
    });
    return handleCorrectOption(answers.question_1 === 'Steve Jobs');
}

async function question2(){
    const answers = await inquirer.prompt({
        name:'question_2',
        type: 'list',
        message: 'Who is the Founder Microsoft?\n',
        choices: [
            'William Henry Gates III',
            'Steve Balmer',
            'Satya Narayan Nadella',
            'Jeffery Princeton Bezos',
        ],
    });
    return handleCorrectOption(answers.question_2 === 'William Henry Gates III');
}

async function question3(){
    const answers = await inquirer.prompt({
        name:'question_3',
        type: 'list',
        message: 'What is the binary of 885?\n',
        choices: [
            '1101110101',
            '1101111111',
            '1101110110',
            '0010001010',
        ],
    });
    return handleCorrectOption(answers.question_3 === '1101110101');
}

async function question4(){
    const answers = await inquirer.prompt({
        name:'question_4',
        type: 'list',
        message: 'Java is a Platform Independent?\n',
        choices: [
            'True',
            'False',
        ],
    });
    return handleCorrectOption(answers.question_4 === 'True');
}

async function question5(){
    const answers = await inquirer.prompt({
        name:'question_5',
        type: 'list',
        message: 'What is the first line of the shell script?\n',
        choices: [
            'shebang',
            'hebang',
            'bangbang',
            'gangbang',
        ],
    });
    return handleCorrectOption(answers.question_5 === 'shebang');
}

console.clear();
await welcome();
await userDeatils();
await question1();
await question2();
await question3();
await question4();
await question5();
winner();