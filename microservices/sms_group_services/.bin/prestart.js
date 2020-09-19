#!/usr/bin/env node

function executeCommand(cmd) {
  return new Promise((resolve, reject) => {
    try {
      console.log(`> ${cmd}\n`);
      const { exec } = require('child_process');
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        } 
        if (stderr) {
          reject(stderr);
          return;
        }
        resolve(stdout);
        return;
      });
    } catch (error) {
      reject(error);
      return;
    }
  });
}

(async () => {
  const dbCreateResult = await executeCommand(`npx sequelize-cli db:create`);
  console.log(dbCreateResult);
  const dbMigrateResult = await executeCommand(`npx sequelize-cli db:migrate`)
  console.log(dbMigrateResult);
  const dbSeedResult = await executeCommand(`npx sequelize-cli db:seed:all`)
  console.log(dbSeedResult);
})();