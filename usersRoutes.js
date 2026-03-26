import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router()

import User from './models/User.js'

const JWT_SECRET = process.env.JWT_SECRET
const expiration = '24h'

router.post('/register', async (req, res) => {
    try{
        const saltRounds = 10

        // hash password first 
        const hashpassword = await bcrypt.hash(req.body.password, saltRounds)

        const user = User.create({
            ...req.body,
            password: hashpassword
        })

        const payload = {
            username: user.username,
            email: user.email,
            _id: user._id
        }

        const token = jwt.sign({data: payload}, JWT_SECRET, { expiresIn: expiration})

        res.status(201).json({token, user})
    } catch(err){
        console.log(err.message)
        res.status(400).json({ message: err.message })
    }
})

router.post('/login', async (req, res) =>{
    try{
        // find user 
        const user = await User.findOne({ email: req.body.email})

        // check if the user exists
        if(!user){
            return res.status(400).json({message: 'Incorrect email or password'})
        }

        // check the password 
        const isCorrectPassword = await bcrypt.compare(req.body.password, user.password)

        if(!isCorrectPassword){
            return res.status(400).json({ message: 'Incorrect email or password'})
        }

        // create a token
        const payload = {
            username: user.username,
            email: user.email,
            _id: user._id
        }

        const token = jwt.sign({ data: payload}, JWT_SECRET, {expiresIn: expiration})

        res.status(200).json({token, user})
    } catch(err){
        console.log(err.message)
        res.status(400).json({message: err.message})
    }
})


export default router