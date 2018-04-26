const ROCKET_HEIGHT = 50;
const ROCKET_WIDTH = 20;

import DNA from './dna';

export default class Rocket {
    constructor(ctx, name, len) {
	this.ctx = ctx;
	this.color = 'white';

	this.name = name;
	this.fitness = 0;

	this.curr = 0;
	this.hasCollided = false;
	this.hasSucceeded = false;

	this.x = ( this.ctx.width - ROCKET_WIDTH ) / 2;
	this.y = this.ctx.height - ROCKET_HEIGHT;
	this.w = ROCKET_WIDTH;
	this.h = ROCKET_HEIGHT;

	this.genes = new DNA(len);

	this.time = 0;
    }

    setColor(c){
	this.color = c;
    }

    calculateFitness(target){
	let dis = Math.floor(Math.sqrt( Math.pow( target.x - this.x,2 ) + Math.pow(target.y - this.y,2)));
	this.fitness =  Math.pow(dis - this.ctx.height,2);
	if (this.hasCollided) {
	    this.fitness /= 100;
	}
	else if (this.hasSucceeded) {
	    this.fitness *= 100;
	}
	this.fitness /= this.time;
    }


    update(){
	const speed = this.genes.dna[this.curr];
	if (speed !== undefined && !this.hasCollided && !this.hasSucceeded) {
	    this.x += speed.x;
	    this.y += speed.y;
	}
	this.curr++;
    }

    draw(){
	this.ctx.fillStyle = this.color;
	this.ctx.fillRect(this.x,this.y,this.w,this.h);
	this.ctx.fillStyle = 'black';
	this.ctx.lineWidth = '3';
	this.ctx.strokeRect(this.x,this.y,this.w,this.h);
    }
}
