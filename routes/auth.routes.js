const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcrypt')
const Authentication = require('../middlewares/authentication')


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

router.post('/set-password', async (req, res) => {
    const { regNo, password } = req.body ?? {}

    if (!password) return res.status(400).json({message: 'Password is required'})

    try {
        const user = await User.findOne({regNo: regNo}).exec()
        if (!user) return res.status(404).json({message: `Your reg number is not found!`})

        const hash = await bcrypt.hash(password, 10)
        const userUpdate = await User.updateOne({regNo: regNo}, {password: hash})
        res.status(200).json({})
    } catch (error) {
        res.status(500).json({})
    }
})

router.post('/login', async (req, res) => {
    const { regNo, password } = req.body ?? {}

    
})


module.exports = router