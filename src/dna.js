import {mutationRate} from './controlls';


const SCALE = 1;
const GENE_LEN = 400;

export default class DNA {
    constructor(){
        this.dna = Array(GENE_LEN);

        for (var i = 0; i < GENE_LEN; i++) {
            this.dna[i] = {
                x: ( Math.random() - 0.5 ) * SCALE,
                y: ( Math.random() - 0.5 ) * SCALE,
            };
        }
    }

    getLength(){
        return GENE_LEN;
    }

    crossover(other){
        const mutation_rate = mutationRate();
        let nDNA = new DNA(this.dna.length);

        for (var i = 0; i < this.dna.length; i++) {
            if (Math.random() > 0.5) {
                nDNA.dna[i] = this.dna[i];
            }
            else {
                nDNA.dna[i] = other.dna[i];
            }

            if (Math.random() < mutation_rate) {
                if (Math.random() < 0.5) {
                    nDNA.dna[i].x += ( Math.random() - 0.5 ) * SCALE / 10;
                    nDNA.dna[i].y += ( Math.random() - 0.5 ) * SCALE / 10;
                }
                else {
                    nDNA.dna[i] = {
                        x: ( Math.random() - 0.5 ) * SCALE,
                        y: ( Math.random() - 0.5 ) * SCALE
                    };
                }
            }
        }

        return nDNA;
    }
}
