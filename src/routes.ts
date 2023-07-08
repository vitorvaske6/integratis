import { Express, Request, Response } from 'express';

// API
import requireUser from './middleware/requireUser';
import validateResource from './middleware/validateResource';

// Session
import { getUserSessionsHandler, createSessionUserHandler, deleteSessionHandler } from './controller/session.controller';
import { createSessionSchema } from './schema/session.schema';

// User
import { createUserHandler, getCurrentUserHandler } from './controller/user.controller';
import { createUserSchema } from './schema/user.schema';

// Script
import { createScriptHandler, deleteScriptHandler, findScriptHandler, findAllScriptHandler, updateScriptHandler, executeScriptHandler } from './controller/script.controller';
import { createScriptSchema, deleteScriptSchema, findScriptSchema, findAllScriptSchema, updateScriptSchema, executeScriptSchema } from './schema/script.schema';

// C4M
import { getC4mAuthHandler } from './controller/c4m.controller';
import { getC4mAuthSchema } from './schema/c4m.schema';

// Hana
import { executeHanaQueryHandler } from './controller/hana.controller';
import { executeHanaQuerySchema } from './schema/hana.schema';

function routes(app: Express) {
   /**
   /**
   * @openapi
   * /healthcheck:
   *  get:
   *     tags:
   *     - Healthcheck
   *     summary: Checks if app is running.
   *     description: Checks if app is running.
   *     responses:
   *       200:
   *         description: App is running.
   */
    // API Health Check
    app.get('/healthcheck', (req: Request, res: Response) => res.sendStatus(200));

   /**
   /**
   * @openapi
   * '/api/users':
   *  post:
   *     tags:
   *     - User
   *     summary: Register a user
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateUserInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateUserResponse'
   *      409:
   *        description: Conflict
   *      400:
   *        description: Bad request
   * '/api/users/me':
   *  get:
   *     tags:
   *     - User
   *     summary: Return the logged in user.
   *     description: Return the logged in user.
   *     responses:
   *       200:
   *         description: User info.
   */

    // Users
    app.post('/api/users', validateResource(createUserSchema), createUserHandler);
    app.get('/api/users/me', getCurrentUserHandler);


   /**
   * @openapi
   * '/api/sessions':
   *  post:
   *     tags:
   *     - Session
   *     summary: Create a session by logging in.
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateSessionInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateSessionResponse'
   *      404:
   *        description: User not found.
   *  get:
   *     tags:
   *     - Session
   *     summary: Find session of the user logging in.
   *     description: Return sessions of the logged in user.
   *     responses:
   *       200:
   *         description: Session info.
   *       403:
   *         description: User not logged in.
   * 
   *  delete:
   *     tags:
   *     - Session
   *     summary: Anull the session of the user by logging out.
   *     description: Inactive the actual session of the logged in user.
   *     responses:
   *       200:
   *         description: Access and Refresh token as null.
   */
    // Sessions
    app.post('/api/sessions', validateResource(createSessionSchema), createSessionUserHandler);
    app.get('/api/sessions', requireUser, getUserSessionsHandler);
    app.delete('/api/sessions', requireUser, deleteSessionHandler);

   /**
   * @openapi
   * '/api/scripts/execute':
   *  post:
   *     tags:
   *     - Script
   *     summary: Execute a script passing its ID.
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/ExecuteScriptInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/ExecuteScriptResponse'
   *      404:
   *        description: Script not found.
   * '/api/scripts':
   *  post:
   *     tags:
   *     - Script
   *     summary: Create a script.
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/CreateScriptInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/CreateScriptResponse'
   *      403:
   *        description: Token invalid or user doesn't have permissions.
   *      500:
   *        description: Could not connect to the server.
   *  get:
   *     tags:
   *     - Script
   *     summary: Return all scripts.
   *     description: Return a list with all scripts.
   *     responses:
   *      200:
   *        description: Returns all script info.
   *      403:
   *        description: Token invalid or user doesn't have permissions.
   *      500:
   *        description: Could not connect to the server.
   * '/api/scripts/{scriptId}':
   *  get:
   *     tags:
   *     - Script
   *     summary: Return all scripts.
   *     description: Return a list with all scripts.
   *     responses:
   *      200:
   *        description: Returns script info.
   *      403:
   *        description: Token invalid or user doesn't have permissions.
   *      500:
   *        description: Could not connect to the server.
   * 
   *  delete:
   *     tags:
   *     - Script
   *     summary: Delete the script.
   *     description: Inactive the actual session of the logged in user.
   *     responses:
   *      200:
   *        description: Script deleted successefully.
   *      403:
   *        description: Token invalid or user doesn't have permissions.
   *      500:
   *        description: Could not connect to the server.
   */
    // Scripts
    app.post('/api/scripts', [requireUser, validateResource(createScriptSchema)], createScriptHandler);
    app.post('/api/scripts/execute/:scriptId', [requireUser, validateResource(executeScriptSchema)], executeScriptHandler);
    app.put('/api/scripts/:scriptId', [requireUser, validateResource(updateScriptSchema)], updateScriptHandler);
    app.get('/api/scripts/:scriptId', validateResource(findScriptSchema), findScriptHandler);
    app.get('/api/scripts/', validateResource(findAllScriptSchema), findAllScriptHandler);
    app.delete('/api/scripts/:scriptId', [requireUser, validateResource(deleteScriptSchema)], deleteScriptHandler);

   /**
   * @openapi
   * '/api/c4m/auth':
   *  get:
   *     tags:
   *     - Script
   *     summary: Create a token and nonce at C4M API and return them.
   *     requestBody:
   *      required: true
   *      content:
   *        application/json:
   *           schema:
   *              $ref: '#/components/schemas/GetC4mAuthInput'
   *     responses:
   *      200:
   *        description: Success
   *        content:
   *          application/json:
   *            schema:
   *              $ref: '#/components/schemas/C4mAuthReturn'
   *      400:
   *        description: Script not found.
   */
    // C4M
    app.post('/api/c4m/auth', [requireUser, validateResource(getC4mAuthSchema)], getC4mAuthHandler);
    
    // Hana
    app.post('/api/hana/query', [requireUser, validateResource(executeHanaQuerySchema)], executeHanaQueryHandler);
}

export default routes