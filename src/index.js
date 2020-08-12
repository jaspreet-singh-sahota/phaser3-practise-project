import './styles/style.css';

let gameScene = new Phaser.Scene('Game');

gameScene.preload = function () {
  this.load.image('background', 'assets/background.png');
  this.load.image('player', 'assets/player.png');
  this.load.image('enemy', 'assets/dragon.png');
};

gameScene.create = function () {
  let bg = this.add.sprite(0, 0, 'background');
  let gameW = this.sys.game.config.width;
  let gameH = this.sys.game.config.height;


  bg.setPosition(gameW / 2, gameH / 2);

  let player = this.add.sprite(gameW/4 , gameH/2, 'player')

  player.setScale(0.5, 0.5)
  player.x = 50

  let enemy = this .add.sprite(gameW/3, gameH/1.5 , 'enemy')
  let enemy1 = this .add.sprite(gameW/4, gameH/2 , 'enemy')
  enemy1.setScale(0.5, 0.5)
  enemy.setScale(0.5, 0.5)
  enemy1.flipX = true

};

let config = {
  type: Phaser.AUTO, 
  height: 360,
  width: 640,
  scene: gameScene
};

let game = new Phaser.Game(config);