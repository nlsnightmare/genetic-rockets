import './style.css';

import Rocket from './rocket';
import Target from './target';
import Obstacle from './obstacle';

const NUM_ROCKETS = 50;

const speed = document.getElementById('speed');

let ctx;
let rockets = [];
let rankings;
let ranking;
let target;

let obstacleButton;
let hasObstacle = false;
let obstacle;

let drawCall;
let generation = 1;
// const dt = ( 1000/60 );
const dt = 10;
const newGenDelay = 20;
let nextGenTimeout;
let time_elapsed = 0;

let max_fuel;

window.onload = () => {
    ctx = InitializeContext();
    target = new Target(ctx,ctx.width/2 - 25,50,20);
    SetupObstacleButton();

    if (hasObstacle) {
	obstacle = new Obstacle(ctx,( ctx.width - 250) /2,ctx.height-300,250,50);
    }

    ranking = document.getElementById('gen');
    rankings = document.getElementById('ranking-list');

    for (var i = 0; i < NUM_ROCKETS; i++) {
	const name = `g0n${i}`;
	//Δημιουργία Αρχικού Πληθυσμού με τυχαία ονόματα
	rockets.push(new Rocket(ctx,name));
    }

    max_fuel = rockets[0].genes.getLength();
    requestAnimationFrame(Draw);

};

function Draw() {
    ClearCanvas('lightblue');
    target.draw();
    if (hasObstacle) {
	obstacle.draw();
    }
    for (let rocket of rockets) {
	rocket.draw();
    }

    for( let i = 0; i < speed.value; i++){
	for (let rocket of rockets) {
	    if (rocket.hasCollided || rocket.hasSucceeded) {
		continue;
	    }
	    rocket.time = time_elapsed;
	    rocket.update();
	    if(target.collidesWith(rocket)){
		rocket.hasSucceeded = true;
	    }

	    if (hasObstacle) {
		//Χτυπήσαμε με το εμπόδιο
		if (obstacle.collidesWith(rocket)) {
		    rocket.hasCollided = true;
		    rocket.setColor('red');
		}
	    }
	}
	time_elapsed += dt;

	if (time_elapsed >= max_fuel * dt) {
	    time_elapsed = 0;
	    CalculateRocketFitness();
	    DisplayRankings();
	    GenerateNext();
	}
    }
    requestAnimationFrame(Draw);
}

function InitializeContext() {
    const canvas = document.getElementById("canvas");
    let ctx = canvas.getContext('2d');
    ctx.font="30px Verdana";
    ctx.height = canvas.height;
    ctx.width = canvas.width;
    return ctx;
}

function ClearCanvas(color) {
    ctx.fillStyle = color;
    ctx.fillRect(0,0, ctx.width, ctx.height);
}

function DisplayRankings() {
    ranking.innerHTML =  "Generation #" + generation ;
    rankings.innerHTML = '';
    for (var i = 0; i < rockets.length; i++) {
	let r = rockets[i];
	rankings.innerHTML += '<li>' + r.name + ' score: ' + r.fitness.toFixed(2) + '</li>';
    }
}


function CalculateRocketFitness() {
    for (var i = 0; i < rockets.length; i++) {
	rockets[i].calculateFitness(target);
    }
    rockets.sort((r1, r2) => {
	return r2.fitness - r1.fitness;
    });
}

function GenerateNext() {
    let newRockets = [];


    // Εύρεση του καλύτερου σκορ
    let maxFitness = -Infinity;
    for (const r of rockets) {
	if (r.fitness > maxFitness) {
	    maxFitness = r.fitness;
	}
    }

    //Διατήρηση των 3 καλύτερων πυραύλων για την επόμενη γενιά
    for (let i = 0; i < 3; i++) {
	let g = rockets[i].genes;
	let r = new Rocket(ctx,rockets[i].name);
	r.genes = g;
	newRockets.push(r);
	r.setColor('green');
    }

    for (let i = 0; i < NUM_ROCKETS - 2; i++) {
	const name = `g${generation}n${i}`;

	//Επιλογή 2 τυχαίων πυραύλων
	let r1 = AcceptReject(maxFitness);
	let r2 = AcceptReject(maxFitness);

	//Ανταλλαγή γονιδίων
	let g = r1.genes.crossover(r2.genes);
	let r = new Rocket(ctx,name);
	r.genes = g;
	newRockets.push(r);
    }
    rockets = newRockets;
    generation++;
}

function AcceptReject(max) {
    let safety = 0;
    while(true){
	let r = Math.floor(Math.random() * max);
	let i = Math.floor(Math.random() * rockets.length);

	if (rockets[i].fitness > r) {
	    return rockets[i];
	}

	if (safety >= 1000)
	    throw new Error("AcceptReject couldn't find a rocket!");
	safety++;
    }
}



function SetupObstacleButton(){
    obstacleButton = document.getElementById("toggle-obstacle");
    obstacleButton.onclick = () => {
	if (hasObstacle) {
	    obstacle = undefined;
	    obstacleButton.innerHTML = 'Enable Obstacle';
	}
	else {
	    obstacle = new Obstacle(ctx,( ctx.width - 250) /2,ctx.height-300,250,50);
	    obstacleButton.innerHTML = 'Disable Obstacle';
	}
	hasObstacle = !hasObstacle;
    };
}
