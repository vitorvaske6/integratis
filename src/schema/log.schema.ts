
import {object, number, string, TypeOf} from "zod";
/**
 * @openapi
 * components:
 *   schemas:
 *     Log:
 *       type: object
 *       required:
 *        - title
 *        - description
 *        - price
 *        - image
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         image:
 *           type: string
 */
const payload = {
    body: object({
        index: string({
            required_error: "Index é obrigatório."
        }),
        message: string({
            required_error: "Mensagem é obrigatório."
        }),
        code: number({ 
            required_error: "Código é obrigatório."
        }),
        rows: string({
            required_error: "Linhas é obrigatório."
        }),
        script: string({
            required_error: "Script é obrigatório."
        }),
        company: string({
            required_error: "Empresa é obrigatório."
        }),
        runnedAt: string({
            required_error: "Data de Execução é obrigatório."
        }),
    })
};

const params = {
    params: object({
        logId: string({
            required_error: "Id do log é obrigatório."
        })
    })
};

export const createLogSchema = object({
    ...payload
});

export const updateLogSchema = object({
    ...payload,
    ...params
});

export const findLogSchema = object({
    ...params
});

export const findAllLogSchema = object({});

export const deleteLogSchema = object({
    ...params
});

export type CreateLogInput = TypeOf<typeof createLogSchema>
export type UpdateLogInput = TypeOf<typeof updateLogSchema>
export type GetLogInput    = TypeOf<typeof findLogSchema>
export type GetAllLogInput = TypeOf<typeof findAllLogSchema>
export type DeleteLogInput = TypeOf<typeof deleteLogSchema>