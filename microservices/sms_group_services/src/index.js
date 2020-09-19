const express = require('express');
const http = require('http');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

// create express app
const app = express();

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  let workers = process.env.WORKER || numCPUs;

  // Fork workers.
  for (let i = 0; i < workers; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.warn(`worker ${worker.process.pid} died. code : ${code} signal: ${signal}`);
  });

} else {

  console.log('env', JSON.stringify(process.env));

  // starting app on http port
  let port = process.env.API_PORT || 3000;
  http.createServer(app).listen(port);

  console.log(`Worker ${process.pid} started`);
  console.log(`sms-group app started listening on HTTP port ${port}`);
}