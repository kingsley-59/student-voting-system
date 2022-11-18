const { default: mongoose } = require('mongoose');
const AppError = require('../errors');
const Positions = require('../models/Positions');



exports.getAll = async (req, res, next) => {
    const { id, role } = req?.decoded ?? {}

    const positions = await Positions.find({}).exec()
    res.status(200).json({ message: 'Success', data: positions })
}

exports.get = async (req, res, next) => {
    const { id, role } = req?.decoded ?? {}

    const positions = await Positions.find({}).exec()
    res.status(200).json({ message: 'Success', data: positions })
}

exports.add = async (req, res, next) => {
    const { role } = req?.decoded ?? {}
    const { name, levels } = req.body
    // if (role !== 'admin' || role !== 'superadmin') return next(new AppError('Unauthorized', 401))
    if (!Array.isArray(levels)) next(new AppError('levels must be an array', 400))

    const newPosition = new Positions({
        _id: new mongoose.Types.ObjectId(),
        name, levels
    })
    await newPosition.save()

    res.status(200).json({ data: newPosition })
}

exports.update = async (req, res, next) => {

}

exports.delete = async (req, res, next) => {
    const { id, role } = req?.decoded ?? {}
    const positionId = req.params.positionId
    if (role === 'admin' || role === 'superadmin') next(new AppError('Unauthorized', 401))

    const deleted = await Positions.deleteOne({ _id: positionId }).exec()
    if (deleted.acknowledged && deleted.deletedCount === 0) return res.status(200).json({message: 'Already deleted!'})
    res.status(200).json({data: deleted})
}