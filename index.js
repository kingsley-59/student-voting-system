const mongoose = require('mongoose')
require('dotenv').config()

const app = require('./app')
const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(conn => {
    console.log('Database connection success')
}).catch(error => {
    console.log('Somthing went wrong. Database not connected!')
    console.log(error?.message ?? error)
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`${process.env.APP_NAME} API listening on port ${PORT} in ${process.env.NODE_ENV} mode`))