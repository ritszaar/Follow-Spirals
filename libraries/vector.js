class Vector {

    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    copy() {
        return new Vector(this.x, this.y, this.z);
    }

    static copy(v) {
        return new Vector(v.x, v.y, v.z);
    }

    static fromHeading2D(angle) {
        return new Vector(Math.cos(angle), Math.sin(angle));
    }

    static fromRandom2D() {
        let angle = Math.random() * Math.PI * 2;
        return new Vector(Math.cos(angle), Math.sin(angle));
    }

    normalize() {
        let len = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
        this.x /= len;
        this.y /= len;
        this.z /= len;
    }

    static normalize(v) {
        let len = Math.sqrt(Math.pow(v.x, 2) + Math.pow(v.y, 2) + Math.pow(v.z, 2));
        return new Vector(v.x/len, v.y/len, v.z/len);
    }

    mult(val) {
        this.x *= val;
        this.y *= val;
        this.z *= val;
    }

    static mult(v, val) {
        return new Vector(v.x * val, v.y * val, v.z * val);
    }

    setMag(val) {
        this.normalize();
        this.scale(val);
    }

    static setMag(v, val) {
        let newV = Vector.normalize(v);
        newV.scale(val);
        return newV;
    }

    getMag() {
        let len = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2) + Math.pow(this.z, 2));
        return len;
    }

    add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
    }

    static add(a, b) {
        return new Vector(a.x + b.x, a.y + b.y, a.z + b.z);
    }

    subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
    }

    static subtract(a, b) {
        return new Vector(a.x - b.x, a.y - b.y, a.z - b.z);
    }

    dotProduct(v) {
        this.x *= v.x;
        this.y *= v.y;
        this.z *= v.z;
    }

    static dotProduct(a, b) {
        return new Vector(a.x * b.x, a.y * b.y, a.z * b.z);
    }

    crossProduct(v) {
        let tx = this.x;
        let ty = this.y;
        let tz = this.z;
        this.x = ty * v.z - tz * v.y;
        this.y = tz * v.x - tx * v.z;
        this.z = tx * v.y - ty * v.x;
    }

    static crossProduct(a, b) {
        let newX = a.y * b.z - a.z * b.y;
        let newY = a.z * b.x - a.x * b.z;
        let newZ = a.x * b.y - a.y * b.x;
        return new Vector(newX, newY, newZ);
    }
}
