const speed = document.getElementById('speed');
const speedLabel = document.getElementById("speedLabel");
function getSpeed() {
    return speed.value;
}
speed.oninput = function(e) {
    speedLabel.textContent = `Speed: ${this.value}x`;
};


const rockets = document.getElementById('rockets');
const rocketsLabel = document.getElementById("rocketsLabel");
rockets.oninput = function(e) {
    rocketsLabel.textContent = `Rockets per gen: ${e.target.value}`;
};

function getRockets() {
    return rockets.value;
}


const mutation = document.getElementById('mutation');
const mutationLabel = document.getElementById("mutationLabel");
mutation.oninput = function(e) {
    mutationLabel.textContent = `Mutation rate: ${e.target.value}%`;
};

function getMutation() {
    return mutation.value / 100;
}



module.exports = {
    speed: getSpeed,
    numRockets: getRockets,
    mutationRate: getMutation
};
