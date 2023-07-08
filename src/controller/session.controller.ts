import { CookieOptions, Request, Response } from "express";
import config from "../../config/default";
import axios from "axios";
import jwt from "jsonwebtoken";
import {
    createSession,
    findSessions,
    reIssueAccessToken,
    updateSession
} from "../service/session.service";
import { findAndUpdateUser, validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";

export const accessTokenCookieOptions: CookieOptions = {
    maxAge: 900000, // 15 mins
    httpOnly: true,
    domain: "localhost",
    path: "/",
    sameSite: "lax",
    secure: false,
}

const refreshTokenCookieOptions: CookieOptions = {
    ...accessTokenCookieOptions,
    maxAge: 3.154e10, // 1 year
}


export async function createSessionUserHandler(req: Request, res: Response) {

    const _user = await validatePassword(req.body)
    
    if (!_user) {
        return res.status(401).send("Invalid email or password");
    }

    const session = await createSession(_user._id, req.get("userAgent") || "");

    const accessToken = signJwt(
        { ..._user, session: session._id },
        { expiresIn: config.accessTokenTimeToExpire } // 15 minutos
    );
    const refreshToken = signJwt(
        { ..._user, session: session._id },
        { expiresIn: config.refreshTokenTimeToExpire } // 1 ano
    );

    res.cookie("accessToken", accessToken, accessTokenCookieOptions);
    res.cookie("refreshToken", refreshToken, refreshTokenCookieOptions);

    return res.send({ accessToken, refreshToken });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
    const user_Id = res.locals.user._doc._id
    const sessions = await findSessions({ user: user_Id, valid: true })

    return res.send(sessions); 
}

export async function deleteSessionHandler(req: Request, res: Response) {
    const sessionId = res.locals.user.session;

    await updateSession({ _id: sessionId }, { valid: false });

    res.cookie("accessToken", null, accessTokenCookieOptions);
    res.cookie("refreshToken", null, refreshTokenCookieOptions);

    return res.sendStatus(200);
}
