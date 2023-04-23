
import { log } from 'console';
import { deleteUserById, getUser, getUserById } from '../db/user'
import express, { Request, Response } from 'express'

export const getAllUser = async (req: Request, res: Response) => {
    try {
        const users = await getUser();
        return res.status(200).json(users)
    } catch (error) {
        log(error)
        res.sendStatus(400)
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { username } = req.body

        if (!username) return res.sendStatus(400)
        const user = await getUserById(id)
        if (!user) return res.sendStatus(400)

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
        const { id } = req.params
        if (!id) return res.sendStatus(400)

        //! call metod deleteUserById( id) from model
        const deleteuser = await deleteUserById(id)
        return res.status(200).json({data:deleteuser,message:"deleted!"}).end()

    } catch (error) {
        log(error)
        res.sendStatus(400)
    }
}