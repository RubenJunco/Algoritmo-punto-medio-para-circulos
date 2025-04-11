José Eduardo Hirales Núñez
Ruben Abdel Junco Jauregui

let radioInput, sliceInput, button;
let radius = 100;
let slices = 4;
let ready = false;

function setup() {
  createCanvas(800, 500);
  textAlign(CENTER, CENTER);
  noLoop();

  createP("Ingrese el radio de las pizzas").style("font-size", "16px");
  radioInput = createInput("100");
  radioInput.style("width", "50px");

  createP("Ingrese el número de rebanadas").style("font-size", "16px");
  sliceInput = createInput("4");
  sliceInput.style("width", "50px");

  button = createButton("Dibujar Pizzas");
  button.mousePressed(() => {
    radius = int(radioInput.value());
    slices = int(sliceInput.value());
    ready = true;
    redraw();
  });
}

function draw() {
  background(255);

  if (!ready) return;

  let centers = [200, 400, 600];

  for (let i = 0; i < 3; i++) {
    midpointCircle(centers[i], 250, radius);
  }

  for (let i = 0; i < slices; i++) {
    let angle = TWO_PI * i / slices;
    let x = int(radius * cos(angle));
    let y = int(radius * sin(angle));

    pointSlopeLine(centers[0], 250, centers[0] + x, 250 + y);

    ddaLine(centers[1], 250, centers[1] + x, 250 + y);

    bresenhamLine(centers[2], 250, centers[2] + x, 250 + y);
  }

  fill(0);
  noStroke();
  text("Ecuación Punto-pendiente", centers[0], 400);
  text("DDA", centers[1], 400);
  text("Bresenham", centers[2], 400);
}

function midpointCircle(xc, yc, r) {
  let x = 0;
  let y = r;
  let p = 1 - r;

  while (x <= y) {
    plotCirclePoints(xc, yc, x, y);
    x++;
    if (p < 0) {
      p += 2 * x + 1;
    } else {
      y--;
      p += 2 * (x - y) + 1;
    }
  }
}

function plotCirclePoints(xc, yc, x, y) {
  point(xc + x, yc + y);
  point(xc - x, yc + y);
  point(xc + x, yc - y);
  point(xc - x, yc - y);
  point(xc + y, yc + x);
  point(xc - y, yc + x);
  point(xc + y, yc - x);
  point(xc - y, yc - x);
}

// Algoritmos para las líneas
function pointSlopeLine(x0, y0, x1, y1) {
  let dx = x1 - x0;
  let dy = y1 - y0;
  let steps = abs(dx) > abs(dy) ? abs(dx) : abs(dy);

  for (let i = 0; i <= steps; i++) {
    let x = x0 + i * dx / steps;
    let y = y0 + i * dy / steps;
    point(x, y);
  }
}

function ddaLine(x0, y0, x1, y1) {
  let dx = x1 - x0;
  let dy = y1 - y0;
  let steps = abs(dx) > abs(dy) ? abs(dx) : abs(dy);
  let xInc = dx / steps;
  let yInc = dy / steps;

  let x = x0;
  let y = y0;
  for (let i = 0; i <= steps; i++) {
    point(round(x), round(y));
    x += xInc;
    y += yInc;
  }
}

function bresenhamLine(x0, y0, x1, y1) {
  let dx = abs(x1 - x0);
  let dy = abs(y1 - y0);
  let sx = x0 < x1 ? 1 : -1;
  let sy = y0 < y1 ? 1 : -1;
  let err = dx - dy;

  while (true) {
    point(x0, y0);
    if (x0 === x1 && y0 === y1) break;
    let e2 = 2 * err;
    if (e2 > -dy) { err -= dy; x0 += sx; }
    if (e2 < dx) { err += dx; y0 += sy; }
  }
}
