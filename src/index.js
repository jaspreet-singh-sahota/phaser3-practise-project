import './styles/style.css';

let gameScene = new Phaser.Scene('Game');

gameScene.init = function () {
  this.playerSpeed = 3;

  this.enemyMinSpeed = 2;
  this.enemyMaxSpeed = 4;

  this.enemyMinY = 80;
  this.enemyMaxY = 280;
};

gameScene.preload = function () {
  this.load.image('background', 'assets/background.png');
  this.load.image('player', 'assets/player.png');
  this.load.image('enemy', 'assets/dragon.png');
  this.load.image('treasure', 'assets/treasure.png');
};

gameScene.create = function () {
  let bg = this.add.sprite(0, 0, 'background');
  let gameW = this.sys.game.config.width;
  let gameH = this.sys.game.config.height;


  bg.setPosition(gameW / 2, gameH / 2);

  this.player = this.add.sprite(gameW/4 , gameH/2, 'player')
  
  this.player.setScale(0.5, 0.5)
  this.player.x = 50
  
  this.goal = this.add.sprite(gameW/1.1 , gameH/2, 'treasure')
  this.goal.setScale(0.5, 0.5)

  this.enemy = this .add.sprite(gameW/3, gameH/1.5 , 'enemy')
  this.enemy1 = this .add.sprite(gameW/4, gameH/2 , 'enemy')
  this.enemy1.setScale(0.5, 0.5)
  this.enemy.setScale(0.5, 0.5)
  this.enemy.flipX = true

  let dir = Math.random() < 0.5 ? 1 : -1;
  let speed = this.enemyMinSpeed + Math.random() * (this.enemyMaxSpeed - this.enemyMinSpeed);
  this.enemy.speed = dir * speed;


};

gameScene.update = function () {
  // this.enemy1.x += 1;

  // this.enemy1.angle += 1;
  // this.enemy

  // if (this.player.scaleX < 0.8) {
  //   this.player.scaleX += 0.005;
  //   this.player.scaleY += 0.005;
  // }

  if (this.input.activePointer.isDown) {
    this.player.x += this.playerSpeed;
  }

  let playerRect = this.player.getBounds();
  let treasureRect = this.goal.getBounds();

  if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, treasureRect)) {
    console.log('reached goal!');

    this.scene.restart();
    return;
  }

  this.enemy.y += this.enemy.speed;

  let conditionUp = this.enemy.speed < 0 && this.enemy.y <= this.enemyMinY;
  let conditionDown = this.enemy.speed > 0 && this.enemy.y >= this.enemyMaxY;

  if (conditionUp || conditionDown) {
    this.enemy.speed *= -1;
  }
};

let config = {
  type: Phaser.AUTO, 
  height: 360,
  width: 640,
  scene: gameScene
};

let game = new Phaser.Game(config);