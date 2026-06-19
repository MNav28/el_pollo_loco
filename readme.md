# El Pollo Loco 🐔🌵

## About the Game

**El Pollo Loco** is a 2D platformer adventure game built with JavaScript and the Canvas API.

The player takes control of **Pepe**, a brave character who travels through a dangerous desert world. His mission is to defeat the enemy chickens and reach the final challenge: a powerful final boss chicken that protects the end of the level.

Throughout the game, Pepe can collect bottles and coins, fight enemies, and use his abilities to survive the adventure. The goal is simple: defeat all enemies and overcome the Endboss to win the game.

---

## Gameplay 🎮

In **El Pollo Loco**, the player can:

- Control Pepe through the game world
- Run and jump across the level
- Fight different types of chickens
- Collect bottles and coins
- Throw bottles to defeat enemies
- Battle against the final Endboss
- Complete the level by defeating the boss

---

## Game Features ✨

- Character movement with animations
- Different enemy types with individual behavior
- Endboss with patrol, alert and chase mechanics
- Bottle throwing system
- Collision detection between game objects
- Collectable items
- Health, bottle, coin and Endboss status bars
- Background music and sound effects
- Win and lose screens
- Desktop and mobile controls

---

## Controls ⌨️📱

### Desktop

| Key | Action |
|---|---|
| ← / → | Move Pepe |
| Space | Jump |
| D | Throw bottle |

### Mobile

The game also supports mobile controls with touch buttons:

- Move left
- Move right
- Jump
- Throw bottle

---

## Technologies Used 🛠️

This project was developed using:

- HTML5
- CSS3
- JavaScript
- Canvas API

---

## Project Architecture 📁

The game is structured using object-oriented programming principles.

The main game logic is separated into different classes:

- **Character**  
  Handles player movement, animations and interactions.

- **World**  
  Controls the game environment, rendering, game loop and object management.

- **Endboss**  
  Handles the final boss behavior, animations and attack states.

- **Enemies**  
  Handles different enemy types, movement and interactions.

- **Helper Modules**  
  Additional game logic is separated into helper files to keep the code organized and maintainable.
