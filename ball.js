class Ball {
	constructor(x, y) {
		this.pos = createVector(x, y);
		this.vel = createVector(0, 0);
		this.acc = createVector(0, 0);

		this.keys = {};
		this.cTexture = assets.ball.s;
		this.changeTexture = true;
		print(this.cTexture);
	}

	update() {
		if (this.pos.x < 0) {
			this.pos.x++;
			this.vel.x *= -0.75;
		}

		if (keyIsPressed) {
			if (this.keys.ArrowUp && this.vel.y == 0) {
				this.acc.add(createVector(0, -6));
			}
			if (this.keys.ArrowLeft && this.vel.y > -3) {
				this.acc.add(createVector(-0.07, 0));
			}
			if (this.keys.ArrowRight && this.vel.x < 3) {
				// && (this.vel.x <= 1 || this.vel.y == 0)) {
				this.acc.add(createVector(0.07, 0));
			}
		}

		this.acc.add(createVector(0, 0.1));

		this.vel.add(this.acc);
		this.vel.mult(0.997);
		//this.vel.x = this.vel.x.limit(3);
		this.vel.y = this.vel.y.limit(10);

		if (this.changeTexture) {
			if (this.vel.x > 0.5) {
				this.cTexture = assets.ball.r;
			} else if (this.vel.x < -0.5) {
				this.cTexture = assets.ball.l;
			} else {
				this.cTexture = assets.spike.s;
			}
		}

		this.pos.add(this.vel);

		this.acc = createVector(0, 0);
	}

	bounce() {
		if (ball.vel.y > 2.5) {
			let i = 0;
			let iinter = setInterval(() => {
				this.changeTexture = false;
				this.cTexture = eval(
					`assets.ball.b${[1, 2, 3, 3, 2, 1][i++]}`,
				);
				if (i > 5) {
					this.changeTexture = true;
					this.cTexture = assets.ball.s;
					clearInterval(iinter);
				}
			}, 70);
		}
	}

	show() {
		push();

		fill(255);
		stroke(255);
		point(this.pos.x, this.pos.y);
		noStroke();

		image(
			this.cTexture,
			this.pos.x - this.cTexture.width / 2,
			this.pos.y + 40 - this.cTexture.height,
		);

		pop();
	}
}