export class Point {
  x: number;
  y: number;
  value: number;

  f = (x: number) => {
    return 0.3 * x + 0.2;
  };

  constructor() {
    this.x = seedRandom(0, 1);
    this.y = seedRandom(0, 1);

    this.value = this.x > this.f(this.x) ? 1 : -1;
  }
}

export let seed = 0;
export const seedRandom = (min: number = 0, max: number = 1): number => {
  max = max || 1;
  min = min || 0;

  seed = (seed * 9301 + 49297) % 233280;
  var rnd = seed / 233280;

  return min + rnd * (max - min);
};
