let n = 0;
let c = 8; 
let total = 1000; 

function setup() {
  createCanvas(600, 600);
  background(0);
  angleMode(DEGREES);
  colorMode(HSB, 360, 100, 100);
  noStroke();
}

function draw() {
  let a = n * 137.5; // Goldener Winkel
  let r = c * sqrt(n);

  let x = r * cos(a) + width / 2;
  let y = r * sin(a) + height / 2;

  fill(40, 200, 100); 
  push();
  translate(x, y);
  rotate(a);
  ellipse(0, 0, 20, 10); 
  pop();

  n++;

  if (n > total) {
    noLoop(); 
  }
}
