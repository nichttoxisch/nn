import Matrix from './Matrix';

const sigmoid = (x: number) => {
  return 1 / (1 + Math.exp(-x));
};

const dsigmoid = (y: number) => {
  // return sigmoid(x) * (1 - sigmoid(x));
  return y * (1 - y);
};

export default class Net {
  num_i: number;
  num_h: number;
  num_o: number;

  weights_ih: Matrix;
  weights_ho: Matrix;

  bias_h: Matrix;
  bias_o: Matrix;

  learning_rate = 0.02;

  constructor(num_i_: number, num_h_: number, num_o_: number) {
    this.num_i = num_i_;
    this.num_h = num_h_;
    this.num_o = num_o_;

    this.weights_ih = new Matrix(this.num_h, this.num_i);
    this.weights_ih.randomize();
    this.weights_ho = new Matrix(this.num_o, this.num_h);
    this.weights_ho.randomize();

    this.bias_h = new Matrix(this.num_h, 1);
    this.bias_h.randomize();
    this.bias_o = new Matrix(this.num_o, 1);
    this.bias_o.randomize();
  }

  feed_forward = (data: number[]): number[] => {
    const inputs = Matrix.from_array(data);
    let hidden = Matrix.mult(this.weights_ih, inputs);
    hidden.add(this.bias_h);

    hidden.map(sigmoid); // activation function

    let output = Matrix.mult(this.weights_ho, hidden);
    output.add(this.bias_o);
    output.map(sigmoid);

    return output.to_array();
  };

  train = (data: number[], targets: number[]) => {
    const inputs = Matrix.from_array(data);
    const hidden = Matrix.mult(this.weights_ih, inputs);
    hidden.add(this.bias_h);
    hidden.map(sigmoid); // activation function

    const outputs = Matrix.mult(this.weights_ho, hidden);
    outputs.add(this.bias_o);
    outputs.map(sigmoid);

    const target = Matrix.from_array(targets);

    const errs_o = Matrix.sub(target, outputs);

    const output_g = Matrix.map(outputs, dsigmoid);
    output_g.mult(errs_o);
    output_g.mult(this.learning_rate);

    const hidden_t = Matrix.transpose(hidden);
    const w_ho_d = Matrix.mult(output_g, hidden_t);

    this.weights_ho.add(w_ho_d);
    this.bias_o.add(output_g);

    // TODO: Add more hidden layers
    const w_ho_t = Matrix.transpose(this.weights_ho);
    const errs_h = Matrix.mult(w_ho_t, errs_o);

    const hidden_g = Matrix.map(hidden, dsigmoid);
    hidden_g.mult(errs_h);
    hidden_g.mult(this.learning_rate);

    const inputs_t = Matrix.transpose(inputs);
    const w_ih_d = Matrix.mult(hidden_g, inputs_t);

    this.weights_ih.add(w_ih_d);
    this.bias_h.add(hidden_g);
  };
}
