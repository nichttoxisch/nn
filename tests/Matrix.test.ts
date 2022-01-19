import Matrix from '../src/Matrix';

describe('Matrix', () => {
  const rows = 3;
  const cols = 2;

  it('should create a new matrix', () => {
    const m1 = new Matrix(rows, cols);
    expect(m1.data.length).toBe(rows);
    expect(m1.data[0].length).toBe(cols);
  });

  it('should map a function to every element', () => {
    const m1 = new Matrix(2, 2);
    const sign = (n: number): number => {
      return n > 0 ? 1 : -1;
    };
    m1.set([
      [1, -2],
      [3, -4],
    ]);
    m1.map(sign);
    expect(m1.data).toStrictEqual([
      [1, -1],
      [1, -1],
    ]);
  });

  it('should scale by a integer', () => {
    const m1 = new Matrix(rows, cols);
    const m2 = new Matrix(rows, cols);
    m1.set([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
    m2.set([
      [2, 4],
      [6, 8],
      [10, 12],
    ]);

    m1.mult(2);
    expect(m1.data).toStrictEqual(m2.data);
  });

  it('should scale by a matrix', () => {
    const m1 = new Matrix(rows, cols);
    const m2 = new Matrix(rows, cols);
    const m3 = new Matrix(rows, cols);

    m1.set([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
    m2.set([
      [1, 2],
      [1, 2],
      [1, 2],
    ]);
    m3.set([
      [1, 4],
      [3, 8],
      [5, 12],
    ]);

    m1.mult(m2);
    expect(m1.data).toStrictEqual(m3.data);
  });

  it('should add a integer', () => {
    const m1 = new Matrix(rows, cols);
    const m2 = new Matrix(rows, cols);
    m1.set([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
    m2.set([
      [3, 4],
      [5, 6],
      [7, 8],
    ]);

    m1.add(2);
    expect(m1.data).toStrictEqual(m2.data);
  });

  it('should add a matrix', () => {
    const m1 = new Matrix(rows, cols);
    const m2 = new Matrix(rows, cols);
    const m3 = new Matrix(rows, cols);

    m1.set([
      [6, 5],
      [4, 3],
      [2, 1],
    ]);
    m2.set([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
    m3.set([
      [7, 7],
      [7, 7],
      [7, 7],
    ]);

    m1.add(m2);
    expect(m1.data).toStrictEqual(m3.data);
  });

  it('should randomize', () => {
    const m1 = new Matrix(rows, cols);
    m1.randomize(true);

    expect(m1.data).toStrictEqual([
      [0.21132115912208504, 0.7094221536351166],
      [0.5467721193415638, 0.7388031550068587],
      [0.819465877914952, 0.06345164609053498],
    ]);
  });

  it('should transpose', () => {
    const m1 = new Matrix(1, 2);
    m1.set([[1, 2]]);
    const m2 = Matrix.transpose(m1);
    expect(m2.data).toStrictEqual([[1], [2]]);
  });

  it('should multiply two matrixes', () => {
    const m1 = new Matrix(2, 3);
    const m2 = new Matrix(3, 2);
    const m3 = new Matrix(2, 2);

    m1.set([
      [1, 2, 3],
      [4, 5, 6],
    ]);
    m2.set([
      [1, 2],
      [3, 4],
      [5, 6],
    ]);
    m3.set([
      [22, 28],
      [49, 64],
    ]);

    const c = Matrix.mult(m1, m2);
    expect(c.data).toStrictEqual(m3.data);
  });

  it('should chreate a new Matrix from an Array', () => {
    const m1 = Matrix.from_array([1, 2, 3]);
    expect(m1.data).toStrictEqual([[1], [2], [3]]);
  });

  it('should chreate a new Array from an Matrix', () => {
    const m1 = new Matrix(1, 2);
    m1.set([[1, 2]]);
    expect(m1.to_array()).toStrictEqual([1, 2]);
  });
});
