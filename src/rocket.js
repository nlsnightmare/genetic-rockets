const ROCKET_HEIGHT = 50;
const ROCKET_WIDTH = 20;

import DNA from './dna';

export default class Rocket {
    constructor(ctx, name, len) {
	//Δεδομένα για την εμφάνιση του πυραύλου στην οθόνη
	this.ctx = ctx;
	this.color = 'white';

	this.name = name;
	this.fitness = 0;

	this.curr = 0;

	this.hasCollided = false;
	this.hasSucceeded = false;

	//Θέση, μέγεθος του πυραύλου
	this.x = ( this.ctx.width - ROCKET_WIDTH ) / 2;
	this.y = this.ctx.height - ROCKET_HEIGHT;
	this.w = ROCKET_WIDTH;
	this.h = ROCKET_HEIGHT;

	//Τα γονίδια του πυραύλου(αρχικά τυχαία)
	this.genes = new DNA(len);
    }

    setColor(c){
	this.color = c;
    }

    calculateFitness(target){
	//Υπολογίζουμε την απόσταση από τον στόχο
	let dis = Math.floor(Math.sqrt( Math.pow( target.x - this.x,2 ) + Math.pow(target.y - this.y,2)));
	//Μεγαλύτερη απόσταση συνεπάγεται χειρότερο σκορ,
	//επομένως την αφαιρούμε από μια σταθερά
	this.fitness = this.ctx.height - dis;
	//Αν ο πύραυλος χτύπησε στο εμπόδιο το σκορ του πρέπει
	//να είναι μικρότερο
	if (this.hasCollided) {
	    this.fitness -= 400;
	}
	//Φτάσαμε στον στόχο μας, επομένως θέλουμε
	//να του δώσουμε ένα bonus
	if (this.hasSucceeded) {
	    this.fitness += 1000;
	}
    }


    draw(){
	//Επιλέγουμε την τωρινή ταχύτητα
	const speed = this.genes.dna[this.curr];
	//Αν έχουμε χτυπήσει με το εμποδιο ή φτάσαμε τον στόχο δεν έχει νόημα
	//να συνεχίσουμε
	if (speed !== undefined && !this.hasCollided && !this.hasSucceeded) {
	    this.x += speed.x;
	    this.y += speed.y;
	}
	//Εμφανίζουμε τον πύραυλο
	this.ctx.fillStyle = this.color;
	this.ctx.fillRect(this.x,this.y,this.w,this.h);
	this.ctx.fillStyle = 'black';
	this.ctx.lineWidth = '3';
	this.ctx.strokeRect(this.x,this.y,this.w,this.h);
	

	this.curr++;
    }
}
