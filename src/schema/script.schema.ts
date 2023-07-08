
import {object, string, TypeOf} from "zod";
/**
 * @openapi
 * components:
 *  schemas:
 *    CreateScriptInput:
 *      type: object
 *      required: object
 *        - title
 *        - description
 *        - path
 *        - cron
 *        - requiredParams
 *      properties:
 *        title:
 *          type: string
 *          default: pythonScript
 *        description:
 *          type: string
 *          default: "Python script that does things"
 *        path:
 *          type: string
 *          default: "pythonScript/main.py"
 *        cron:
 *          type: string
 *          default: "0 15 10 ? * *"
 *        requiredParams:
 *          type: string
 *          default: 'args:{"companyId": 0, "companyName": "Company LTDA"}'
 *    ExecuteScriptInput:
 *      type: object
 *      required: object
 *        - scriptId
 *      properties:
 *        scriptId:
 *          type: string
 *          default: scriptId
 *    CreateScriptResponse:
 *      type: object
 *      properties:
 *        title:
 *          type: string
 *        description:
 *          type: string
 *        path:
 *          type: string
 *        cron:
 *          type: string
 *        requiredParams:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

const payload = {
    body: object({
        title: string({
            required_error: "Titulo é obrigatório."
        }),
        description: string({
            required_error: "Descrição é obrigatório."
        }),
        path: string({
            required_error: "Path é obrigatório."
        }).min(4, "Path deve ter ao menos 4 caracteres."),
        cron: string({ 
            required_error: "Expressão Cron é obrigatório."
        }).min(9, "Expressão cron deve ter ao menos 9 caracteres."),
        requiredParams: string({ 
            required_error: "Paramêtros obrigatórios é obrigatório."
        }),
    })
};

const params = {
    params: object({
        scriptId: string({
            required_error: "Id do script é obrigatório."
        })
    })
};

export const createScriptSchema = object({
    ...payload
});

export const executeScriptSchema = object({
    ...params
});

export const updateScriptSchema = object({
    ...payload,
    ...params
});

export const findScriptSchema = object({
    ...params
});

export const findAllScriptSchema = object({});

export const deleteScriptSchema = object({
    ...params
});

export type CreateScriptInput = TypeOf<typeof createScriptSchema>
export type ExecuteScriptInput = TypeOf<typeof executeScriptSchema>
export type UpdateScriptInput = TypeOf<typeof updateScriptSchema>
export type GetScriptInput    = TypeOf<typeof findScriptSchema>
export type GetAllScriptInput = TypeOf<typeof findAllScriptSchema>
export type DeleteScriptInput = TypeOf<typeof deleteScriptSchema>