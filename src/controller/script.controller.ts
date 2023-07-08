import { Request, Response } from "express";
import { CreateScriptInput, UpdateScriptInput, GetScriptInput, DeleteScriptInput, ExecuteScriptInput } from "../schema/script.schema";
import { executeScript, createScript, deleteScript, findAndUpdateScript, findScript, findAllScript } from "../service/script.service";

export async function executeScriptHandler(req: Request<ExecuteScriptInput["params"]>, res: Response) {
    const scriptId = req.params.scriptId;
    const script = await findScript({ scriptId });

    if (!script)
        return res.sendStatus(404)

    const scriptExecute = await executeScript(script);

    if (!scriptExecute)
        return res.sendStatus(404);

    return res.send(scriptExecute);
}

export async function createScriptHandler(req: Request<{}, {}, CreateScriptInput["body"]>, res: Response) {

    const user_Id = res.locals.user._doc._id;

    if (!user_Id) {
        return res.status(403).send("Necessário um usuário para criar um script");
    }

    const body = req.body;
    const script = await createScript({ ...body, user: user_Id });

    if(!script){
        return res.sendStatus(500);
    }

    return res.send(script);
}

export async function updateScriptHandler(req: Request<UpdateScriptInput["params"]>, res: Response) {
    const user_Id = res.locals.user._doc._id;

    if (!user_Id) {
        return res.status(403).send("Necessário um usuário para criar um script");
    }

    const scriptId = req.params.scriptId;
    const update = req.body;
    const script = await findScript({ scriptId })

    if (!script) {
        return res.sendStatus(404);
    }

    const updatedScript = await findAndUpdateScript({ scriptId }, update, { new: true });

    return res.send(updatedScript);

}

export async function findScriptHandler(req: Request<GetScriptInput["params"]>, res: Response) {
    const scriptId = req.params.scriptId;
    const script = await findScript({ scriptId });

    if (!script) {
        return res.sendStatus(404);
    }

    return res.send(script);
}

export async function findAllScriptHandler(req: Request, res: Response) {

    const script = await findAllScript({});

    if (!script) {
        return res.sendStatus(404);
    }

    return res.send(script);
}

export async function deleteScriptHandler(req: Request<DeleteScriptInput["params"]>, res: Response) {
    const user_Id = res.locals.user._doc._id;

    if (!user_Id) {
        return res.status(403).send("Necessário um usuário para criar um script");
    }

    const scriptId = req.params.scriptId;
    const script = await findScript({ scriptId })

    if (!script) {
        return res.sendStatus(404);
    }

    await deleteScript({ scriptId });

    return res.sendStatus(200);
}
