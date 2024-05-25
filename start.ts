import { exec } from "child_process";

const { START_ENV } = process.env;

// 项目列表
export const siteList = ["main", "react", "vue3"];

export function runCommand(command) {
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

const commands = siteList.map((site) => runCommand(`cd site/${site} && npm run ${START_ENV}`));

Promise.all(commands)
  .then((results) => {
    // console.log("done!-------", results);
  })
  .catch((err) => {
    console.log("failed!------", err);
  });
