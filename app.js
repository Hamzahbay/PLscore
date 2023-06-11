const app = require('express')()
const layouts = require('express-ejs-layouts')
const bp = require('body-parser')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')
const { request, response } = require('express')
const port = process.env.PORT || 2002

//DB CONNECTION
require('./config/connection')

//PASSPORT CONFIG
require('./config/passport')(passport)

//EJS ENGINE
app.use(layouts)
app.set('view engine', 'ejs')

//BODY PARSER
app.use(bp.urlencoded({ extended: false }))

//SESSION
app.use(session({
    secret: 'balbalan',
    resave: false,
    saveUninitialized: true
}))

//PASSPORT MIDDLEWARE
app.use(passport.initialize())
app.use(passport.session())

//CONNECT FLASH
app.use(flash())

//GLOBAL VARIABLES
app.use((request, response, next) => {
    response.locals.success_message = request.flash('success_message')
    response.locals.error_message = request.flash('error_message')
    response.locals.error = request.flash('error')
    next()
})

//ROUTES
app.use('/', require('./routes/index'))
app.use('/news', require('./routes/news'))
app.use('/fixtures', require('./routes/fixtures'))
app.use('/account', require('./routes/account'))

//PUBLIC
app.use(require('express').static('public'))

//ERROR PAGE HANDLE
app.get('/error', (_request, response) => {
    response.render('errorPage', { page: 'Not Found!', back: '/home' })
})
app.get('*', (_request, response) => {
    response.status(404).redirect('/error')
})

app.listen(port, () => console.log(`http://localhost:${port}`))