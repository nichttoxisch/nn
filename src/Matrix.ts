import { seedRandom } from './util';

export default class Matrix {
  rows: number;
  cols: number;
  data: number[][];

  constructor(rows: number, cols: number) {
    this.cols = cols;
    this.rows = rows;

    this.data = new Array(rows).fill([]).map(() => new Array(cols).fill(0));
  }

  log = () => {
    console.table(this.data);
  };

  set = (value: number[][]) => {
    if (this.rows != value.length || this.cols != value[0].length) {
      console.log('Matrix size not matching');
      return;
    }
    this.data = value;
  };

  map = (func: (n: number) => number) => {
    for (let i in this.data) {
      for (let j in this.data[0]) {
        this.data[i][j] = func(this.data[i][j]);
      }
    }
  };

  static map = (m1: Matrix, func: (n: number) => number): Matrix => {
    const res = new Matrix(m1.rows, m1.cols);
    for (let i in m1.data) {
      for (let j in m1.data[0]) {
        res.data[i][j] = func(m1.data[i][j]);
      }
    }
    return res;
  };

  mult = (factor: number | Matrix) => {
    if (typeof factor == 'number') {
      for (let i in this.data) {
        for (let j in this.data[0]) {
          this.data[i][j] *= factor;
        }
      }
    } else if (factor instanceof Matrix) {
      for (let i in this.data) {
        for (let j in this.data[0]) {
          this.data[i][j] *= factor.data[i][j];
        }
      }
    }
  };

  add = (n: number | Matrix) => {
    if (typeof n == 'number') {
      for (let i in this.data) {
        for (let j in this.data[0]) {
          this.data[i][j] += n;
        }
      }
    } else if (n instanceof Matrix) {
      for (let i in this.data) {
        for (let j in this.data[0]) {
          this.data[i][j] += n.data[i][j];
        }
      }
    } else console.log('no matching input type');
  };

  static sub = (m1: Matrix, m2: Matrix): Matrix => {
    const res = new Matrix(m1.rows, m1.cols);
    for (let i in m1.data) {
      for (let j in m1.data[0]) {
        res.data[i][j] = m1.data[i][j] - m2.data[i][j];
      }
    }
    return res;
  };

  randomize = (test = false) => {
    for (let i in this.data) {
      for (let j in this.data[0]) {
        this.data[i][j] = test ? seedRandom() : Math.random() * 0.5 + 0.25;
      }
    }
  };

  static transpose = (m1: Matrix): Matrix => {
    const res = new Matrix(m1.cols, m1.rows);
    for (let i in m1.data) {
      for (let j in m1.data[0]) {
        res.data[j][i] = m1.data[i][j];
      }
    }
    return res;
  };

  static mult = (m1: Matrix, m2: Matrix): Matrix => {
    if (m1.cols != m2.rows) {
      console.log('cols of a matrix must match rows of multiplication matrix');
      return new Matrix(0, 0);
    }

    const res = new Matrix(m1.rows, m2.cols);

    let a = m1.data;
    let b = m2.data;

    let i: any = 0;
    let j: any = 0;
    for (i in res.data) {
      for (j in res.data[0]) {
        let sum = 0;
        for (let k = 0; k < m1.cols; k++) sum += a[i][k] * b[k][j];
        res.data[i][j] = sum;
      }
    }

    return res;
  };

  static from_array = (arr: number[]): Matrix => {
    let m = new Matrix(arr.length, 1);
    for (let i in arr) m.data[i][0] = arr[i];
    return m;
  };

  to_array = (): number[] => {
    let arr = [];
    for (let i in this.data) {
      for (let j in this.data[0]) {
        arr.push(this.data[i][j]);
      }
    }
    return arr;
  };
}
