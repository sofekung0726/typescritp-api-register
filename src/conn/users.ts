import { log } from 'console';
import { getUser, getUserById, deleteUserById} from '../db/user'
import express ,{Request,Response} from 'express'
export const getAlluser =async (req:Request,res:Response) => {
    try {
        const users = await getUser();
        return res.status(200).json(users)
    } catch (error) {
        log(error)
        res.sendStatus(400)
    }
}

export const userid =async (req:Request,res:Response) => {
    try {

        const {id} = req.params
        const user = await getUserById(id)
        if(!user) return res.sendStatus(400)
        return res.status(200).json(user)
        
    } catch (error) {
        log(error)
        res.sendStatus(400)
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        const {username} = req.body
        if(!username) return res.sendStatus(400)
        const user = await getUserById(id)
        if(!user) return res.sendStatus(400)

        user.username = username
        await user.save()

        return res.status(200).json(user).end()
    } catch (error) {
        log(error)
        res.sendStatus(400)
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const {id} = req.params
        if(!id) return res.sendStatus(400)
        const user = await deleteUserById(id)
        if(!user) return res.sendStatus(400)

        
        return res.status(200).json(({message:"delete sucsess!"})).end()

    } catch (error) {
        log(error)
        res.sendStatus(400)
    }
}