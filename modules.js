const print = console.log;

Number.prototype.limit = function (num){
	if (Math.abs(this.valueOf()) > num) {
		return this.valueOf() * num / Math.abs(this.valueOf());
	}
	return this.valueOf();
};

function medText() {
	text(
		'ball pos: ' + [ ball.pos.x.toFixed(2), ball.pos.y.toFixed(2) ],
		ball.pos.x - 90,
		-height + 10,
	);
	text(
		'ball vel: ' + [ ball.vel.x.toFixed(2), ball.vel.y.toFixed(2) ],
		ball.pos.x - 90,
		-height + 30,
	);
	text(
		'mouse: ' + [ (mouseX + ball.pos.x - 100).toFixed(2), mouseY - height ],
		ball.pos.x - 90,
		-height + 50,
	);
}