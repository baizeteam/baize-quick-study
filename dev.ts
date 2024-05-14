import {runCommand,siteList} from "./command";

const devs = siteList.map((site) => runCommand(`cd site/${site} && npm run dev`));
Promise.all(devs)
    .then((results) => {
        console.log("done!-------", results);
    })
    .catch((err) => {
        console.log("failed!------", err);
    });
