import './styles/style.css';

let gameScene = new Phaser.Scene('Game');

gameScene.preload = function () {
  this.load.image('background', 'assets/background.png');
  this.load.image('player', 'assets/player.png');
};

gameScene.create = function () {
  let bg = this.add.sprite(0, 0, 'background');
  let gameW = this.sys.game.config.width;
  let gameH = this.sys.game.config.height;


  bg.setPosition(gameW / 2, gameH / 2);


};

let config = {
  type: Phaser.AUTO, 
  height: 360,
  width: 640,
  scene: gameScene
};

let game = new Phaser.Game(config);