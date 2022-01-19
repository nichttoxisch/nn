import { exit } from 'process';
import { seedRandom } from './util';

export default class Perceptron {
  size: number;
  weights: number[];
  lr: number = 0.1;

  constructor(size: number, test = false) {
    this.size = size;
    if (test) {
      this.weights = new Array(size).fill(0).map(() => seedRandom());
    } else {
      this.weights = new Array(size).fill(0).map(() => Math.random());
    }
  }

  guess = (input: number[]): number => {
    if (input.length != this.weights.length) {
      console.log('Persopton input length does not match');
      exit(-1);
    }

    let sum = 0;
    for (let i in this.weights) {
      sum += this.weights[i] * input[i];
    }

    return Math.sign(sum);
  };

  train = (input: number[], tar: number) => {
    const guess = this.guess(input);
    const error = tar - guess;

    for (let i in this.weights) {
      this.weights[i] += error * input[i] * this.lr;
    }
  };
}
