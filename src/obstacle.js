export default class Obstacle {
    constructor(ctx,x,y,w,h) {
	this.ctx = ctx;
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
    }


    draw(){
	this.ctx.fillStyle = 'darkblue';
	this.ctx.fillRect(this.x,this.y,this.w,this.h);
    }

    collidesWith(r){
	let colsX = this.x < r.x + r.w && this.x + this.w > r.x;
	let colsY = this.y < r.y + r.h && this.y + this.h > r.y;

	return colsX && colsY;
    }
    
}
