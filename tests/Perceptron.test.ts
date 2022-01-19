import Perceptron from '../src/Perceptron';
import { Point } from '../src/util';

describe('Percepton', () => {
  const p = new Perceptron(4, true);

  it('should initialize with (random) values', () => {
    expect(p.weights).toStrictEqual([
      0.21132115912208504, 0.7094221536351166, 0.5467721193415638,
      0.7388031550068587,
    ]);
  });

  it('should return a guess value based on the input', () => {
    const input1 = [-1.0, 0.5, 0.25, 0.2];
    const input2 = [-1.0, -0.5, 0.25, -0.1];

    expect(p.guess(input1)).toBe(1);
    expect(p.guess(input2)).toBe(-1);
  });

  it('should be able to train on a given set', () => {
    const brain = new Perceptron(2, true);
    const trainData = new Array<Point | null>(101)
      .fill(null)
      .map(() => new Point());
    for (let data of trainData) {
      const point = [data.x, data.y];
      const target = data.value;
      brain.train(point, target);
    }

    let succ = 0;
    let fail = 0;
    for (let i = 0; i < 10; i++) {
      const p = new Point();
      const guess = brain.guess([p.x, p.y]);
      guess == p.value ? succ++ : fail++;
    }
    expect(fail / (succ + fail)).toBe(0.1);
  });
});
