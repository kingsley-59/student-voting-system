const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const authenticate = require('../middlewares/authenticate')
const PositionsController = require('../controllers/PositionsController')


router.get('/', asyncHandler(PositionsController.getAll))

router.get('/:positionId', asyncHandler(PositionsController.get))

router.post('/', asyncHandler(PositionsController.add))

router.delete('/:positionId', asyncHandler(PositionsController.delete))


module.exports = router