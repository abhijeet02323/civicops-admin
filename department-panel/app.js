/* Department Panel - Express server (EJS) */
require('dotenv').config()
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()
const PORT = process.env.PORT || 4000

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(
  session({
    secret: process.env.SESSION_SECRET || 'devsecret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 8 * 60 * 60 * 1000 } // 8 hours
  })
)

// routes
const deptRouter = require('./routes/department')
app.use('/department', deptRouter)

app.get('/', (req, res) => {
  res.redirect('/department/login')
})

app.listen(PORT, () => console.log(`Department panel running on http://localhost:${PORT}`))
