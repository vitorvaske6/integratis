
import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import ScriptModel, { ScriptDocument, ScriptInput } from "../models/script.model";
import { dbResponseTimeHistogram } from "../utils/metrics";
import logger from "../utils/logger";

import config from "../../config/default";
import { PythonShell } from 'python-shell';

const { spawn } = require('child_process');
const scriptsPath = config.scripts.path;

export async function executeScript(script: ScriptDocument) {

    const metricsLabels = {
        operation: `executeScript_${script.title}`,
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const childPython = spawn('python', [`${scriptsPath}/${script.path}`, script.requiredParams]);
        
        let dataRes = {
            'data': '',
            'dataErr': '',
            'dataCode': ''
        } 
        
        for await (const chunk of childPython.stdout) {
            dataRes.data += chunk;
        }
        for await (const chunk of childPython.stderr) {
            dataRes.dataErr += chunk;
        }

        const exitCode = await new Promise( (resolve, reject) => {
            childPython.on('close', resolve);
        });
    
        if( exitCode) {
            logger.error( `subprocess error exit ${exitCode}, ${dataRes.dataErr}`);
            return null;
        }
        timer({...metricsLabels, success: "true"});
        return dataRes;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }

}

export async function createScript(input: ScriptInput) {
    const metricsLabels = {
        operation: "createScript",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try{
        const result = await ScriptModel.create(input);
        timer({...metricsLabels, success: "true"});
        return result
    } catch(e: any){
        timer({...metricsLabels, success: "false"}); 
        throw e
    }

}

export async function findScript(query: FilterQuery<ScriptDocument>, options: QueryOptions = { lean: true }) {
    const metricsLabels = {
        operation: "findScript",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ScriptModel.findOne(query);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }
}

export async function findAndUpdateScript(query: FilterQuery<ScriptDocument>, update: UpdateQuery<ScriptDocument>, options: QueryOptions) {
    const metricsLabels = {
        operation: "findAndUpdateScript",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ScriptModel.findOneAndUpdate(query, update, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }
}

export async function findAllScript( options: QueryOptions = { lean: true }) {
    const metricsLabels = {
        operation: "findAllScript",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ScriptModel.find( {}, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }
}

export async function deleteScript(query: FilterQuery<ScriptDocument>) {
    const metricsLabels = {
        operation: "deleteScript",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await ScriptModel.deleteOne(query);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }
}