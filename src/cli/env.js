const parseEnv = () => {
  const envsWithRSS = [];

  for (let [key, value] of Object.entries(process.env)) {
    if (key.startsWith('RSS_')) {
      envsWithRSS.push(`${key}=${value}`)
    }
  }

  console.log(envsWithRSS.join('; '));
};

parseEnv();