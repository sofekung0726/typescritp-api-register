import { log } from 'console';
import { createUser } from '../db/user';
import { getUserByEmail } from '../db/user';
import express, { Request, Response, NextFunction } from 'express';
import { authentication } from '../helpers';
import { random } from '../helpers';

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password, username } = req.body
        //? ตรวจสอบข้อมูลว่ามีมั้ย
        if (!email || !password || !username) res.sendStatus(400)

        //? ตรวจสอบว่ามีการใช้งาน email แล้วรึยัง
        const existingUser = await getUserByEmail(email)
        if(existingUser){
            return res.sendStatus(400)
        }
        const salt = random();
        const user = await createUser({
            email:email,
            username:username,
            authentication:{
                salt:salt,
                password:authentication(salt,password),
            }
        })
        return res.status(200).json(user).end()
    } catch (error) {
        log(error)
        res.sendStatus(400)
    }
}

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body
        // log(email, password )
        //? ตรวจสอบข้อมูลว่ามีมั้ย
        if (!email || !password  ) res.sendStatus(400)

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password')

        // ? ตรวจสอบว่ามี user หรือไม่?
        if(!user) res.sendStatus(400)

        if(!user?.authentication?.salt  || !user?.authentication?.password) {
            return res.sendStatus(400)
        }

        const expectedHash = authentication(user?.authentication.salt ,password)

        if(user.authentication.password !== expectedHash) res.sendStatus(403)


        const salt = random()
        user.authentication.sessionToken = authentication(salt,user._id.toString())
        await user.save()

        res.cookie("TEST_AUTH",user.authentication.sessionToken,{domain:'localhost',path:'/'})
        return res.status(200).json(user)

    } catch (error) {
        log(error)
        res.sendStatus(400)
    }
}

export const logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie("TEST_AUTH",{domain:'localhost',path:'/'})
        return res.status(200).json({message:"logout sucsess!"})

    } catch (error) {
        log(error)
        res.sendStatus(400)
    }
}

