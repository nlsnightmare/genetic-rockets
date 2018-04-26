export default class Target  {
    constructor(ctx,x,y, r) {
	this.ctx = ctx;
	this.x = x;
	this.y = y;
	this.r = r;
    }

    collidesWith(r){
	let colsX = this.x < r.x + r.w && this.x + this.r > r.x;
	let colsY = this.y < r.y + r.h && this.y + this.r > r.y;

	return colsX && colsY;
    }
    
    draw(){
	this.ctx.beginPath();
	this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
	this.ctx.fillStyle = 'green';
	this.ctx.fill();
    }
}
