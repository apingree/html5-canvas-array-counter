var CANVAS_WIDTH = 500;
var CANVAS_HEIGHT = 400;
var WW = CANVAS_WIDTH / 2;
var HH = CANVAS_HEIGHT / 2;
var score = 0;

var canvasElement = $("<canvas id='board' width='" + CANVAS_WIDTH + 
                      "' height='" + CANVAS_HEIGHT + "'></canvas>");
var canvas = canvasElement.get(0).getContext("2d");
canvasElement.appendTo('body');

var FPS = 30;
var dots = [];

function Dot(I) {
  I.active = true;
  I.color = "#A00";
  // I.x = 50;
  // I.y = 50;
  I.width = 10;
  I.height = 10;
  I.draw = function() {
    canvas.fillStyle = this.color;
    canvas.fillRect(this.x, this.y, this.width, this.height);
  };
  I.explode = function() {
    this.active = false;
    removeA(dots, this);
    score++;
  };

  return I;

};

// set up dots
dots.push(Dot({x: WW - 100, y: HH - 100}));
dots.push(Dot({x: WW + 100, y: HH + 100}));
dots.push(Dot({x: WW - 50, y: HH - 50}));
dots.push(Dot({x: WW + 50, y: HH + 50}));
dots.push(Dot({x: WW + 100, y: HH - 100}));
dots.push(Dot({x: WW - 100, y: HH + 100}));
dots.push(Dot({x: WW + 50, y: HH - 50}));
dots.push(Dot({x: WW - 50, y: HH + 50}));
dots.push(Dot({x: WW, y: HH}));

setInterval(function() {
  update();
  draw();
}, 1000/FPS);

function update() { 

  if (keydown.left) {
    player.x -= 5;
  }

  if (keydown.right) {
    player.x += 5;
  }

  if (keydown.up) {
    player.y -= 5;
  }

  if (keydown.down) {
    player.y += 5;
  }

  player.x = player.x.clamp(0, CANVAS_WIDTH - player.width);
  player.y = player.y.clamp(0, CANVAS_HEIGHT - player.height);
  
  if (handleCollisions()) {
  		console.log("collide!");
  };

}

// draw function to produce graphics on screen
function draw() {
	canvas.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
	dots.forEach(function(dot) {
    	dot.draw();
  	});
  	player.draw();
  	canvas.font = 'normal 40pt Arial';
  	canvas.fillText(score, 400, 50);
};

function collides(a, b) {
  return a.x < b.x + b.width &&
         a.x + a.width > b.x &&
         a.y < b.y + b.height &&
         a.y + a.height > b.y;
};

function handleCollisions() {
	dots.forEach(function(dot) {
    	if (collides(dot, player)) {
      		if (dot.active == true) {
      			dot.explode();
  			}
    	};
  	});
};

var player = {
  color: "#00A",
  x: CANVAS_WIDTH / 2 - 16,
  y: CANVAS_HEIGHT - 64,
  width: 32,
  height: 32,
  draw: function() {
    canvas.fillStyle = this.color;
    canvas.fillRect(this.x, this.y, this.width, this.height);
  }
};

function removeA(arr) {
    var what, a = arguments, L = a.length, ax;
    while (L > 1 && arr.length) {
        what = a[--L];
        while ((ax= arr.indexOf(what)) !== -1) {
            arr.splice(ax, 1);
        }
    }
    return arr;
}
