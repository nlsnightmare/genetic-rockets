export default class Target  {
    constructor(ctx,x,y, r) {
	this.ctx = ctx;
	this.x = x;
	this.y = y;
	this.r = r;
    }

    
    draw(){
	this.ctx.beginPath();
	this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
	this.ctx.fillStyle = 'green';
	this.ctx.fill();
    }
}
