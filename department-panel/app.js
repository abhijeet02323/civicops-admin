/* Department Panel - Express server (EJS) */
require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 4000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))

// routes
const deptRouter = require('./routes/department')
app.use('/department', deptRouter)

app.get('/', (req, res) => {
  res.redirect('/department/dashboard')
})

app.listen(PORT, () => console.log(`Department panel running on http://localhost:${PORT}`))
