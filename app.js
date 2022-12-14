const express = require('express')
const { Server } = require('socket.io')
const cors = require('cors')
const bodyParser = require('body-parser')
const authRoutes = require('./routes/auth.routes')
const contestantRoutes = require('./routes/contestants.routes')
const positionsRoutes = require('./routes/positions.routes')

const app = express()

app.use(cors({
    origin: '*'
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static(`${__dirname}/public`)); //serving static files

app.use('/api/auth/', authRoutes)
app.use('/api/positions/', positionsRoutes)

app.use('/test', (req, res) => {
    res.status(200).json({status: 'success', message: 'Server is running properly.'})
})


app.use((err, req, res, next) => {
    res.status(err?.statusCode ?? 500).json({
        status: err?.status ?? 'error',
        error: err,
        message: err?.message ?? 'Something broke!',
        stack: process.env.NODE_ENV === 'production' ? undefined : err?.stack
    })
})

module.exports = app