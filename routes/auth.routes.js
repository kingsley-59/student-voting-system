const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const authenticate = require('../middlewares/authenticate')


router.post('/confirm', async (req, res) => {
    const {regNo} = req.body ?? {}

    if (!regNo) return res.status(400).json({message: 'Reg number is required!'})

    try {
        const user = await User.findOne({regNo}).exec()
        if (!user) return res.status(404).json({message: `Your reg number is not found!`})

        res.status(200).json({data: user})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.post('/admin/add-user', authenticate, (req, res, next) => {
    const { id, role } = req.decoded

    try {
        res.status(200).json({})
    } catch (error) {
        res.status(500).json({error})
    }
})

router.post('/set-password', async (req, res) => {
    const { regNo, password } = req.body ?? {}

    if (!password) return res.status(400).json({message: 'Password is required'})

    try {
        const user = await User.findOne({regNo: regNo}).exec()
        if (!user) return res.status(404).json({message: `Your reg number is not found!`})

        const hash = await bcrypt.hash(password, 10)
        await User.updateOne({regNo: regNo}, {password: hash})
        res.status(200).json({message: 'Password set successfully.'})
    } catch (error) {
        res.status(500).json({message: 'Something went wrong!'})
    }
})

router.post('/login', async (req, res) => {
    const { regNo, password } = req.body ?? {}

    try {
        const user = User.findOne({regNo}).exec()
        if (!user) return res.status(200).json({message: "User not found. Please check the reg number and try again."})
        const passHash = user.password
        const passwordIsValid = await bcrypt.compare(password, passHash)
        if (!passwordIsValid) return res.status(400).json({message: "Incorrect password"})

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.cookie('jwt', token, {
            expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000),
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' && true
        })

        user.password = undefined

        res.status(200).json({message: 'Login successful!', token, data: user})
    } catch (error) {
        res.status(500).json({message: 'Login failed. Something went wrong!'})
    }
})


module.exports = router