const ROCKET_HEIGHT = 50;
const ROCKET_WIDTH = 20;
const GRAVITY = -2;

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

        this.speed = { x:0, y: 0 };

        this.genes = new DNA();

        this.time = 0;
    }

    setColor(c){
        this.color = c;
    }

    calculateFitness(target){
        // Calculate Euclidean Distance from the target
        let dis = Math.floor(Math.sqrt( Math.pow( target.x - this.x,2 ) + Math.pow(target.y - this.y,2)));
        // We want out fitness to get bigger as the distance gets smaller
        if (dis > this.ctx.height) {
            this.fitness = 0;
            return;
        }
        this.fitness =  Math.pow(dis - this.ctx.height,2);
        // "Punish" rockets who have collided 
        if (this.hasCollided) {
            this.fitness /= 100;
        }
        // "Reward" rockets who succeed
        else if (this.hasSucceeded) {
            this.fitness *= 10;
        }
        // Also "Punish" rockets who are late
        this.fitness /= this.time;
    }


    update(){
        // Select current speed
        const accel = this.genes.dna[this.curr];
        // As long as we haven't reached our target or collided, keep going 
        if (accel !== undefined && !this.hasCollided && !this.hasSucceeded) {
            this.speed.x += accel.x;
            this.speed.y += accel.y;
        }

        this.x += this.speed.x;
        this.y += this.speed.y;
        this.y -= GRAVITY;
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
