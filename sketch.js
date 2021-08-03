let canvas;
let ball;
let platforms = [];
let mkoords = [];

let assets = { ball: {}, spike: {} };

function preload (){
	for (let i = 0; i < 6; i++) {
		assets.ball['l,r,s,b1,b2,b3'.split(',')[i]] = loadImage(
			`assets/ball_${i}.png`,
		);
		assets.spike.s = loadImage("assets/spike_0.png")
	}
}

function setup (){
	canvas = createCanvas(600, 400);
	ball = new Ball(100, -300);
	platforms.push(new RectanglePlatform(0, -10, 10000, 10));
}

function draw (){
	background(40);

	translate(-ball.pos.x + 100, height);

	textAlign(LEFT, TOP);

	for (let i = 0; i < platforms.length; i++) {
		platforms[i].update();
		platforms[i].show();
	}

	if (mkoords.length == 2) {
		rect(
			mkoords[0],
			mkoords[1],
			mouseX + ball.pos.x - 100 - mkoords[0],
			mouseY - height - mkoords[1],
		);
	}

	ball.update();
	ball.show();

	medText();
}

function mousePressed (){
	mkoords = [ mouseX + ball.pos.x - 100, mouseY - height ];
}

function mouseReleased (){
	platforms.push(
		new RectanglePlatform(
			mkoords[0],
			mkoords[1],
			mouseX + ball.pos.x - 100,
			mouseY - height,
			[ random(255), random(255), random(255) ],
		),
	);
	mkoords = [];
}

function keyPressed (e){
	ball.keys[e.key] = true;
}

function keyReleased (e){
	ball.keys[e.key] = false;
}
