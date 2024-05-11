import { exec } from 'child_process';

// 项目列表
const siteList = ['main', 'react', 'vue3'];

const commandList = siteList.map((site) =>
  runCommand(`cd site/${site} && npm run dev`)
);

function runCommand(command) {
  return new Promise((resolve, reject) => {
    const childProcess = exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(error);
      } else {
        resolve({ stdout, stderr });
      }
    });

    childProcess.stdout?.pipe(process.stdout);
    childProcess.stderr?.pipe(process.stderr);
  });
}

Promise.all(commandList)
  .then((results) => {
    console.log('done!-------', results);
  })
  .catch((err) => {
    console.log('failed!------', err);
  });
