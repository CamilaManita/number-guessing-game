#!/usr/bin/env node

import { Command } from "commander";
import * as readline from "readline";

const program = new Command();

program
  .name("number-guessing-game")
  .description("A simple command line interface (CLI) to guess a number.")
  .version("1.0.0");

program
  .command("start")
  .description("Start the Number Guessing Game")
  .action(async () => {
    showWelcome();

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const difficulty = await selectDifficulty(rl);

    // Loop principal para múltiples rondas
    let playAgain = true;
    let roundNumber = 1;
    let currentDifficulty = difficulty;

    while (playAgain) {
      console.log();
      console.log(`🎲 ROUND ${roundNumber}`);
      console.log("─".repeat(30));
      
      const gameWon = await playOneRound(rl, currentDifficulty);
      
      // Preguntar qué quiere hacer después
      let choice = await askToPlayAgain(rl);
      
      // Loop para validar la opción
      while (choice !== "1" && choice !== "2" && choice !== "3") {
        console.log("❌ Invalid choice. Please select 1, 2, or 3.");
        console.log();
        choice = await askToPlayAgain(rl);
      }
      
      if (choice === "1") {
        // Jugar otra vez con la misma dificultad
        roundNumber++;
        console.log();
        console.log("🔄 Starting next round...");
        console.log();
      } else if (choice === "2") {
        // Cambiar dificultad
        console.log();
        console.log("🔄 Changing difficulty...");
        console.log();
        currentDifficulty = await selectDifficulty(rl);
        roundNumber++;
        console.log();
        console.log("🔄 Starting next round with new difficulty...");
        console.log();
      } else if (choice === "3") {
        // Salir del juego
        playAgain = false;
      }
    }

    showGoodbye();
    rl.close();
  });

program.parse(process.argv);

// Función para mostrar la bienvenida
function showWelcome(): void {
  console.clear();
  console.log(
    "╔══════════════════════════════════════════════════════════════╗"
  );
  console.log(
    "║                    🎮 NUMBER GUESSING GAME 🎮                ║"
  );
  console.log(
    "╚══════════════════════════════════════════════════════════════╝"
  );
  console.log();
  console.log("🎯 I'm thinking of a number between 1 and 100.");
  console.log();
  console.log("📊 Please select the difficulty level:");
  console.log();
  console.log("  🟢 1. Easy   (10 attempts)");
  console.log("  🟡 2. Medium (5 attempts)");
  console.log("  🔴 3. Hard   (3 attempts)");
  console.log();
}

// Función para seleccionar dificultad
async function selectDifficulty(rl: readline.Interface): Promise<string> {
  const difficulty = await new Promise<string>((resolve) => {
    rl.question("🎲 Enter your choice: ", (answer) => {
      resolve(answer);
    });
  });

  console.log();

  if (difficulty === "1") {
    console.log("✅ Great! You have selected the Easy difficulty level.");
  } else if (difficulty === "2") {
    console.log("✅ Great! You have selected the Medium difficulty level.");
  } else if (difficulty === "3") {
    console.log("✅ Great! You have selected the Hard difficulty level.");
  } else {
    console.log("❌ Invalid difficulty level. Please select 1, 2, or 3.");
    return selectDifficulty(rl);
  }

  return difficulty;
}

// Función para obtener el número máximo de intentos según la dificultad
function getMaxAttempts(difficulty: string): number {
  if (difficulty === "1") {
    return 10;
  } else if (difficulty === "2") {
    return 5;
  } else {
    return 3;
  }
}

// Función para jugar una ronda
async function playOneRound(rl: readline.Interface, difficulty: string): Promise<boolean> {
  console.log("🚀 Let's start the game!");
  console.log("─".repeat(60));

  const number = Math.floor(Math.random() * 100) + 1;
  let attempts = 0;
  const maxAttempts = getMaxAttempts(difficulty);

  console.log(`🎯 You have ${maxAttempts} attempts to guess the number.`);
  console.log();

  let gameWon = false;

  // Función para el juego principal
  const playGame = async (): Promise<boolean> => {
    while (attempts < maxAttempts && !gameWon) {
      const guess = await new Promise<string>((resolve) => {
        rl.question(
          `🎲 Attempt ${attempts + 1}/${maxAttempts} → Enter your guess: `,
          (answer) => {
            resolve(answer);
          }
        );
      });

      const guessNumber = parseInt(guess);
      attempts++;

      console.log();

      if (guessNumber === number) {
        console.log(
          "╔══════════════════════════════════════════════════════════════╗"
        );
        console.log(
          "║                        🎉 VICTORY! 🎉                        ║"
        );
        console.log(
          "╚══════════════════════════════════════════════════════════════╝"
        );
        console.log(
          `🏆 Congratulations! You guessed the correct number in ${attempts} attempts!`
        );
        console.log(`🎯 The number was: ${number}`);
        gameWon = true;
        return true;
      } else if (guessNumber < number) {
        console.log(`📈 Too low! The number is greater than ${guess}.`);
        if (attempts < maxAttempts) {
          console.log(`💡 You have ${maxAttempts - attempts} attempts left.`);
        }
      } else {
        console.log(`📉 Too high! The number is less than ${guess}.`);
        if (attempts < maxAttempts) {
          console.log(`💡 You have ${maxAttempts - attempts} attempts left.`);
        }
      }

      if (!gameWon && attempts < maxAttempts) {
        console.log("─".repeat(40));
      }
    }
    return gameWon;
  };

  // Ejecutar el juego
  const result = await playGame();

  // Si perdió por intentos
  if (!gameWon && attempts >= maxAttempts) {
    console.log();
    console.log(
      "╔══════════════════════════════════════════════════════════════╗"
    );
    console.log(
      "║                        😔 GAME OVER 😔                       ║"
    );
    console.log(
      "╚══════════════════════════════════════════════════════════════╝"
    );
    console.log(`💀 You used all ${maxAttempts} attempts.`);
    console.log(`🎯 The number was: ${number}`);
  }

  return gameWon;
}

// Función para preguntar si quiere jugar otra vez
async function askToPlayAgain(rl: readline.Interface): Promise<string> {
  console.log();
  console.log("─".repeat(60));
  console.log("🎮 What would you like to do?");
  console.log();
  console.log("  🎲 1. Play again (same difficulty)");
  console.log("  🔄 2. Change difficulty");
  console.log("  👋 3. Exit game");
  console.log();
  
  const answer = await new Promise<string>((resolve) => {
    rl.question("Enter your choice (1-3): ", (answer) => {
      resolve(answer.trim());
    });
  });

  return answer;
}

// Función para mostrar despedida
function showGoodbye(): void {
  console.log();
  console.log("─".repeat(60));
  console.log("👋 Thanks for playing! Come back soon!");
  console.log("─".repeat(60));
}
