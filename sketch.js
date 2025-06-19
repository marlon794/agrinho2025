let player;
let bottles = [];
let score = 0;

function setup() {
  createCanvas(600, 400);
  player = new Player();
  // Cria algumas garrafas no início
  for (let i = 0; i < 10; i++) {
    bottles.push(new Bottle());
  }
}

function draw() {
  background(220);
  
  // Mostra e move o jogador
  player.show();
  player.move();

  // Mostra as garrafas
  for (let i = bottles.length - 1; i >= 0; i--) {
    bottles[i].show();
    // Verifica se o jogador pegou a garrafa
    if (bottles[i].hits(player)) {
      bottles.splice(i, 1);
      score++;
    }
  }
  
  // Se acabar as garrafas, cria mais
  if (bottles.length === 0) {
    for (let i = 0; i < 10; i++) {
      bottles.push(new Bottle());
    }
  }
  
  // Mostra a pontuação
  fill(0);
  textSize(16);
  text('Garrafas coletadas: ' + score, 10, 20);
}

class Player {
  constructor() {
    this.x = width / 2;
    this.y = height - 50;
    this.size = 40;
  }
  
  show() {
    fill(0, 0, 255);
    rect(this.x, this.y, this.size, this.size);
  }
  
  move() {
    if (keyIsDown(LEFT_ARROW)) {
      this.x -= 5;
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.x += 5;
    }
    // Limita dentro da tela
    this.x = constrain(this.x, 0, width - this.size);
  }
}

class Bottle {
  constructor() {
    this.x = random(width);
    this.y = random(-100, -40);
    this.size = 20;
    this.speed = random(2, 4);
  }
  
  show() {
    fill(0, 255, 0);
    ellipse(this.x, this.y, this.size);
    this.y += this.speed;
    if (this.y > height + this.size) {
      this.y = random(-100, -40);
      this.x = random(width);
    }
  }
  
  hits(player) {
    let d = dist(this.x, this.y, player.x + player.size/2, player.y + player.size/2);
    return d < (this.size + player.size/2) / 2;
  }
}
