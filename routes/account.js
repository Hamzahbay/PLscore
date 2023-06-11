const { request, response } = require('express')

const router = require('express').Router()
const passport = require('passport')
const User = require('./../models/User')
const Teams = require('./../models/Teams')
const { saveUser } = require('../method/save')

//LOGIN REGISTER PAGE
router.get('/login', (request, response) => {
    if( typeof request.user == 'undefined' ) {
        response.render('login', { page: 'Masuk' })
    } else{
        response.render('errorPage', { page: 'Anda Telah Masuk Akun', back: '/profile' })
    }
})

router.get('/register', (request, response) => {
    if( typeof request.user == 'undefined' ) {
        Teams.findOne().then(teams => {
            response.render('register', { page: 'Daftar', teams: teams.teams })
        }).catch(error => console.log(error))
    } else{
        response.render('errorPage', { page: 'Anda Telah Masuk Akun', back: '/profile' })
    }
})

//REGISTER POST HANDLE
router.post('/register', (request, response) => {
    const { username, email, favourite, password, password2, user_id } = request.body
    let errors = []

    /*VALIDATION*/
    //REQUIRED CHECK
    if( username == '' || email == '' || favourite =='' || password == '' || password2 == '' ) {
        errors.push({ message: 'Isi Form Untuk Daftar!' })
    }

    //PASWORD CONFIRM
    if( password != password2 ) {
        errors.push({ message: 'Kata Sandi Tidak Cocok' })
    }

    //CHECK PASSWORDS LENGTH
    if( password.length < 6 ) {
        errors.push({ message: 'Kata Sandi Harus Memiliki 6 Karakter atau Lebih' })
    }
    //CHECK USERNAME LENGTH 
    if( username.length < 4 ) {
        errors.push({ message: 'Nama Harus Memiliki 4 Karakter atau Lebih' })
    }

    //VALIDATION PROCESS
    if( errors.length > 0 ) {
        response.render('register', { page: 'Daftar', errors })
    } else{
        User.findOne({ email }).then(email => {
            if( email ) {
                errors.push({ message: 'Email Telah Digunakan' })
                response.render('register', { page: 'Daftar', errors })
            } else{
                User.findOne({ user_id }).then(id => {
                    if( id ) {
                        errors.push({ message: 'Terjadi Kesalahan Value' })
                        response.render('register', { page: 'Daftar', errors })
                    } else{
                        Teams.findOne().then(team => {
                            if( team.teams.findIndex(obj => obj.cleanName == request.body.favourite) == -1 ) {
                                errors.push({ message: 'Tim Tidak Ditemukan' })
                                response.render('register', { page: 'Daftar', errors })
                            } else{
                                User.find().then(users => {
                                    saveUser(request, response, users)
                                })
                            }
                        }).catch(error => console.log(error))
                    }
                }).catch(error => console.log(error))
            }
        }).catch(error => console.log(error))
    }
})

//LOGIN POST HANDLE
router.post('/login', (request, response, next) => {
    if( request.body.email == '' || request.body.password == '' ) {
        request.flash('error_message', 'Isi Untuk Lanjut!')
    }
    passport.authenticate('local', {
        successRedirect: '/home',
        failureRedirect: '/account/login',
        failureFlash: true
    })(request, response, next)
})

//LOGOUT HANDLE
router.get('/logout', (request, response) => {
    request.logOut()
    request.flash('success_message', `Berhasil Keluar Akun`)
    response.redirect('/account/login')
})

module.exports = router