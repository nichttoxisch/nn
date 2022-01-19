import Net from './Net';

const main = () => {
  const brain = new Net(2, 4, 1);

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
    brain.train(test.data, test.target);
  }

  console.log(brain.feed_forward([1, 0]));
  console.log(brain.feed_forward([0, 1]));
  console.log(brain.feed_forward([1, 1]));
  console.log(brain.feed_forward([0, 0]));
};

main();
