// Variablen für die Kreise
let circles = [];
let maxCircles = 1000;
let addCircleRate = 5; // Geschwindigkeit, mit der neue Kreise hinzugefügt werden
let frameCounter = 2;

// Klasse für die Kreise
class Circle {
  constructor(angleOffset) {
    this.angle = angleOffset || 0;
    this.radius = 10;
    this.maxRadius = random(10, 20);
    this.distance = 5;
    this.growthSpeed = random(0.5, 1.5);
    this.distanceIncrement = random(1.5, 2);
    this.rotationSpeed = random(0.01, 0.02);
    this.alpha = 255;
    this.fadeSpeed = random(0.5, 2);
    this.hue = random(0, 360);
    this.state = 'growing'; // 'growing' oder 'fading'
  }

  update() {
    if (this.state === 'growing') {
      // Wachstum des Radius
      if (this.radius < this.maxRadius) {
        this.radius += this.growthSpeed;
      } else {
        this.state = 'fading';
      }
      
      // Spiralbewegung
      this.distance += this.distanceIncrement;
      this.angle += this.rotationSpeed;
    } else if (this.state === 'fading') {
      // Verblassen
      this.alpha -= this.fadeSpeed;
      
      // Weiterhin Spiralbewegung
      this.distance += this.distanceIncrement * 0.5;
      this.angle += this.rotationSpeed * 0.7;
    }
  }

  display() {
    // Position basierend auf Spiralbewegung berechnen
    let x = width / 2 + cos(this.angle) * this.distance;
    let y = height / 2 + sin(this.angle) * this.distance;
    
    // Kreise zeichnen
    noStroke();
    fill(this.hue, 80, 100, this.alpha / 255);
    circle(x, y, this.radius * 2);
  }

  isDead() {
    return this.alpha <= 0;
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 255, 200, 100, 30);
  background(0);
}

function draw() {
  // Hintergrund mit Transparenz für Schleifeneffekt
  background(0, 0, 0, 0.1);
  
  frameCounter++;
  
  // Neue Kreise hinzufügen
  if (frameCounter % addCircleRate === 0 && circles.length < maxCircles) {
    circles.push(new Circle(frameCount * 0.1));
  }
  
  // Kreise aktualisieren und anzeigen
  for (let i = circles.length - 1; i >= 0; i--) {
    circles[i].update();
    circles[i].display();
    
    // Entferne Kreise, die komplett verblasst sind
    if (circles[i].isDead()) {
      circles.splice(i, 1);
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}