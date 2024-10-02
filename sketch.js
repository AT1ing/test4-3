let xCount = 120;
let yCount = 120;
let n = 5;
let m = 3; //m、n初始節點數

let randNM = 20;
let lastChangeTime = 0;
let changeInterval = 3000;

let myParticles = []; //存放粒子陣列

function setup() {
  createCanvas(windowWidth, windowHeight,P2D);
  background(0);
  smooth();
  initParticle();
}

function draw() {
  translate(width / 2, height / 2); //從中心點開始
  scale(width / 2, height / 2);
  background(0); // Black background

  noFill();
  stroke(255, 180);
  strokeWeight(0.003);

  for (let i = 0; i < myParticles.length; i++) {
    myParticles[i].update();
    myParticles[i].display();
  }

  shuffle1(); 
  
  if (millis() - lastChangeTime > changeInterval) {
    lastChangeTime = millis(); // 更新最後一次更改的時間
    initParticle();  // 重新初始化粒子位置
  }
}


function shuffle1() {
  m = floor(mouseX / 60);
  n = floor(mouseY / 60);
  //節點數控制在20以下（randNM）

  
  while (m == n) {
    m = floor(random(randNM));
  }
}


function initParticle() {
  myParticles = []; // Clear the array first
  for (let y = 0; y < yCount; y++) {
    for (let x = 0; x < xCount; x++) {
      myParticles.push(new Particle()); 
    }
  }
}//x,y粒子增多至120

class Particle {
  constructor() {
    this.x = random(-1, 1);
    this.y = random(-1, 1);
    this.speed = 0.145;
  }
  //粒子在 X 軸和 Y 軸上的位置，範圍在 [-1, 1] 之間以及移動速度

  // 使粒子符合公式調整位置
  update() {
    let vibrationMax = 0.003;
    let vibrationX = random(-vibrationMax, vibrationMax);
    let vibrationY = random(-vibrationMax, vibrationMax);

    let amount = this.chladni(this.x, this.y);
    let randomNum = random(-0.2, 0.5);

    if (amount >= 0) {
      if (this.chladni(this.x + vibrationMax, this.y) >= amount) {
        this.x = constrain(this.x - randomNum * amount * this.speed + vibrationX, -1, 1);
      } else {
        this.x = constrain(this.x + randomNum * amount * this.speed + vibrationX, -1, 1);
      }
      if (this.chladni(this.x, this.y + vibrationMax) >= amount) {
        this.y = constrain(this.y - randomNum * amount * this.speed + vibrationY, -1, 1);
      } else {
        this.y = constrain(this.y + randomNum * amount * this.speed + vibrationY, -1, 1);
      }
    } else {
      if (this.chladni(this.x + vibrationMax, this.y) <= amount) {
        this.x = constrain(this.x + randomNum * amount * this.speed + vibrationX, -1, 1);
      } else {
        this.x = constrain(this.x - randomNum * amount * this.speed + vibrationX, -1, 1);
      }
      if (this.chladni(this.x, this.y + vibrationMax) <= amount) {
        this.y = constrain(this.y + randomNum * amount * this.speed + vibrationY, -1, 1);
      } else {
        this.y = constrain(this.y - randomNum * amount * this.speed + vibrationY, -1, 1);
      }
    }
  }

  // Chladni 計算公式
  chladni(x, y) {
    let L = 2;
    return cos(n * PI * x / L) * cos(m * PI * y / L) - cos(m * PI * x / L) * cos(n * PI * y / L);
  }

  // 粒子表現
  display() {
    point(this.x, this.y);
  }
}
