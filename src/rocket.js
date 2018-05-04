const ROCKET_HEIGHT = 50;
const ROCKET_WIDTH = 20;

import DNA from './dna';

export default class Rocket {
    constructor(ctx, name) {
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

	this.genes = new DNA();

	this.time = 0;
    }

    setColor(c){
	this.color = c;
    }

    calculateFitness(target){
	//Υπολογίζουμε την ευκλείδεια απόσταση από τον στόχο
	let dis = Math.floor(Math.sqrt( Math.pow( target.x - this.x,2 ) + Math.pow(target.y - this.y,2)));
	//Όσο μικρότερη είναι η απόσταση, τόσο μεγαλύτερη ειναι η
	//καταλληλότητα
	if (dis > this.ctx.height) {
	    this.fitness = 0;
	    return;
	}
	this.fitness =  Math.pow(dis - this.ctx.height,2);
	//"Τιμωρούμε" τους πυραύλους που χτύπησαν
	if (this.hasCollided) {
	    this.fitness /= 100;
	}
	//"Ανταμείβουμε" τους πυραύλους που έφτασαν τον στόχο
	else if (this.hasSucceeded) {
	    this.fitness *= 10;
	}
	//"Τιμωρούμε" τους πυραύλους που αργούν
	this.fitness /= this.time;
    }


    update(){
	//επιλογή της τωρινής ταχύτητας
	const speed = this.genes.dna[this.curr];
	//Αν δεν έχουμε φτάσει στον στόχο ή δεν χτυπήσαμε ας προχωρίσουμε
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
