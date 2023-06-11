let i = 0

//slideshow
const Fsquare1 = function(img, txt, square) {
    img.img1.classList.add('show')
    img.img1.classList.remove('hide')
    img.img2.classList.add('hide')
    img.img2.classList.remove('show')
    img.img3.classList.add('hide')
    img.img3.classList.remove('show')
    img.img4.classList.add('hide')
    img.img4.classList.remove('show')
    txt.newsText1.classList.remove('display-none')
    txt.newsText2.classList.add('display-none')
    txt.newsText3.classList.add('display-none')
    txt.newsText4.classList.add('display-none')
    square.square1.classList.add('actived-i')
    square.square2.classList.remove('actived-i')
    square.square3.classList.remove('actived-i')
    square.square4.classList.remove('actived-i')
}
const Fsquare2 = function(img, txt, square) {
    img.img2.classList.add('show')
    img.img2.classList.remove('hide')
    img.img1.classList.add('hide')
    img.img1.classList.remove('show')
    img.img3.classList.add('hide')
    img.img3.classList.remove('show')
    img.img4.classList.add('hide')
    img.img4.classList.remove('show')
    txt.newsText2.classList.remove('display-none')
    txt.newsText1.classList.add('display-none')
    txt.newsText3.classList.add('display-none')
    txt.newsText4.classList.add('display-none')
    square.square2.classList.add('actived-i')
    square.square1.classList.remove('actived-i')
    square.square3.classList.remove('actived-i')
    square.square4.classList.remove('actived-i')
}
const Fsquare3 = function(img, txt, square) {
    img.img3.classList.add('show')
    img.img3.classList.remove('hide')
    img.img2.classList.add('hide')
    img.img2.classList.remove('show')
    img.img1.classList.add('hide')
    img.img1.classList.remove('show')
    img.img4.classList.add('hide')
    img.img4.classList.remove('show')
    txt.newsText3.classList.remove('display-none')
    txt.newsText2.classList.add('display-none')
    txt.newsText1.classList.add('display-none')
    txt.newsText4.classList.add('display-none')
    square.square3.classList.add('actived-i')
    square.square2.classList.remove('actived-i')
    square.square1.classList.remove('actived-i')
    square.square4.classList.remove('actived-i')
}
const Fsquare4 = function(img, txt, square) {
    img.img4.classList.add('show')
    img.img4.classList.remove('hide')
    img.img2.classList.add('hide')
    img.img2.classList.remove('show')
    img.img3.classList.add('hide')
    img.img3.classList.remove('show')
    img.img1.classList.add('hide')
    img.img1.classList.remove('show')
    txt.newsText4.classList.remove('display-none')
    txt.newsText2.classList.add('display-none')
    txt.newsText3.classList.add('display-none')
    txt.newsText1.classList.add('display-none')
    square.square4.classList.add('actived-i')
    square.square2.classList.remove('actived-i')
    square.square3.classList.remove('actived-i')
    square.square1.classList.remove('actived-i')
}

const sqr = (img, txt, square, sq) => {
    //Square slide click
    sq.square1.addEventListener('click', function() {
        i = 0
        Fsquare1(img, txt, square)
    })
    sq.square2.addEventListener('click', function() {
        i = 1
        Fsquare2(img, txt, square)
    })
    sq.square3.addEventListener('click', function() {
        i = 2
        Fsquare3(img, txt, square)
    })
    sq.square4.addEventListener('click', function() {
        i = 3
        Fsquare4(img, txt, square)
    })
}

//Left and Right slide click
let L = 3
let R = 3

const lr = (img, txt, square, dr) => {
    dr.left.addEventListener('click', function() {
        if( i > 0 ) {
            i--
            if( i == 0 ) {
                Fsquare1(img, txt, square)
            }
            if( i == 1 ) {
                Fsquare2(img, txt, square)
            }
            if( i == 2 ) {
                Fsquare3(img, txt, square)
            }
        }
        else{
            i = 3
            if( i == 3 ) {
                Fsquare4(img, txt, square)
            }
        }
        // console.log(L)
    })
    dr.right.addEventListener('click', function() {
        if( i < 3 ) {
            i++
            if( i == 1 ) {
                Fsquare1(img, txt, square)
            }
            if( i == 2 ) {
                Fsquare2(img, txt, square)
            }
            if( i == 3 ) {
                Fsquare3(img, txt, square)
            }
        }
        else{
            i = 0
            if( i == 0 ) {
                Fsquare4(img, txt, square)
            }
        }
        // console.log(R)
    })
}

//load data api
fetch('/news/data.json').finally(() => {
    let loadObj = {
        load1: (...Value) => {
            Value[0].style.scale = 1
            Value[1].style.scale = 0
            Value[2].style.scale = 0
        },
        load2: (...Value) => {
            Value[0].style.scale = 0.5
            Value[1].style.scale = 1
            Value[2].style.scale = 0
        },
        load3: (...Value) => {
            Value[0].style.scale = 0
            Value[1].style.scale = 0.5
            Value[2].style.scale = 1
        }
    }

    let alpha = document.body.querySelectorAll('.container .news-slideshow .loading div')
    let iii = 0
    function autoLoad() {
            if( iii < 2 ) {
                iii++
                if( iii == 1 ) {
                    loadObj.load1(alpha[0], alpha[1], alpha[2])
                }
                if( iii == 2 ) {
                    loadObj.load2(alpha[0], alpha[1], alpha[2])
                }
            }
            else {
                iii = 0
                if( iii == 0 ) {
                    loadObj.load3(alpha[0], alpha[1], alpha[2])
                }
            }

            // console.log(i)
            setTimeout(autoLoad, 350)
    }
    autoLoad()
    // test.innerHTML = '<img src="./img/default.png">'
}).then(response => response.json()).then(data => {
    document.getElementById('loading').remove()
    const contentParent = document.body.querySelector('.container')
    const slideParent = document.body.querySelector('.container .news-slideshow')
    const slideTextParent = document.body.querySelector('.container .news-slideshow .news-slideshow-text')
    const slideImgParent = document.body.querySelector('.container .news-slideshow .news-slideshow-img')
    let slideText = ''
    let slideImg = ''
    let mostViewEl = ''
    let index = 0
 
    
    if( contentParent.dataset.actor == 'visitor' ) countData(data, data.length, slideText, slideImg, { img: slideImgParent, txt: slideTextParent }, index)
    if( contentParent.dataset.actor != 'visitor' ) slideNews(contentParent.dataset.favouriteTeam, data, { txt: slideTextParent, img: slideImgParent }, { txt: slideText, img: slideImg }, index)

    const img1 = document.querySelectorAll('.container .news-slideshow .news-slideshow-img div img')[0]
    const img2 = document.querySelectorAll('.container .news-slideshow .news-slideshow-img div img')[1]
    const img3 = document.querySelectorAll('.container .news-slideshow .news-slideshow-img div img')[2]
    const img4 = document.querySelectorAll('.container .news-slideshow .news-slideshow-img div img')[3]

    const left = document.querySelector('.fa-angle-left')
    const right = document.querySelector('.fa-angle-right')

    const square1 = document.querySelectorAll('.container .news-slideshow .news-slideshow-ico .dot i')[0]
    const square2 = document.querySelectorAll('.container .news-slideshow .news-slideshow-ico .dot i')[1]
    const square3 = document.querySelectorAll('.container .news-slideshow .news-slideshow-ico .dot i')[2]
    const square4 = document.querySelectorAll('.container .news-slideshow .news-slideshow-ico .dot i')[3]

    const newsText1 = document.querySelectorAll('.container .news-slideshow .news-slideshow-text div')[0]
    const newsText2 = document.querySelectorAll('.container .news-slideshow .news-slideshow-text div')[1]
    const newsText3 = document.querySelectorAll('.container .news-slideshow .news-slideshow-text div')[2]
    const newsText4 = document.querySelectorAll('.container .news-slideshow .news-slideshow-text div')[3]

    document.body.querySelector('.container .news-slideshow .news-slideshow-img div .slide-img1').classList.add('show')
    document.body.querySelector('.container .news-slideshow .news-slideshow-img div .slide-img2').classList.add('hide')
    document.body.querySelector('.container .news-slideshow .news-slideshow-img div .slide-img3').classList.add('hide')
    document.body.querySelector('.container .news-slideshow .news-slideshow-img div .slide-img4').classList.add('hide')

    // Auto slide
    function autoSlide() {
        if( i < 3 ) {
            i++
            if( i == 1 ) {
                Fsquare1({ img1, img2, img3, img4 }, { newsText1, newsText2, newsText3, newsText4 }, { square1, square2, square3, square4 })
            }
            if( i == 2 ) {
                Fsquare2({ img1, img2, img3, img4 }, { newsText1, newsText2, newsText3, newsText4 }, { square1, square2, square3, square4 })
            }
            if( i == 3 ) {
                Fsquare3({ img1, img2, img3, img4 }, { newsText1, newsText2, newsText3, newsText4 }, { square1, square2, square3, square4 })
            }
        }
        else{
            i = 0
            if( i == 0 ) {
                Fsquare4({ img1, img2, img3, img4 }, { newsText1, newsText2, newsText3, newsText4 }, { square1, square2, square3, square4 })
            }
        }
        // console.log(i)
        setTimeout(autoSlide, 6000)
    }
    
    autoSlide()
    
    if( document.body.querySelector('.container .content .hot-news') != null ) {
        document.body.querySelector('.container .content .hot-news').classList.remove('display-none')
        data.reverse()
        for( let ii = 0; ii < 4; ii++ ) {
            document.body.querySelector('.container .content .hot-news .content-box').innerHTML += `
                        <div class="box" onclick="return location.href = '/news/${data[ii].value}'">
                            <div>
                                <img src="${data[ii].imgThumbnail}" alt="">
                                <p class="titles">
                                    ${data[ii].thumbnail}
                                </p>
                                <p class="desc">
                                    ${data[ii].dateCreate, data[ii].timeCreate}
                                </p>
                            </div>
                        </div>
            `
        }
        document.body.querySelectorAll('.container .content .hot-news .content-box .box .titles').forEach(x => minWord(x, 3, 20))
    }
    
    fetch('/news/views-data.json').finally().then(response => response.json()).then(view => {
        document.body.querySelector('.container .content .most-view').classList.remove('display-none')
        most(view, data, mostViewEl, document.body.querySelector('.container .content .most-view .content-box'), 'x Dilihat', false)
    }).catch(error => {
        alert("Gagal Memuat Halaman! \n Periksa Koneksi Anda")
        console.log(error)
    })

    fetch('/news/likes-data.json').finally().then(response => response.json()).then(like => {
        document.body.querySelector('.container .content .most-liked').classList.remove('display-none')
        most(like, data, '', document.body.querySelector('.container .content .most-liked .content-box'), '%', true, { param: true })
    }).catch(error => {
        alert("Gagal Memuat Halaman! \n Periksa Koneksi Anda")
        console.log(error)
    })

    lr({ img1, img2, img3, img4 }, { newsText1, newsText2, newsText3, newsText4 }, { square1, square2, square3, square4 }, { left, right })
    sqr({ img1, img2, img3, img4 }, { newsText1, newsText2, newsText3, newsText4 }, { square1, square2, square3, square4 }, { square1, square2, square3, square4 })

    document.body.querySelectorAll('.container .news-slideshow .news-slideshow-text div h2').forEach(x => {
        minWord(x, 8, 60)
    })
}).catch(error => {
    alert("Gagal Memuat Halaman! \n Periksa Koneksi Anda")
    console.log(error)
})

fetch('/fixtures/data.json').finally().then(response => response.json()).then(data => {
    document.body.querySelector('.container .content .last-fix').classList.remove('display-none')
    data.data.reverse()

    for(let ii = 0; ii < 4; ii++) {
        document.body.querySelector('.container .content .last-fix .content-box').innerHTML += `
        <div class="box" style="cursor: pointer;" onclick="location.href = '/fixtures/${data.data[ii].id}'">
            <table>
                <tbody>
                    <tr>
                        <td class="text-center round" colspan="7">Pertandingan Ke ${data.data[ii].game_week}</td>
                    </tr>
                    <tr>
                        <td class="team-img"><img src="https://cdn.footystats.org/img/${data.data[ii].home_image}"></td>
                        <td class="team-name">${data.data[ii].home_name}</td>
                        <td>${data.data[ii].homeGoalCount}</td>
                        <td class="text-center">v</td>
                        <td class="text-right">${data.data[ii].awayGoalCount}</td>
                        <td class="text-right team-name">${data.data[ii].away_name}</td>
                        <td class="text-right team-img"><img src="https://cdn.footystats.org/img/${data.data[ii].away_image}"></td>
                    </tr>
                    <tr>
                        <td class="text-center" colspan="7">${data.data[ii].stadium_name}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        `
    }
    if( document.body.querySelector('.container .content .hot-news') != null ) {
        document.body.querySelector('.container .content .last-fix-favo').classList.remove('display-none')
        let alpha = []
        let indexData = []

        data.data.forEach(x => {
            if( x.home_name.includes(document.body.querySelector('.container').dataset.favouriteTeam) === true || x.away_name.includes(document.body.querySelector('.container').dataset.favouriteTeam) === true ) {
                alpha.push(x.id)
            }
        })

        alpha.forEach(x => {
            indexData.push(data.data.findIndex(obj => obj.id == x))
        })
        indexData.splice(4)

        indexData.forEach(x => {
            document.body.querySelector('.container .content .last-fix-favo .content-box').innerHTML += `
            <div class="box" style="cursor: pointer;" onclick="location.href = '/fixtures/${data.data[x].id}'">
            <table>
                <tbody>
                    <tr>
                        <td class="text-center round" colspan="7">Pertandingan Ke ${data.data[x].game_week}</td>
                    </tr>
                    <tr>
                        <td class="team-img"><img src="https://cdn.footystats.org/img/${data.data[x].home_image}"></td>
                        <td class="team-name">${data.data[x].home_name}</td>
                        <td>${data.data[x].homeGoalCount}</td>
                        <td class="text-center">v</td>
                        <td class="text-right">${data.data[x].awayGoalCount}</td>
                        <td class="text-right team-name">${data.data[x].away_name}</td>
                        <td class="text-right team-img"><img src="https://cdn.footystats.org/img/${data.data[x].away_image}"></td>
                    </tr>
                    <tr>
                        <td class="text-center" colspan="7">${data.data[x].stadium_name}</td>
                    </tr>
                </tbody>
            </table>
        </div>
            `
        })
    }
}).catch(error => {
    alert("Gagal Menghubungkan API!!!")
    console.log(error)
})

fetch('players-data.json').finally().then(response => response.json()).then(data => {
    if( document.body.querySelector('.container .content .top') != null ) {
        document.body.querySelector('.container .content .top').classList.remove('display-none')
        topApp(data.data, 'goals', document.body.querySelector('.container .content .top-goal .content-box'))
        topApp(data.data, 'assists', document.body.querySelector('.container .content .top-assist .content-box'))
        topApp(data.data, 'cleansheets', document.body.querySelector('.container .content .most-cleansheets .content-box'))
    }
}).catch(error => {
    alert("Gagal Menghubungkan API!!!")
    console.log(error)
})

const topApp = (data, app, addPlace) => {
    function uncap(string) {
        return string.charAt(0).toLowerCase() + string.slice(1)
    }

    if( app == 'goals' ) {
        data.sort((a, b) => a.goals_overall - b.goals_overall)
        data.reverse()
    
        for( let ii = 0; ii < 5; ii++ ) {
            addPlace.innerHTML += `
            <div class="box" onclick="location.href = '/spec/${data[ii].club_team_id}/${data[ii].id}'">
                <table>
                    <tr>
                        <td style="width: 30%;">
                            <img src="https://cdn.footystats.org/img/players/${uncap(data[ii].nationality)}-${data[ii].shorthand}.png">
                        </td>
                        <td class="name">
                            ${data[ii].known_as}
                        </td>
                        <td class="count text-right">
                            ${data[ii].goals_overall}
                        </td>
                    </tr>
                </table>
            </div>
            `
        }
    }
    if( app == 'assists' ) {
        data.sort((a, b) => a.assists_overall - b.assists_overall)
        data.reverse()
    
        for( let ii = 0; ii < 5; ii++ ) {
            addPlace.innerHTML += `
                <div class="box" onclick="location.href = '/spec/${data[ii].club_team_id}/${data[ii].id}'">
                    <table>
                        <tr>
                            <td style="width: 30%;">
                                <img src="https://cdn.footystats.org/img/players/${uncap(data[ii].nationality)}-${data[ii].shorthand}.png">
                            </td>
                            <td class="name">
                                ${data[ii].known_as}
                            </td>
                            <td class="count text-right">
                                ${data[ii].assists_overall}
                            </td>
                        </tr>
                    </table>
                </div>
            `
        }
    }
    if( app == 'cleansheets' ) {
        data.sort((a, b) => a.clean_sheets_overall - b.clean_sheets_overall)
        data.reverse()

        let gk = []
        data.forEach(x => {
            if( x.position == 'Goalkeeper' ) {
                gk.push(x)
            }
        })
    
        for( let ii = 0; ii < 5; ii++ ) {
            addPlace.innerHTML += `
            <div class="box" onclick="location.href = '/spec/${gk[ii].club_team_id}/${gk[ii].id}'">
                <table>
                    <tr>
                        <td style="width: 30%;">
                            <img src="https://cdn.footystats.org/img/players/${uncap(gk[ii].nationality)}-${gk[ii].shorthand}.png">
                        </td>
                        <td class="name">
                            ${gk[ii].known_as}
                        </td>
                        <td class="count text-right">
                            ${gk[ii].clean_sheets_overall}
                        </td>
                    </tr>
                </table>
            </div>
            `
        }
    }

}

const removeDuplicate = arr => {
    return arr.filter((items, index) => arr.indexOf(items) == index)
}

const countData = (data, dataLength, addEltxt, addElImg, addPlace, index) => {
    if( dataLength <= 4 ) {
        for(index; index <= dataLength - 1; index++) {
            addEltxt += `
                <div>
                    <h2 data-t-text="${data[index].thumbnail}">${data[index].thumbnail}</h2>
                    <a href="/news/${data[index].value}">Baca Sekarang</a>
                </div>
            `
            addElImg += `
            <div><img src="${data[index].imgThumbnail}" data-t-img="${data[index].imgThumbnail}" class="slide-img${index + 1}" style="width: 100%; height: 60vw;"></div>
            `
        }
    } 
    if( dataLength > 4 ) {
        let jj = dataLength - 5
        let nn = dataLength - 1
        index = 1
        // for(index; index <= 4; index++) {

        // }
        for(nn; nn > jj; nn--) {
            // console.log(nn)
            addEltxt += `
                <div>
                    <h2 data-t-text="${data[nn].thumbnail}">${data[nn].thumbnail}</h2>
                    <a href="/news/${data[nn].value}">Baca Sekarang</a>
                </div>
            `
            addElImg += `
            <div><img src="${data[nn].imgThumbnail}" data-t-img="${data[nn].imgThumbnail}" class="slide-img${index++}"></div>
            `
        }
    }
    addPlace.img.innerHTML = addElImg
    addPlace.txt.innerHTML = addEltxt
}

const minWord = (trg, countWord, countChar) => {
    let wordArr = trg.innerText.split(' ')
    wordArr.pop()
    let charArr = trg.innerText.split('')
    charArr.pop()
    let str = ''
    let char = ''
    
    if( wordArr.length > countWord ) {
        for( let mw = 0; mw <= countWord - 1; mw++ ) {
            str += ' ' + wordArr[mw]
        }
        
        trg.innerHTML = str + '...'
        if( trg.innerText.split('').length > countChar ) {
            for( let mw = 0; mw <= countChar - 1; mw++ ) {
                char += trg.innerText.split('')[mw]
            }
            trg.innerHTML = char + '...'
        }
    }
}

const slideNews = (favo, data, addPLace, addEl, index) => {
    let bravo = ''
    let delta = ''
    let less = ''
    let indexData = ''

    data.forEach(x => {
        if( x.category.includes(favo) === true ) return bravo += x.value +'\\'
    })
    let bravoR = bravo.split('\\')
    bravoR.pop()
    bravoR.forEach(x => {
        indexData += data.findIndex(obj => obj.value == x) + ' '
    })
    const indexElementsData = indexData.split(' ')
    indexElementsData.pop()
    const resultindex = indexElementsData.slice(indexElementsData.length - 4, indexElementsData.length)
    data.forEach(x => {
        delta += x.value + '\\'
    })
    let deltaR = delta.split('\\')
    deltaR.pop()
    if( indexElementsData.length >= 4 ) {
        resultindex.reverse().forEach(x => {
            addEl.txt += `
            <div>
                <h2 data-t-text="${data[x].thumbnail}">${data[x].thumbnail}</h2>
                <a href="/news/${data[x].value}">Baca Sekarang</a>
            </div>
            `
            addEl.img += `
            <div><img src="${data[x].imgThumbnail}" data-t-img="${data[x].imgThumbnail}" class="slide-img${1 + index++}"></div>
            `
        })
    }
    if( indexElementsData.length < 4 ) {
        deltaR.forEach(x => {
            less += data.findIndex(obj => obj.value == x) + '\\'
        })
        let lessR = less.split('\\')
        lessR.pop()

        const resultLess = lessR.slice(data.length - 4, data.length)

        let afterConcat = indexElementsData.reverse().concat(resultLess.reverse())
        let finalLessArr = removeDuplicate(afterConcat)
        let resultArr = finalLessArr.slice(0, 4)

        resultArr.forEach(x => {
            addEl.txt += `
            <div>
                <h2 data-t-text="${data[x].thumbnail}">${data[x].thumbnail}</h2>
                <a href="/news/${data[x].value}">Baca Sekarang</a>
            </div>
            `
            addEl.img += `
            <div><img src="${data[x].imgThumbnail}" data-t-img="${data[x].imgThumbnail}" class="slide-img${1 + index++}"></div>
            `
        })
        
        // console.log(afterConcat)
        // console.log(finalLessArr)
        // console.log(resultArr)
    }
    // console.log(indexElementsData)
    addPLace.txt.innerHTML = addEl.txt 
    addPLace.img.innerHTML = addEl.img
}

const most = (data, news, addEl, addPLace, txt, elif = false, params = null) => {
    let mostS = ''
    if( elif == true ) {
        data.forEach(x => {
            if( x.user.like == params.param ) {
                mostS += x.news.news_value + '\\'
            }
        })
    } else if( elif == false ) {
        data.forEach(x => {
            mostS += x.news.news_value + '\\'
        })
    } else return console.log('Unknown argument')

    let valueNews = mostS.split('\\')
    valueNews.pop()
    let countMost = valueNews.reduce((prev, curr) => {
        prev[curr] = (prev[curr] || 0) + 1
        return prev
    }, {})

    let view = []
    let perc = [[], [], [], []]

    for( const m in countMost ) {
        view.push([m, countMost[m]])
    }
    
    view.sort((a, b) => a[1] - b[1])
    view.reverse()

    if( elif == true ) {
        for( let aa = 0; aa < 4; aa++ ) {
            data.forEach(x => {
                if( view[aa][0] == x.news.news_value ) perc[aa].push(x.user.like)
            })
        }
    }

    for( let ii = 0; ii < 4; ii++ ) {
        // view[ii].pop()
        news.forEach(x => {
            if( view[ii][0] == x.value ) {
                if( elif == true ) {
                    return addEl += `
                        <div class="box" onclick="return location.href = '/news/${x.value}'">
                            <div>
                                <img src="${x.imgThumbnail}" alt="">
                                <p class="titles">
                                    ${x.thumbnail}
                                </p>
                                <p class="desc">
                                    ${Math.round(view[ii][1] / perc[ii].length * 100) + txt}
                                </p>
                            </div>
                        </div>
                    `
                }
                addEl += `
                        <div class="box" onclick="return location.href = '/news/${x.value}'">
                            <div>
                                <img src="${x.imgThumbnail}" alt="">
                                <p class="titles">
                                    ${x.thumbnail}
                                </p>
                                <p class="desc">
                                    ${view[ii][1]}${txt}
                                </p>
                            </div>
                        </div>

                `
            }
        })
    }

    // console.log(perc)

    addPLace.innerHTML = addEl

    addPLace.querySelectorAll('.box .titles').forEach(x => minWord(x, 5, 45))
}

document.addEventListener('scroll', function() {
    if( window.innerWidth > 900 && window.innerWidth <= 975 ) {
        document.body.querySelector('.navbar').classList.add('bg-purple')
    }

    if( globalThis.pageYOffset >= 620 && this.body.clientWidth >= 1100 )
        document.body.querySelector('.navbar').classList.add('bg-purple')
    if( globalThis.pageYOffset <= 620 && this.body.clientWidth >= 1100 )
        document.body.querySelector('.navbar').classList.remove('bg-purple')

    if( globalThis.pageYOffset >= 500 && this.body.clientWidth >= 900 && this.body.clientWidth < 1100 )
        document.body.querySelector('.navbar').classList.add('bg-purple')
    if( globalThis.pageYOffset <= 500 && this.body.clientWidth >= 900 && this.body.clientWidth < 1100 )
        document.body.querySelector('.navbar').classList.remove('bg-purple')
})