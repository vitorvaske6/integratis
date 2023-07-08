import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";
import LogModel, { LogDocument, LogInput } from "../models/log.model";
import { dbResponseTimeHistogram } from "../utils/metrics";


export async function createLog(input: LogInput) {
    const metricsLabels = {
        operation: "createLog",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try{
        const result = await LogModel.create(input);
        timer({...metricsLabels, success: "true"});
        return result
    } catch(e: any){
        timer({...metricsLabels, success: "false"}); 
        throw e
    }

}

export async function findLog(query: FilterQuery<LogDocument>, options: QueryOptions = { lean: true }) {
    const metricsLabels = {
        operation: "findLog",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await LogModel.findOne(query, {}, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }

}

export async function findAndUpdateLog(query: FilterQuery<LogDocument>, update: UpdateQuery<LogDocument>, options: QueryOptions) {
    const metricsLabels = {
        operation: "findAndUpdateLog",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await LogModel.findOneAndUpdate(query, update, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }
}

export async function findAllLog( options: QueryOptions = { lean: true }) {
    const metricsLabels = {
        operation: "findAllLog",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await LogModel.find( {}, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }
}

export async function deleteLog(query: FilterQuery<LogDocument>) {
    const metricsLabels = {
        operation: "deleteLog",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await LogModel.deleteOne(query);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }
}