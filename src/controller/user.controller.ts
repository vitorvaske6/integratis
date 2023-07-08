import { Request, Response } from "express";
import { omit } from "lodash";
import { CreateUserInput } from '../schema/user.schema';
import { createUser } from "../service/user.service";
import logger from "../utils/logger";
import { ObjectId } from "mongodb";

export async function createUserHandler(
    req: Request<{}, {}, CreateUserInput["body"]>,
    res: Response
) {
    try {
        const result = await createUser(req.body)
        return res.send(result);
    } catch (e: any) {
        return res.status(409).send(e.message)
    }
}

export async function getCurrentUserHandler(
    req: Request,
    res: Response
) {
    if(!res.locals.user) {
        return res.status(404).send("User not found")
    }  

    let userInfo

    if(res.locals.user.hasOwnProperty('_doc')) {
        userInfo = res.locals.user._doc
    }
        
    if (!res.locals.user.hasOwnProperty('_doc')) {
        userInfo = res.locals.user
    }

    return res.send({ userInfo });

}