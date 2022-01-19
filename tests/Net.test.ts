import Net from '../src/Net';

describe('Net should solve the xor probleme', () => {
  const net = new Net(2, 4, 1);
  it('should train on a given set and return approximately the right values', () => {
    const xor_train_data: Array<{
      data: [number, number];
      target: [number];
    }> = [
      {
        data: [0, 0],
        target: [0],
      },
      {
        data: [1, 0],
        target: [1],
      },
      {
        data: [0, 1],
        target: [1],
      },
      {
        data: [1, 1],
        target: [0],
      },
    ];

    for (let i = 0; i < 100000; i++) {
      const test =
        xor_train_data[Math.floor(Math.random() * xor_train_data.length)];
      net.train(test.data, test.target);
    }

    expect(net.feed_forward([1, 0])[0]).toBeGreaterThan(0.5);
    expect(net.feed_forward([0, 1])[0]).toBeGreaterThan(0.5);
    expect(net.feed_forward([0, 0])[0]).toBeLessThan(0.5);
    expect(net.feed_forward([1, 1])[0]).toBeLessThan(0.5);
  });
});
