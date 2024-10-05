const parseArgs = () => {
  const args = process.argv.slice(2);
  const len = args.length;
  let result = [];

  for (let i = 0; i < len; i += 2) {
    const key = args[i].replace(/-/g, '');
    const value = args[i + 1];
    result.push(`${key} is ${value}`)
  }

  console.log(result.join(', '));
};

parseArgs();