const express = require('express')
const router = express.Router()
const asyncHandler = require('express-async-handler')
const authenticate = require('../middlewares/authenticate')
const ContestantController = require('../controllers/ContestantController')


router.get('/', asyncHandler(ContestantController.getAll))

router.post('/', asyncHandler(ContestantController.add))

router.delete('/:contestantId', authenticate, asyncHandler(ContestantController.delete))


module.exports = router