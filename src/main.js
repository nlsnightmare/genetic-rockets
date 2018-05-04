import './style.css';

import Rocket from './rocket';
import Target from './target';
import Obstacle from './obstacle';
import {speed, numRockets} from './controlls';



let ctx;
let rockets = [];
let rankings;
let ranking;
let target;

let obstacleButton;
let hardModeButton;
let obstacles = [];

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
    target = new Target(ctx,ctx.width/2 - 25,50,10);
    SetupObstacleButton();


    ranking = document.getElementById('gen');
    rankings = document.getElementById('ranking-list');
    MakeFirstGeneration();


    max_fuel = rockets[0].genes.getLength();
    requestAnimationFrame(Draw);

};

function MakeFirstGeneration() {
    rockets = [];

    for (var i = 0; i < numRockets(); i++) {
	const name = `g0n${i}`;
	rockets.push(new Rocket(ctx,name));
    }
}


function Draw() {
    ClearCanvas('lightblue');
    target.draw();
    for (let obstacle of obstacles) {
	obstacle.draw();
    }
    for (let rocket of rockets) {
	rocket.draw();
    }

    for( let i = 0; i < speed(); i++){
	for (let rocket of rockets) {
	    if (rocket.hasCollided || rocket.hasSucceeded) {
		continue;
	    }
	    rocket.time = time_elapsed;
	    rocket.update();
	    if(target.collidesWith(rocket)){
		rocket.hasSucceeded = true;
	    }

	    for (let obstacle of obstacles) {
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
    let maxFitness = rockets[0].fitness;

    //Διατήρηση των 2 καλύτερων πυραύλων για την επόμενη γενιά
    for (let i = 0; i < 2; i++) {
	let g = rockets[i].genes;
	let r = new Rocket(ctx,rockets[i].name);
	r.genes = g;
	newRockets.push(r);
	r.setColor('green');
    }

    for (let i = 0; i < numRockets() - 2; i++) {
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
	if (obstacles.length > 0) {
	    obstacles = [];
	    obstacleButton.innerHTML = 'Enable Obstacle';
	}
	else {
	    obstacles.push(new Obstacle(ctx,( ctx.width - 250) /2,ctx.height-300,250,50));
	    obstacleButton.innerHTML = 'Disable Obstacle';
	}
    };
}

