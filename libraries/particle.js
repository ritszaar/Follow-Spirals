class Particle {

    constructor(x, y, maxSpeed) {
        this.start = new Vector(x, y, 0);
        this.ppos = new Vector(x, y, 0);
        this.pos = new Vector(x, y, 0);;
        this.vel = new Vector(0, 0, 0);
        this.acc = new Vector(0, 0, 0);
        this.maxSpeed = maxSpeed;
    }

    update() {
        this.vel.add(this.acc);
        this.ppos = this.pos.copy();
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    follow(particle) {
        let dir = Vector.subtract(particle.pos, this.pos);
        dir.normalize();
        dir.mult(this.maxSpeed);
        this.vel = dir.copy();
    }
}
