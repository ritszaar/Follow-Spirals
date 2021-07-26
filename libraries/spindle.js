const PI = 3.1415926535;
class Spindle {

    constructor(n, k, r, maxSpeed) {
        this.n = n;
        this.k = k;
        this.r = r;
        this.maxSpeed = maxSpeed;
        this.particles = [];
        this.markings = [];

        let deltaAngle = 2 * PI/this.n;

        for (let i = 0; i < this.n; i++) {
            let angle = i * deltaAngle - PI/2;
            let x = canvas.width/2  + this.r * Math.cos(angle);
            let y = canvas.height/2 + this.r * Math.sin(angle);
            this.particles.push(new Particle(x, y, maxSpeed));
            let mx = canvas.width/2  + (this.r + 20) * Math.cos(angle);
            let my = canvas.height/2 + (this.r + 20) * Math.sin(angle);
            this.markings.push(new Vector(mx, my, 0));
        }
    }

    display() {

        let imageData = g.getImageData(0, 0, canvas.offscreenCanvas.width, canvas.offscreenCanvas.height);
        c.putImageData(imageData, 0, 0);

        c.lineWidth = 2;

        // Draw the numberings
        for (let i = 0; i < this.markings.length; i++) {
            c.fillText(i + 1, this.markings[i].x, this.markings[i].y);
        }

        // Draw the regular polygon formed by initial particle positions
        c.strokeStyle = "rgb(255, 0, 0)";
        c.beginPath();
        c.moveTo(this.particles[0].start.x, this.particles[0].start.y);
        for (let i = 1; i < this.particles.length; i++) {
            c.lineTo(this.particles[i].start.x, this.particles[i].start.y);
        }
        c.closePath();
        c.stroke();


        // Draw the dynamic regular polygon with current positions of particles
        c.strokeStyle= "rgb(0, 0, 255)";
        c.beginPath();
        c.moveTo(this.particles[0].pos.x, this.particles[0].pos.y);
        for (let i = 1; i < this.particles.length; i++) {
            c.lineTo(this.particles[i].pos.x, this.particles[i].pos.y);
        }
        c.closePath();
        c.stroke();

        g.lineWidth = 2;

        // Draw the offscreen traces
        g.strokeStyle = "rgb(0, 255, 0)";
        g.beginPath();
        for (let particle of this.particles) {
            g.moveTo(particle.ppos.x, particle.ppos.y);
            g.lineTo(particle.pos.x, particle.pos.y);
        }
        g.stroke();
    }

    update() {
        for (let i = 0; i < this.n; i++) {
            this.particles[i].follow(this.particles[this.getNextIndex(i)]);
        }
        for (let particle of this.particles) particle.update();
    }

    getNextIndex(i) {
        if (i + this.k < this.n) return i + this.k;
        else return (i + this.k - this.n);
    }
}
