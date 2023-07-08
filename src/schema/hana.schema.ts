
import {object, string, TypeOf} from "zod";
/**
 * @openapi
 * components:
 *  schemas:
 *    HanaInput:
 *      type: object
 *      required: object
 *        - query
 *      properties:
 *        query:
 *          type: string
 *          default: { rows }
 *    C4mAuthReturn:
 *      type: object
 *      properties:
 *        rows:
 *          type: Object
 */

const payload = {
    body: object({
        query: string({
            required_error: "Query é obrigatório."
        }).min(5),
        connOptions: object({})
    })
};

const params = {
    params: object({
        ...payload
    })
};

export const executeHanaQuerySchema = object({
    ...payload,
});

export type HanaExecuteQueryInput = TypeOf<typeof executeHanaQuerySchema>