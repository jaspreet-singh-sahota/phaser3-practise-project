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

  // this.enemy = this .add.sprite(gameW/3, gameH/1.5 , 'enemy')
  // this.enemy1 = this .add.sprite(gameW/4, gameH/2 , 'enemy')
  // this.enemy1.setScale(0.5, 0.5)
  // this.enemy.setScale(0.5, 0.5)
  // this.enemy.flipX = true

  // let dir = Math.random() < 0.5 ? 1 : -1;
  // let speed = this.enemyMinSpeed + Math.random() * (this.enemyMaxSpeed - this.enemyMinSpeed);
  // this.enemy.speed = dir * speed;

  this.enemies = this.add.group({
    key: 'enemy',
    repeat: 5,
    setXY: {
      x: 90,
      y: 100,
      stepX: 80,
      stepY: 20
    }
  });

  Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.5, -0.5);

  Phaser.Actions.Call(this.enemies.getChildren(), function (enemy) {
    enemy.flipX = true;

    let dir = Math.random() < 0.5 ? 1 : -1;
    let speed = this.enemyMinSpeed + Math.random() * (this.enemyMaxSpeed - this.enemyMinSpeed);
    enemy.speed = dir * speed;

  }, this);


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

    return this.gameOver();
  }

  let enemies = this.enemies.getChildren();
 
  enemies.forEach(enemy => {
    
    enemy.y += enemy.speed;
    
    let conditionUp = enemy.speed < 0 && enemy.y <= this.enemyMinY;
    let conditionDown = enemy.speed > 0 && enemy.y >= this.enemyMaxY;
    
    if (conditionUp || conditionDown) {
      enemy.speed *= -1;
    }
    
    let enemyRect = enemy.getBounds();
    
    if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, enemyRect)) {
      console.log('Game over!');
      
      return this.gameOver();
    }
  });
};

gameScene.gameOver = function () {

  this.isTerminating = true;

  this.cameras.main.shake(100);

  this.cameras.main.on('camerashakecomplete', function (camera, effect) {

    this.cameras.main.fade(500);
  }, this);

  this.cameras.main.on('camerafadeoutcomplete', function (camera, effect) {
    this.scene.restart();
  }, this);


};

let config = {
  type: Phaser.AUTO, 
  height: 360,
  width: 640,
  scene: gameScene
};

let game = new Phaser.Game(config);