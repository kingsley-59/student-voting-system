const { default: mongoose } = require('mongoose');
const AppError = require('../errors');
const Contestants = require('../models/Contestant')
const User = require('../models/User')


exports.getAll = async (req, res, next) => {

    const contestants = await Contestants.find({}).exec()
    res.status(200).json({message: contestants.length === 0 ? 'No contestants yet': 'Request successful.', data: contestants})
}

exports.add = async (req, res, next) => {
    const { userID, positionId } = req.body

    const user = await User.findOne({_id: userID}).exec()
    if (!user) return res.status(404).json({message: "User not found. Please check the id and try again"})
    const newContestant = new Contestants({
        user: user._id,
        position: positionId,
        votes: []
    })
    await newContestant.save()
    res.status(201).json({message: 'Contestant added successfully.', data: newContestant})
}

exports.update = async (req, res, next) => {}

exports.delete = async (req, res, next) => {
    const { id, role } = req?.decoded ?? {}
    const contestantId = req.params.contestantId
    if (role === 'admin' || role === 'superadmin') next(new AppError('Unauthorized', 401))

    const deleted = await Contestants.deleteOne({ _id: positionId }).exec()
    res.status(200).json({data: deleted})
}