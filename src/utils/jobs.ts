import log from "./logger";

//import { executeAllCronScript, findAllScript } from "../../src/service/script.service";
import { executeScript, findAllScript } from "../../src/service/script.service";
import CronJob from "node-cron";
import { ScriptDocument } from "../models/script.model";

let count = 0
function restartJobsServer() {
    startJobsServer();
}

async function startJobsServer() {
    log.info("Scheduled jobs were initiated.");

    const scripts = await findAllScript({});

    // CronJob.schedule("* * * * *", async () => {
    //     count ++
    scripts.forEach(script => {
        log.info(`The scheduled job ${script.title} was updated.`); 
        CronJob.schedule(script.cron, async () => {
            log.info(`The scheduled job ${script.title} were executed.`);
            const scriptExecute = await executeScript(script);
            console.log(scriptExecute)
        });
    });
    //});
     
}

async function createJobs(script: ScriptDocument) {
    log.info(`The scheduled job ${script.title} was updated.`); 
    CronJob.schedule(script.cron, async () => {
        log.info(`The scheduled job ${script.title} were executed.`);
        const scriptExecute = await executeScript(script);
        console.log(scriptExecute)
    });
}

export default startJobsServer; 