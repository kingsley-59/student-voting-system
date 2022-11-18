const { default: mongoose } = require('mongoose');
const AppError = require('../errors');
const Contestants = require('../models/Contestant')
const User = require('../models/User')


exports.castVote = (req, res, next) => {
    const { id, role } = req?.decoded ?? {}

    const user = User.findOne({_id: id}).exec()
    if (!user) return res.status(400).json({message: 'User does not exist.'})

    // cast vote by increasing vote count for contestants
}