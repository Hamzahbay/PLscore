const router = require('express').Router()
const User = require('./../models/User')
const Teams = require('./../models/Teams')
const News = require('./../models/News')
const Like = require('./../models/Like')
const Views = require('./../models/Views')
const Comments = require('./../models/Comments')
const { ensureAuthenticated } = require('./../config/auth')
const { postNews, searchNews, likeNews, viewsNews, commentPost } = require('../method/save')
const { request, response } = require('express')

router.get('/', (request, response) => {
    let nb = ''
    if( request.query.search ) {
        let searchQuery = searchNews(request.query.search)
        // console.log(searchQuery.$and)
        News.find(searchQuery).then(news => {
            if( news.length < 1 ) nb = `<div class="nf"><p>Berita Tidak Ditemukan</p></div>`
            if( typeof request.user == 'undefined' ) {
                response.render('news-search', { page: 'Berita', news, searchV: request.query.search, nb })
            } else{
                response.render('news-search', { page: 'Berita', user: request.user, news, searchV: request.query.search, nb })
            }
        }).catch(error => console.log(error))
    } else{
        News.find().then(news => {
            if( typeof request.user == 'undefined' ) {
                response.render('news', { page: 'Berita', news, nb })
            } else{
                response.render('news', { page: 'Berita', user: request.user, news, nb })
            }
        }).catch(error => console.log(error))
    }
})

router.get('/data.json', (request, response) => {
    News.find().then(news => {
        response.json(news)
    }).catch(error => console.log(error))
})

router.get('/likes-data.json', (request, response) => {
    Like.find().then(like => {
        response.jsonp(like)
    }).catch(error => console.log(error))
})

router.get('/views-data.json', (request, response) => {
    Views.find().then(view => {
        response.jsonp(view)
    }).catch(error => console.log(error))
})

router.get('/comments-data.json', (request, response) => {
    Comments.find().then(comment => {
        response.jsonp(comment)
    }).catch(error => console.log(error))
})

router.get('/back', (request, response) => {
    request.flash('success_message', 'Terima Kasih Telah Membaca Berita Ini')
    response.redirect('/news')
})

router.get('/postNews', (request, response) => {
    if( typeof request.user == 'undefined' ) {
        response.redirect('/error')
    } else if( request.user.role == 'admin' || request.user.role == 'writer' ) {
        News.find().then(news => {
            Teams.findOne().then(teams => {
                response.render('postNews', { page: 'Unggah Berita', user: request.user, news, teams: teams.teams })
            }).catch(error => console.log(error))
        }).catch(error => console.log(error))
    } else{
        response.redirect('/error')
    }
})

router.get('/search', (request, response) => {
    if( typeof request.user == 'undefined' ) {

    } else{

    }
})

router.get('/:values', (request, response) => {
    News.findOne({ value: request.params.values }).then(news => {
        if( news ) {
            if( typeof request.user == 'undefined' ) {
                response.render('news-details', { page: 'Berita', news, values: request.params.values, like: '' })
            } else{
                Like.findOne({ "news.news_value": request.params.values, "user.user_id": request.user.user_id }).then(like => {
                    if(like) response.render('news-details', { page: 'Berita', user: request.user, news, values: request.params.values, like: like.user.user_id })
                    else response.render('news-details', { page: 'Berita', user: request.user, news, values: request.params.values, like: '' })
                }).catch(error => console.log(error))
            }
        } else{
            response.redirect('/error')
        }
    }).catch(error => console.log(error))
})

router.get('/modify/:id', (request, response) => {
    if( typeof request.user == 'undefined' ) return response.redirect('/error')
    if( request.user.role != 'admin' && request.user.role != 'writer' ) return response.redirect('/error')
    News.findOne({ _id: request.params.id }).then(news => {
        if( news.writer_id == request.user.user_id ) {
        Teams.findOne().then(teams => {
                response.render('news-modify', { page: 'Edit Berita', user: request.user,teams: teams.teams, news })
            }).catch(error => console.log(error))
        } else response.redirect('/error')
    }).catch(error => console.log(error))
})

router.get('/delete/:id', (request, response) => {
    News.findByIdAndDelete(request.params.id).then(deleted => {
        request.flash('success_message', 'Terhapus')
        response.redirect('/news')
    }).catch(error => console.log(error))
})

//CREATE NEWS
router.post('/postNews', (request, response) => {
    let paragraph = request.body.news.split('\n')
    let sentence = request.body.news.split('.')
    let words = request.body.news.split(' ')
    let character = request.body.news.split('')
    if( !request.body.news || request.body.thumbnail == '' || !request.body.source || !request.body.thumbnail ) {
        request.flash('error_message', 'Isi Untuk Mengunggah!')
        response.redirect('/news/postNews')
    } else if( request.body.category1 == '' || request.body.category2 == '' || request.body.category3 == '' || request.body.category4 == '' || request.body.category0 == '' || !request.body.category0 ) {
        request.flash('error_message', 'Isi Kategori Untuk Mengunggah!')
        response.redirect('/news/postNews')
    } else if( request.body.source.length < 3 ){
        request.flash('error_message', 'Nama Sumber Terlalu Sedikit!')
        response.redirect('/news/postNews')
    } else if( paragraph.length < 3 || words.length < 60 ) {
        request.flash('error_message', 'Konten / Berita Terlalu Sedikit!')
        request.flash('error', 'Minimal 3 Paragraf dan 60 Kata!!')
        response.redirect('/news/postNews')
    } else{
        News.find().then(news => {
            postNews(request, response, news.length)
        }).catch(error => console.log(error))
    }
})

router.post('/:values', (request, response) => {
    News.findOne({ value: request.params.values }).then(news => {
        if( typeof request.user == 'undefined' ) {
            Views.findOne({ "actor.actor_id": request.body.actor_ip, "news.news_value": request.params.values }).then(view => {
                if( view ) return
                else return viewsNews(request, response, news)
            }).catch(error => console.log(error))
            request.flash('error_message', 'Masuk Kedalam Akun Untuk Melanjutkan Aksi')
            response.redirect('/account/login')
        } else{
            if( request.body.comment ) return commentPost(request, response, news)
            if( request.body.delCom ) return Comments.findOneAndDelete({ _id: request.body.delCom }).then(cmn => console.log(cmn)).catch(error => console.log(error))
            Like.findOne({"news.news_value": request.params.values, "user.user_id": request.user.user_id }).then(mjd => {
                Views.findOne({ "actor.actor_id": request.user.user_id, "news.news_value": request.params.values }).then(view => {
                    if( view ) return
                    else return viewsNews(request, response, news)
                }).catch(error => console.log(error))
                
                if( mjd ) {
                    if( request.body.like ) {
                        if( mjd.user.like == true ) {
                            return Like.findOneAndDelete({ _id: mjd._id, "user.like": true }).then().catch(error => console.log(error))
                        }
                        if( mjd.user.like == false ) {
                            Like.findOneAndDelete({ _id: mjd._id, "user.like": false }).then().catch(error => console.log(error))
                            return likeNews(request, response, news)
                        }
                    }
                    if( request.body.unlike ) {
                        if( mjd.user.like == false ) {
                            return Like.findOneAndDelete({ _id: mjd._id, "user.like": false }).then().catch(error => console.log(error))
                        }
                        if( mjd.user.like == true ) {
                            Like.findOneAndDelete({ _id: mjd._id, "user.like": true }).then().catch(error => console.log(error))
                            return likeNews(request, response, news)
                        }
                    }
                    else return
                }
                else return likeNews(request, response, news)
            }).catch(error => console.log(error))
        }
    }).catch(error => console.log(error))
})

router.post('/modify/:id', ensureAuthenticated, async (request, response) => {
    let aa
    async function alp() {
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
    
        let rndm = Math.floor(Math.random() * request.body.thumbnail.length)
        rest += `-edited_${new Date().getDate()}${new Date().getMonth() + 1}${new Date().getFullYear()}${new Date().getHours()}${new Date().getMinutes()}${new Date().getSeconds()}${new Date().getMilliseconds()}${rndm}`
    
        aa = rest
        let doc = await News.findOne({ _id: request.params.id })
        // let upd = {
        //     content: request.body.news,
        //     category: [request.body.category0, request.body.category1, request.body.category2, request.body.category3, request.body.category4],
        //     source: request.body.source,
        //     thumbnail: request.body.thumbnail,
        //     imgThumbnail: './img/default.png',
        //     value: rest
        // }
    
        if( request.body.imgThumbnail == '' ) {
            return News.updateOne({ _id: request.params.id }, {
                content: request.body.news,
                category: [request.body.category0, request.body.category1, request.body.category2, request.body.category3, request.body.category4],
                source: request.body.source,
                thumbnail: request.body.thumbnail,
                imgThumbnail: './img/default.png',
                value: rest
            })
        }
        if( request.body.category0 == '' ) {
            return News.updateOne({ _id: request.params.id }, {
                content: request.body.news,
                source: request.body.source,
                thumbnail: request.body.thumbnail,
                imgThumbnail: request.body.imgThumbnail,
                value: rest
            })
        }
        return News.updateOne({ _id: request.params.id }, {
            content: request.body.news,
            category: [request.body.category0, request.body.category1, request.body.category2, request.body.category3, request.body.category4],
            source: request.body.source,
            thumbnail: request.body.thumbnail,
            imgThumbnail: request.body.imgThumbnail,
            value: rest
        })
    }

    await alp()

    response.redirect('/news/' + aa)
})

module.exports = router