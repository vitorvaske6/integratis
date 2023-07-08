import { DocumentDefinition, FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
import { omit } from "lodash";
import UserModel, { UserDocument, UserInput } from "../models/user.model";
import qs from "qs"
import config from "../../config/default"
import axios from "axios"
import log from '../utils/logger';
import { dbResponseTimeHistogram } from "../utils/metrics";


export async function createUser(input: DocumentDefinition<UserInput>) {
    const metricsLabels = {
        operation: "createUser",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const user = await UserModel.create(input);
        timer({...metricsLabels, success: "true"});
        return omit(user.toJSON(), "password");
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }
}

export async function validatePassword({login, password}: {login: string; password: string}) {
    const metricsLabels = {
        operation: "validatePassword",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const userSearch = await UserModel.findOne({login});

        if(!userSearch){
            return null;
        }

        const isValid = await userSearch.comparePassword(password);
        if(!isValid) {
            return null;
        }

        timer({...metricsLabels, success: "true"});
        return userSearch;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    }

}

export async function findUser(query: FilterQuery<UserDocument>){
    const metricsLabels = {
        operation: "findUser",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await UserModel.findOne(query).lean();
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
}

export async function findAndUpdateUser(query: FilterQuery<UserDocument>, update: UpdateQuery<UserDocument> , options: QueryOptions = {}){
    const metricsLabels = {
        operation: "findAndUpdateUser",
    }
    const timer = dbResponseTimeHistogram.startTimer();
    try {
        const result = await UserModel.findOneAndUpdate(query, update, options);
        timer({...metricsLabels, success: "true"});
        return result;
    } catch(e: any){
        timer({...metricsLabels, success: "false"});
        throw e
    } 
    
}