const { request, response } = require('express')
const bcrypt = require('bcryptjs')
const stopwords = require('stopword').id
const User = require('../models/User')
const News = require('../models/News')
const Like = require('../models/Like')
const Views = require('../models/Views')
const Comments = require('../models/Comments')
const Fixtures = require('../models/Fixtures')

module.exports = {
    saveUser : (request, response, user) => {
        let newUser = null
        let userId
        let count

        const date = new Date()
        let randomN1 = Math.random() * date.getDate()
        let randomN2 = Math.random() * date.getDay()
        let randomN3 = Math.random() * date.getMonth() + 1
        let randomN4 = Math.random() * date.getFullYear()
        let randomN5 = Math.random() * date.getHours()
        let randomN6 = Math.random() * date.getMinutes()
        let randomN7 = Math.random() * date.getSeconds()
        let randomN8 = Math.random() * date.getMilliseconds()

        const idGenerate = (...Args) => {
            let gen = ''
            for( const x of Args ) {
                gen += `${Math.round(x)}`
            }
            count = user.length
            userId = `${count}_` + gen
        }

        idGenerate(randomN1, randomN2, randomN3, randomN4, randomN5, randomN6, randomN7, randomN8, date.getTime(), date.getTimezoneOffset())

        newUser = new User({
            username: request.body.username,
            email: request.body.email,
            favourite: request.body.favourite,
            password: request.body.password,
            user_id: userId
        })

        return bcrypt.genSalt(6, (error, salt) => {
            if( error ) console.log(error)
            bcrypt.hash(newUser.password, salt, (error, hash) => {
                if( error ) console.log(error)

                //HASHING
                newUser.password = hash

                //SAVE
                newUser.save().then(_saved => {
                    request.flash('success_message', 'Terdaftar')
                    response.redirect('/account/login')
                }).catch(error => console.log(error))
            })
        })
    },
    postNews: (request, response, news) => {
        let postNews = null

        let dateCreate = ''
        let timeCreate = ''

        function dg(date) {
            let y = `${date.getFullYear()}`
            let m = `${date.getMonth() + 1}`
            let d = `${date.getDate()}`
            let mn = `${date.getMinutes()}`
            let mh = `${date.getHours()}`
            
            if( m.length == 1 ) {
                m = `0${date.getMonth() + 1}`
            }
        
            if( d.length == 1 ) {
                d = `0${date.getDate()}`
            }
        
            if( mn.length == 1 ) {
                mn = `0${date.getMinutes()}`
            }
        
            if( mh.length == 1 ) {
                mh = `0${date.getHours()}`
            }
        
            dateCreate = `${y}-${m}-${d}`
            timeCreate = `${mh}:${mn}`
        }

        let rest = ''
        let index = ''
        let thumb = request.body.thumbnail
        let q = thumb.replace( /\r\n/g, '').replace(/^\s+|\s+$/, '').replace(/[^a-zA-Z\d ]/g, '').replace(/\s+$/, '')
        const char = q.match(/\S+/g)

        char.forEach(a => {
            index += a + '-'
        })

        let rslt = index.split('')
        rslt.pop()

        rslt.forEach(y => {
            rest += y
        })
        let rndm = Math.floor(Math.random() * thumb.length)
        // console.log(rndm)
        // console.log(thumb.length)
        rest += `-${news}${new Date().getDate()}${new Date().getMonth() + 1}${new Date().getFullYear()}${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}${new Date().getMilliseconds()}${rndm}`
        // console.log(rest)

        dg(new Date())

        if( request.body.imgThumbnail == '' ) {
            postNews = new News({
                content: request.body.news,
                dateCreate,
                timeCreate,
                category: [request.body.category0, request.body.category1, request.body.category2, request.body.category3, request.body.category4],
                source: request.body.source,
                thumbnail: request.body.thumbnail,
                writer: request.user.username,
                writer_id: request.user.user_id,
                value: rest
            })
        } else{
            postNews = new News({
                content: request.body.news,
                dateCreate,
                timeCreate,
                category: [request.body.category0, request.body.category1, request.body.category2, request.body.category3, request.body.category4],
                source: request.body.source,
                thumbnail: request.body.thumbnail,
                imgThumbnail: request.body.imgThumbnail,
                writer: request.user.username,
                writer_id: request.user.user_id,
                value: rest
            })
        }

        return postNews.save().then(() => {
            // console.log(news)
            request.flash('success_message', 'Terunggah')
            response.redirect('/news')
        }).catch(error => console.log(error))
    },
    searchNews: value => {
        let stringCheck = value.replace( /\r\n/g, '').replace(/^\s+|\s+$/, '').replace(/[^a-zA-Z\d ]/g, '').replace(/\s+$/, '')

        let parts = stringCheck.split(/\s/)
        let terms = []
        
        for( const part of parts ) {
            terms.push(part)
            // if( stopwords.indexOf(part) == -1 ) {
            //     terms.push(part)
            // }
            // if( stopwords.indexOf(part) != -1 ) {
            //     terms.push('')
            // }
        }


        let query = { '$and': [] }

        for( const term of terms ) {
            let queryFrag = { thumbnail: { '$regex': term, '$options': 'i' } }
            query['$and'].push(queryFrag)
        }
        return query
    },
    likeNews: (request, response, news) => {
        let newLike
        let date
        let time
        let like

        if( request.body.like == 'on' ) like = true
        if( request.body.unlike == 'on' ) like = false
        if( request.body.like != 'on' && request.body.unlike != 'on' ) return response.redirect('/')

        function dg(dt) {
            let y = `${dt.getFullYear()}`
            let m = `${dt.getMonth() + 1}`
            let d = `${dt.getDate()}`
            let mn = `${dt.getMinutes()}`
            let mh = `${dt.getHours()}`
            
            if( m.length == 1 ) {
                m = `0${dt.getMonth() + 1}`
            }
        
            if( d.length == 1 ) {
                d = `0${dt.getDate()}`
            }
        
            if( mn.length == 1 ) {
                mn = `0${dt.getMinutes()}`
            }
        
            if( mh.length == 1 ) {
                mh = `0${dt.getHours()}`
            }
        
            date = `${y}-${m}-${d}`
            time = `${mh}:${mn}`
        }

        dg(new Date())

        newLike = new Like({
            news: {
                news_value: request.params.values,
                writer_id: news.writer_id
            },
            user: {
                user_id: request.user.user_id,
                like
            },
            date, time
        })

        return newLike.save().then(saved => {
            console.log(saved.user.like)
            if( like == true ) request.flash('like_message', 'Disukai!')
            if( like == false ) request.flash('like_message', 'Tidak Disukai!')
            // response.redirect('/news/' + request.params.values)
        }).catch(error => console.log(error))
    },
    viewsNews: (request, response, news) => {
        let newViews
        let date
        let time
        let userRole = ''
        let userId = ''
        let userName = ''
        let myIp

        function dg(dt) {
            let y = `${dt.getFullYear()}`
            let m = `${dt.getMonth() + 1}`
            let d = `${dt.getDate()}`
            let mn = `${dt.getMinutes()}`
            let mh = `${dt.getHours()}`
            
            if( m.length == 1 ) {
                m = `0${dt.getMonth() + 1}`
            }
        
            if( d.length == 1 ) {
                d = `0${dt.getDate()}`
            }
        
            if( mn.length == 1 ) {
                mn = `0${dt.getMinutes()}`
            }
        
            if( mh.length == 1 ) {
                mh = `0${dt.getHours()}`
            }
        
            date = `${y}-${m}-${d}`
            time = `${mh}:${mn}`
        }

        dg(new Date())

        if( typeof request.user == 'undefined' ) {
            userRole = 'visitor'
            userId = request.body.actor_ip
            userName = 'unReg'
        }
        if( typeof request.user != 'undefined' ) {
            userRole = request.user.role
            userId = request.user.user_id
            userName = request.user.username
        }

        newViews = new Views({
            actor: {
                actor_role: userRole,
                actor_name: userName,
                actor_id: userId
            },
            news: {
                news_value: request.params.values,
                writer_id: news.writer_id
            },
            date, time
        })

        return newViews.save().then().catch(error => console.log(error))
    },
    commentPost: (request, response, news) => {
        let newComment
        let date
        let time
        let comment = request.body.comment

        function dg(dt) {
            let y = `${dt.getFullYear()}`
            let m = `${dt.getMonth() + 1}`
            let d = `${dt.getDate()}`
            let mn = `${dt.getMinutes()}`
            let mh = `${dt.getHours()}`
            
            if( m.length == 1 ) {
                m = `0${dt.getMonth() + 1}`
            }
        
            if( d.length == 1 ) {
                d = `0${dt.getDate()}`
            }
        
            if( mn.length == 1 ) {
                mn = `0${dt.getMinutes()}`
            }
        
            if( mh.length == 1 ) {
                mh = `0${dt.getHours()}`
            }
        
            date = `${y}-${m}-${d}`
            time = `${mh}:${mn}`
        }

        dg(new Date())

        if( typeof request.body.comment == Array ) {
            comment = comment.pop()
        }

        newComment = new Comments({
            news: {
                news_value: request.params.values,
                writer_id: news.writer_id
            },
            user: {
                user_id: request.user.user_id,
                comment
            },
            date, time
        })

        return newComment.save().then().catch(error => console.log(error))
    }
    // createFixtures: (request, response) => {
    //     new Fixtures({
    //         home: {
    //             name: request.body.homeTeam,
    //             goal: '-',
    //             goalScored: '-'
    //         },
    //         away: {
    //             name: request.body.awayTeam,
    //             goal: '-',
    //             goalScored: '-'
    //         },
    //         stadium: request.body.stadium,
    //         matchDate: request.body.dateMatch,
    //         matchTime: request.body.timeMatch
    //     }).save().then(saved => {
    //         console.log(saved)
    //         request.flash('success_message', 'Terjadwalkan!')
    //         response.redirect('/fixtures/schedule')
    //     }).catch(error => console.log(error))
    // }
}