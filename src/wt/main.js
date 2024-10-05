import path from 'path';
import { Worker } from 'worker_threads'
import { fileURLToPath } from 'url';
import os from 'os';

const performCalculations = async () => {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const numCores = os.cpus().length;

    const workers = [];
    for (let i = 0; i < numCores; i += 1) {
      const worker = new Worker(`${__dirname}/worker.js`, { workerData: { n: 10 + i } });

      const promiseWorker = new Promise((resolve) => {
        worker.on('message', (data) => {
          resolve({ status: 'resolved', data });
        })

        worker.on('error', () => {
          resolve({ status: 'error', data: null });
        })

        worker.on('exit', () => {
          resolve({ status: 'error', data: null });
        })
      })

      workers.push(promiseWorker);
    }

    const results = await Promise.all(workers);
    console.log('results', results);
  } catch (error) {
    console.error(error);
  }
};

await performCalculations();