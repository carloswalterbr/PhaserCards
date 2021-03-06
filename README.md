# PhaserCards
A simple card game utilizing [**Phaser.io**](https://phaser.io "Phaser game framework") framework.  
Collect stacks of 4 cards of the same rank or suit.

**Rules**  
Initial balance 3000.  
Hardcoded stake of 50.  
Payout for the same rank: 4 \* stake \* 5  
Payout for the same suit: 4 \* stake \* 3

**Install**  
`$ cd <path_to_project_folder>` and then `$ grunt`

**Code includes:**
- setting up game states
- preloading game
- texture atlas loading 
- setting up stage
- extending Phaser objects
- using tiled sprite background
- composing and tweening sprites
- custom tweening textfield texts
- using POJO model to store and process game logic
