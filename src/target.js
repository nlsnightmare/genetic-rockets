export default class Target  {
    constructor(ctx,x,y, r) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.r = r;

    }

    collidesWith(r){
        let circleDistance = {};
        circleDistance.x = Math.abs(this.x - r.x);
        circleDistance.y = Math.abs(this.y - r.y);

        if (circleDistance.x > (r.w/2 + this.r)) { return false; }
        if (circleDistance.y > (r.h/2 + this.r)) { return false; }

        if (circleDistance.x <= (r.w/2)) { return true; } 
        if (circleDistance.y <= (r.h/2)) { return true; }

        let cornerDistance_sq = Math.pow((circleDistance.x - r.w/2),2) +
            Math.pow((circleDistance.y - r.h/2),2);

        return (cornerDistance_sq <= (this.r * this.r));
    }



    draw(){
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r * 2, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = 'green';
        this.ctx.fill();
    }
}
