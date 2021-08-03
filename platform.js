class TopPlatform {
	constructor (x, y, x2, color) {
		this.pos = { x: x, x2: x2, y: y };
		this.color = color || [ 200 ];
		//this.height = height;
	}

	update () {
		if (this.detectHit()) {
			ball.bounce();

			ball.pos.y = this.pos.y - 40;
			ball.vel.y = 0;
		}
	}

	detectHit () {
		return (
			Math.abs(this.pos.y - ball.pos.y - 40) < 10 &&
			ball.pos.x + 20 > this.pos.x &&
			ball.pos.x - 20 < this.pos.x2 &&
			ball.vel.y > 0
		);
	}

	show () {
		push();
		fill(...this.color);
		stroke(...this.color);
		strokeWeight(4);
		if (this.pos.x2) {
			line(this.pos.x, this.pos.y, this.pos.x2, this.pos.y);
		} else if (this.pos.y2) {
			line(this.pos.x, this.pos.y, this.pos.x, this.pos.y2);
		}

		pop();
	}

	delete () {
		this.update = this.show = this.delete = () => {};
		platforms.filter((v) => v.pos.x * v.pos.y !== this.pos.x * this.pos.y);
		print('deleted smth');
	}
}

class BottomPlatform extends TopPlatform {
	detectHit () {
		return (
			Math.abs(this.pos.y - ball.pos.y) < 10 &&
			ball.pos.x + 20 > this.pos.x &&
			ball.pos.x - 20 < this.pos.x2 &&
			ball.vel.y < 0
		);
	}

	update () {
		if (this.detectHit()) {
			ball.bounce();

			ball.pos.y = this.pos.y;
			ball.vel.y = -0.5 * ball.vel.y;
		}
	}
}

class LeftPlatform extends TopPlatform {
	constructor (x, y, y2, color) {
		super(x, y, 0, color);
		this.pos = { x: x, y: y, y2: y2 };
		this.color = color || [ 200 ];
		//this.height = height;
	}

	detectHit () {
		return (
			Math.abs(this.pos.x - ball.pos.x - 20) < 5 &&
			ball.pos.y < this.pos.y2 &&
			ball.pos.y > this.pos.y - 40 &&
			ball.vel.x > 0
		);
	}

	update () {
		if (this.detectHit()) {
			ball.pos.x = this.pos.x - 21;
			ball.vel.x = -.5 * ball.vel.x;
		}
	}

	show () {
		push();
		strokeWeight(20);
		stroke(...this.color);
		pop();

		super.show();
	}
}

class RightPlatform extends LeftPlatform {
	detectHit () {
		return (
			Math.abs(this.pos.x - ball.pos.x + 20) < 5 &&
			ball.pos.y < this.pos.y2 &&
			ball.pos.y > this.pos.y - 40 &&
			ball.vel.x < 0
		);
	}

	update () {
		if (this.detectHit()) {
			ball.pos.x = this.pos.x + 21;
			ball.vel.x = -.5 * ball.vel.x;
		}
	}
}

class RectanglePlatform {
	constructor (x1, y1, x2, y2, color) {
		color = color || [ 200 ];
		if (x1 > x2) {
			[ x1, x2 ] = [ x2, x1 ];
		}
		if (y1 > y2) {
			[ y1, y2 ] = [ y2, y1 ];
		}

		this.left = new LeftPlatform(x1, y1, y2, color);
		this.right = new RightPlatform(x2, y1, y2, color);
		this.top = new TopPlatform(x1, y1, x2, color);
		this.bottom = new BottomPlatform(x1, y2, x2, color);

		this.color = color;

		this.v1 = createVector(x1, y1);
		this.v2 = createVector(x2, y2);
	}

	show () {
		push();
		this.left.show();
		this.right.show();
		this.top.show();
		this.bottom.show();

		fill(...this.color);

		rect(
			this.v1.x,
			this.v1.y,
			this.v2.x - this.v1.x,
			this.v2.y - this.v1.y,
		);
		pop();
	}

	update () {
		this.left.update();
		this.right.update();
		this.top.update();
		this.bottom.update();
	}
}

// class HorizontalMovingPlateau extends Plateau {
// 	constructor (_x, y, width, color, speed) {
// 		super(0, y, width, color);
// 		this.vel = createVector(speed, 0);
// 	}
// 	update () {
// 		if (this.pos.x < 0) {
// 			this.pos.x++;
// 			this.vel.mult(-1);
// 		} else if (this.pos.x > width - this.width) {
// 			this.pos.x--;
// 			this.vel.mult(-1);
// 		}

// 		this.pos.add(this.vel);
// 		super.update();
// 	}
// }

// class VerticalMovingPlateau extends Plateau {
// 	constructor (x, y, width, color, maxY, speed) {
// 		super(x, y, width, color);
// 		this.minY = y;
// 		this.maxY = maxY;
// 		this.vel = createVector(0, -speed);
// 	}

// 	update () {
// 		if (this.pos.y > this.minY) {
// 			this.pos.y--;
// 			this.vel.mult(-1);
// 		} else if (this.pos.y < this.maxY) {
// 			this.pos.y++;
// 			this.vel.mult(-1);
// 		}

// 		this.pos.add(this.vel);

// 		super.update();
// 	}
// }
