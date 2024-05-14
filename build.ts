import {runCommand,siteList} from "./command";

const builds = siteList.map((site) => runCommand(`cd site/${site} && npm run build`));
Promise.all(builds)
    .then((results) => {
        console.log("done!-------", results);
    })
    .catch((err) => {
        console.log("failed!------", err);
    });
