import { log } from 'console'
import { getUserBysessionToken } from '../db/user'
import express from 'express'
import { get, merge } from 'lodash'


export const inAuthentication = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const sessionToken = req.cookies['TEST_AUTH']
        if (!sessionToken) return res.sendStatus(403)
        const existingUser = await getUserBysessionToken(sessionToken)
        if (!existingUser) return res.sendStatus(403)

        merge(req, { identify: existingUser })
        log('middel')
        return next()

    } catch (error) {
        log(error);
        res.sendStatus(400)
    }
}
export const isAuthentication = async (req:express.Request,res:express.Response,next:express.NextFunction) => {
    try {
        const sessionToken = req.cookies['TEST_AUTH']
        if(!sessionToken) return res.sendStatus(403)
        const existingUser = await getUserBysessionToken(sessionToken)
        if(!existingUser) return  res.sendStatus(403)

        merge(req,{identify:existingUser})

        return next()

    } catch (error) {
        log(error)
        res.sendStatus(400)
    }
}


