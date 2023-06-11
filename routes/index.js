const { request, response } = require('express')

const router = require('express').Router()
const User = require('./../models/User')
const Teams = require('./../models/Teams')
const Players = require('./../models/Players')
const Fixtures = require('../models/Fixtures')
const Like = require('./../models/Like')
const Views = require('./../models/Views')
const Comments = require('./../models/Comments')
const News = require('./../models/News')
const FavouPlayers = require('./../models/PlayersFavou')
const { ensureAuthenticated } = require('./../config/auth')
const { postNews } = require('../method/save')
const { all } = require('./news')

//PAGE HANDLE
router.get('/', (request, response) => {
    if( typeof request.user == 'undefined' ) {
        response.render('landingPage', { page: 'Situs Web Liga Inggris' })
    } else{
        response.render('landingPage', { page: 'Situs Web Liga Inggris', user: request.user })
    }
})

router.get('/home', (request, response) => {
    let alpha = ''
    Teams.findOne().then(team => {
        if( typeof request.user == 'undefined' ) {
            response.render('home', { page: 'Beranda' })
        } else{
            team.teams.forEach(x => {
                alpha += x.cleanName + "\\"
            })
            let alphaR = alpha.split('\\')
            alphaR.pop()
            
            if( alphaR.includes(request.user.favourite) == true ) {
                response.render('home', { page: 'Beranda', user: request.user, team: request.user.favourite })
            } else{
                response.render('home', { page: 'Beranda', user: request.user, team: 'Premier League' })
            }
        }
    }).catch(error => console.log(error))
})

router.get('/spec', (request, response) => {
    if( typeof request.user == 'undefined' ) {
        response.render('spec', { page: 'Spesifikasi Pemain' })
    } else{
        response.render('spec', { page: 'Spesifikasi Pemain', user: request.user })
    }
})

router.get('/profile', ensureAuthenticated, (request, response) => {
    News.find().then(news => {
        Like.find().then(like => {
            User.find().then(user => {
                let favo = []
                let newsFavo = []
                
                like.forEach(x => {
                    if( x.user.user_id == request.user.user_id ) {
                        favo.push(x.news.news_value)
                    }
                })
                
                news.forEach(x => {
                    favo.forEach(a => {
                        if( x.value == a ) newsFavo.push(x.thumbnail)
                    })
                })

                response.render('profile', { 
                    page: `Profil ${request.user.username}`, 
                    user: request.user, 
                    userData: user,
                    favo: newsFavo
                })
            }).catch(error => console.log(error))
        }).catch(error => console.log(error))
    }).catch(error => console.log(error))
})

router.get('/users-data.json', (request, response) => {
    User.find().then(user => {
        response.json(user)
    }).catch(error => console.log(error))
})

router.get('/teams-data.json', (request, response) => {
    Teams.findOne().then(team => {
        response.json(team)
    }).catch(error => console.log(error))
})

router.get('/players-data.json', (request, response) => {
    Players.findOne().then(player => {
        response.json(player)
    }).catch(error => console.log(error))
})

router.get('/fixtures-data.json', (request, response) => {
    Fixtures.findOne().then(fix => {
        response.json(fix)
    }).catch(error => console.log(error))
})

router.get('/favouPlayers-data.json', (request, response) => {
    FavouPlayers.find().then(fav => {
        response.json(fav)
    }).catch(error => console.log(error))
})

router.get('/spec/:clubId', ensureAuthenticated, (request, response) => {
    if( typeof request.user == 'undefined' ) {
        response.render('spec-club', { page: 'Spesifikasi Pemain' })
    } else{
        response.render('spec-club', { page: 'Spesifikasi Pemain', user: request.user })
    }
})

router.get('/spec/:clubId/:playerId', ensureAuthenticated, (request, response) => {
    if( typeof request.user == 'undefined' ) {
        response.render('spec-players', { page: 'Spesifikasi Pemain' })
    } else{
        response.render('spec-players', { page: 'Spesifikasi Pemain', user: request.user })
    }
})

router.get('/profile/delete/:id', ensureAuthenticated, (request, response) => {
    User.findByIdAndDelete(request.params.id).then(del => {
        request.flash('success_message', 'Akun Berhasil Dihapus!!')
        response.redirect('/account/login')
    }).catch(error => console.log(error))
})

router.get('/profile/update/:id', ensureAuthenticated, (request, response) => {
    if( request.user._id != request.params.id ) return response.redirect('/error')
    response.render('update-user', { page: 'Perbarui Akun', user: request.user })
})

router.post('/profile', (request, response) => {
    if( request.body.role ) {
        let role = ['admin', 'writer', 'user']
        if( role.indexOf(request.body.role) == -1 ) return response.redirect('/error')
        User.findOneAndUpdate({ _id: request.body._id }, request.body, { new: true }, (error, data) => {
            console.log(data)
            if( error ) throw error
            response.redirect('/profile')
        })
    }
    if( request.body.delete_id ) {
        User.findOneAndDelete({ _id: request.body.delete_id }).then(del => {
            console.log(del, 'deleted')
        }).catch(error => console.log(error))
    }
})

router.post('/spec/:clubId', ensureAuthenticated, (request, response) => {
    if( request.body.fav == 'on' ) {
        new FavouPlayers({
            player_id: request.body.player_id,
            user_id: request.user.user_id
        }).save().then(saved => console.log(saved)).catch(error => console.log(error))
    }
    if( request.body.fav == 'off' ) {
        FavouPlayers.findOneAndDelete({ player_id: request.body.player_id, user_id: request.user.user_id }).then(del => console.log(del)).catch(error => console.log(error))
    }
})

router.post('/profile/update/:id', ensureAuthenticated, (request, response) => {
    if( request.user._id != request.params.id ) return response.redirect('/error')
    const { username, favourite, password, password2 } = request.body
    let errors = []

    /*VALIDATION*/
    //REQUIRED CHECK
    if( username == '' || favourite =='' || password == '' || password2 == '' ) {
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
        response.render('update-user', { page: 'Daftar', errors, user: request.user })
    } else {
        Teams.findOne().then(team => {
            if( team.teams.findIndex(obj => obj.cleanName == request.body.favourite) == -1 ) {
                errors.push({ message: 'Tim Tidak Ditemukan' })
                response.render('register', { page: 'Daftar', errors, user: request.user })
            } else{
                User.findOneAndUpdate({ _id: request.params.id }, request.body, { new: true }, (error, data) => {
                    console.log(data)
                    if( error ) throw error
                    response.redirect('/profile')
                })
            }
        }).catch(error => console.log(error))
    }
})

module.exports = router