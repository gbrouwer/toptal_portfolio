
let w;
let columns;
let rows;
let board;
let next;
let myCanvas
let resetButton;
let playButton;
let stopButton;
let lifeProb;
var life_probability = 0.01
let lifetext;

// Fill board randomly
function init() {
  lifeProb.value()
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      let randval = Math.random()
      next[i][j] = 0;
      if (randval < life_probability) {
        board[i][j] = 1.0
      } else {
        board[i][j] = 0.0
      }
      if (i === 0 || j === 0 || i === columns - 1 || j === rows - 1) board[i][j] = 0;
    }
  }
}

// Reset Button
function reset() {
  life_probability = lifeProb.value()
  console.log(life_probability);
  init()
  draw()
}

function start() {
  loop();
}

function stop() {
  noLoop();
  draw()
}

function getProb() {
  let life_probability = parseFloat(this.value());
}

function setup() {

  life_probability = 0.01
  background(0);
  noLoop();

  startButton = createButton('Start Stimulation');
  startButton.parent("section_zero_body")
  startButton.mousePressed(start);

  stopButton = createButton('Stop Simulation');
  stopButton.parent("section_zero_body")
  stopButton.mousePressed(stop);

  resetButton = createButton('Reset Simulation');
  resetButton.parent("section_zero_body")
  resetButton.mousePressed(reset);

  var blank1  = createElement('h2', '');
  blank1.parent("section_zero_body")

  // textAlign(CENTER);
  lifeProb = createInput(str(life_probability))
  lifeProb.parent("section_zero_body")
  lifeProb.size(200);
  lifeProb.style('background-color', '#fff');
  lifeProb.style('font-family', 'Navigo');
  lifeProb.style('text-align', 'center');
  lifeProb.style('font-weight', 400);
  lifeProb.style('font-size', '14pt');
  lifeProb.style('font-style', 'normal');
  lifeProb.center('horizontal');
  lifeProb.input(getProb);

  var blank2  = createElement('h2', 'BBB');
  blank2.parent("section_zero_body")

  lifetext = createElement('h4', 'Life Probability');
  lifetext.parent("section_zero_body")
  lifetext.center('horizontal');

  var blank3  = createElement('h1', '');
  blank3.parent("section_zero_body")

  myCanvas = createCanvas(600, 600);
  myCanvas.parent("section_one_body")

  w = 10;
  columns = floor(width / w);
  rows = floor(height / w);
  board = new Array(columns);
  for (let i = 0; i < columns; i++) {
    board[i] = new Array(rows);
  }
  next = new Array(columns);
  for (i = 0; i < columns; i++) {
    next[i] = new Array(rows);
  }
  init();

}

function draw() {
  background(255);
  generate();
  for ( let i = 0; i < columns;i++) {
    for ( let j = 0; j < rows;j++) {
      if ((board[i][j] === 1)) fill(0);
      else fill(255);
      stroke(0);
      rect(i * w, j * w, w-1, w-1);
    }
  }
}

// reset board when mouse is pressed
function mousePressed() {
  // init();
}

// The process of creating the new generation
function generate() {

  for (let x = 1; x < columns - 1; x++) {
    for (let y = 1; y < rows - 1; y++) {
      let neighbors = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          neighbors += board[x+i][y+j];
        }
      }

      neighbors -= board[x][y];
      if      ((board[x][y] === 1) && (neighbors <  2)) next[x][y] = 0;           // Loneliness
      else if ((board[x][y] === 1) && (neighbors >  3)) next[x][y] = 0;           // Overpopulation
      else if ((board[x][y] === 0) && (neighbors === 3)) next[x][y] = 1;           // Reproduction
      else {
        next[x][y] = board[x][y];
      }
    }
  }

  // Swap!
  let temp = board;
  board = next;
  next = temp;
}

