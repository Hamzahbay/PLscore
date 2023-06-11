const { request, response } = require('express')

const router = require('express').Router()
const User = require('./../models/User')
const Teams = require('./../models/Teams')
const Players = require('./../models/Players')
const News = require('./../models/News')
const { ensureAuthenticated } = require('./../config/auth')
const Fixtures = require('../models/Fixtures')
const FavouMatch = require('./../models/MatchFavou')
const { db } = require('./../models/User')

router.get('/', (request, response) => {
    if( typeof request.user == 'undefined' ) {
        response.render('fixtures', { page: 'Pertandingan' })
    } else{
        response.render('fixtures', { page: 'Pertandingan', user: request.user })
    }
})

router.get('/complete', (request, response) => {
    if( typeof request.user == 'undefined' ) {
        response.render('fixtures-complete', { page: 'Pertandingan' })
    } else{
        response.render('fixtures-complete', { page: 'Pertandingan', user: request.user })
    }
})

router.get('/data.json', (request, response) => {
    Fixtures.findOne().then(fix => {
        response.jsonp(fix)
    }).catch(error => console.log(error))
})

router.get('/favouMatch-data.json', (request, response) => {
    FavouMatch.find().then(fav => {
        response.jsonp(fav)
    }).catch(error => console.log(error))
})

router.get('/:id', ensureAuthenticated, (request, response) => {
    if( typeof request.user == 'undefined' ) {
        response.render('fixtures-schedule', { page: 'Pertandingan', user: 'lol' })
    } else{
        response.render('fixtures-schedule', { page: 'Pertandingan', user: request.user })
    }
})

router.post('/:id', ensureAuthenticated, (request, response) => {
    if( request.body.fav == 'on' ) {
        new FavouMatch({
            match_id: request.body.match_id,
            user_id: request.user.user_id
        }).save().then(saved => console.log(saved)).catch(error => console.log(error))
    }
    if( request.body.fav == 'off' ) {
        FavouMatch.findOneAndDelete({ match_id: request.body.match_id, user_id: request.user.user_id }).then(del => console.log(del)).catch(error => console.log(error))
    }
})

// router.post('/schedule', (request, response) => {
//     if( typeof request.user == 'undefined' ) return response.redirect('/error')
//     if( request.user.role == 'admin' || request.user.role == 'staff' ) {
//         if( !request.body.homeTeam || !request.body.awayTeam || !request.body.stadium || !request.body.dateMatch || !request.body.timeMatch ) {
//             request.flash('error_message', 'Gagal Terkirim!!!')
//             request.flash('error', 'Terjadi Kesalahan Saat Menyimpan Data!!')
//             return response.redirect('/fixtures/schedule')
//         }
//         if( request.body.homeTeam == request.body.awayTeam ) {
//             request.flash('error_message', 'Gagal Terkirim!!!')
//             request.flash('error', 'Tim Kandang dan Tandang Tidak Boleh Sama!!!')
//             return response.redirect('/fixtures/schedule')
//         }
//         Fixtures.findOne({
//             "home.name": request.body.homeTeam,
//             "away.name": request.body.awayTeam,
//             matchDate: request.body.dateMatch
//         }).then(fix => {
//             if( fix ) {
//                 request.flash('error_message', 'Gagal Terkirim!!!')
//                 request.flash('error', 'Pertandingan Telah Terjadwal!!!')
//                 response.redirect('/fixtures/schedule')
//             } else {
//                 Fixtures.findOne({
//                     "home.name": request.body.awayTeam,
//                     "away.name": request.body.homeTeam,
//                     matchDate: request.body.dateMatch
//                 }).then(fix => {
//                     if( fix ) {
//                 request.flash('error_message', 'Gagal Terkirim!!!')
//                 request.flash('error', 'Pertandingan Telah Terjadwal!!!')
//                         response.redirect('/fixtures/schedule')
//                     } else {
//                         Fixtures.findOne({
//                             stadium: request.body.stadium,
//                             matchDate: request.body.dateMatch
//                         }).then(fix => {
//                             if( fix ) {
//                                 request.flash('error_message', 'Gagal Terkirim!!!')
//                                 request.flash('error', 'Stadion Telah Digunakan Oleh Tim lain!!!')
//                                 response.redirect('/fixtures/schedule')
//                             } else createFixtures(request, response)
//                         }).catch(error => console.log(error))
//                     }
//                 }).catch(error => console.log(error))
//             }
//         }).catch(error => console.log(error))
//     } else{
//         response.redirect('/error')
//     }
// })

module.exports = router