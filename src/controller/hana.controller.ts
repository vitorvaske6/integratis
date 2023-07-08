import { Request, Response } from "express";
import { HanaExecuteQueryInput } from "../schema/hana.schema";
import executeHanaQuery from "../service/hana.service";

export async function executeHanaQueryHandler(req: Request<HanaExecuteQueryInput["body"]>, res: Response) {
    let hanaObj = req.body;

    let hanaRes = await executeHanaQuery(hanaObj.query, hanaObj.connOptions);

    if (!hanaRes)
        return res.status(400).send(hanaRes);

    return res.send(hanaRes);
}