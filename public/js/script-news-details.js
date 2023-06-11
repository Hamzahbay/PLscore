const dataCount = {
    countNumberData: dataLength => {
        const roundDataCount = `${dataLength/10}`
        if( roundDataCount.split('.').pop() != 0 ) {
            return roundDataCount.split('.').pop()
        } else{
            return 0
        }
    },
    floorDataCount: dataLength => {
        const floorDataCount = Math.floor(dataLength/10)
        return floorDataCount
    }
}

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

    let alpha = document.body.querySelectorAll('.container .thumbnail-news-box .thumbnail .loading div')
    let i = 0
    function autoLoad() {
            if( i < 2 ) {
                i++
                if( i == 1 ) {
                    loadObj.load1(alpha[0], alpha[1], alpha[2])
                }
                if( i == 2 ) {
                    loadObj.load2(alpha[0], alpha[1], alpha[2])
                }
            }
            else {
                i = 0
                if( i == 0 ) {
                    loadObj.load3(alpha[0], alpha[1], alpha[2])
                }
            }

            // console.log(i)
            setTimeout(autoLoad, 350)
        }
        autoLoad()
}).then(response => response.json()).then(data => {
    data.reverse()
    document.getElementById('loadMoreData').classList.toggle('display-none')
    document.getElementById('searchBox').classList.toggle('display-none')
    document.getElementById('loading').remove()
    const draftParents = document.body.querySelector('.container .thumbnail-news-box .thumbnail')
    let draft = ''
    let a = 10
    let i = 0
    let count = (dataCount.floorDataCount(data.length) * 10) + parseInt(dataCount.countNumberData(data.length))
    const loadMoreData = () => {
        if( a == dataCount.floorDataCount(data.length) * 10 ) {
            a = count
            i = dataCount.floorDataCount(data.length) * 10
        } else{
            a += 10
            i += 10
        }
        console.log(i)
        console.log(a)
        viewMore(data, draftParents, draft, a, i)
        stopLink(document.body.querySelectorAll('.container .thumbnail-news-box .thumbnail .content-box'))
        responsiveMinWord(document.querySelector('.container .thumbnail-news-box .thumbnail'), document.body)
    }

    console.log(i)
    console.log(a)

    viewMore(data, draftParents, draft, a, i)
    document.getElementById('loadMoreData')
    
    document.getElementById('loadMoreData').addEventListener('click', loadMoreData)

    stopLink(document.body.querySelectorAll('.container .thumbnail-news-box .thumbnail .content-box'))
    responsiveMinWord(document.querySelector('.container .thumbnail-news-box .thumbnail'), document.body)
}).catch(error => {
    alert("Gagal Memuat Berita! \n Periksa Koneksi Anda")
    console.log(error)
})

const viewMore = (addEl, addPlace, place, count, index) => {
    if( count == addEl.length ) {
        document.getElementById('loadMoreData').remove()
    }
    for( let y = index; y < count; y++ ) {
        // console.log(addEl[i].value)
        place +=  `
        <div class="content-box ct-b${y + 1} br-5 purple text-left" data-params="${addEl[y].value}">
        <div class="" style="padding: 2%; margin: 1vh 0;">
        <table>
        <tr>
        <td class="td-img font-larger" rowspan="2">
        <img src="${addEl[y].imgThumbnail}" alt="">
        </td>
        <td class="td-title font-larger">
        <p class="thumnail-data">
        ${addEl[y].thumbnail}
        </p>
        </td>
        </tr>
        <tr>
        <td class="td-date font-smaller text-right">
        ${addEl[y].dateCreate}, ${addEl[y].timeCreate} WIB
        </td>
        </tr>
        </table>
        </div>
        </div>
        `
    }
    addPlace.innerHTML += place
}

const stopLink = clickT => {
    for( const m of clickT ) {
        m.addEventListener('click', function() {
            let thumb = this.dataset.params
            window.location.href = `/news/${thumb}`
        })
    }
}

const minWord = (trg, countWord, countChar) => {
    let wordArr = trg.innerText.split(' ')
    let charArr = trg.innerText.split('')
    let str = ''
    let char = ''

    if( wordArr.length > countWord ) {
        for( let mw = 0; mw <= countWord - 1; mw++ ) {
            str += ' ' + wordArr[mw]
        }
    
        return trg.innerHTML = str + '...'
    }
    if( charArr.length > countChar ) {
        for( let mw = 0; mw <= countChar - 1; mw++ ) {
            char += charArr[mw]
        }
        return trg.innerHTML = char + '...'
    }
}

const responsiveMinWord = (params, trg) => {
    if( params.clientWidth <= 480 ) {
        for( let ss = 1; ss <= trg.querySelectorAll('.container .thumbnail-news-box .thumbnail .content-box').length; ss++ ) {
            minWord(trg.querySelector(`.container .thumbnail-news-box .thumbnail .ct-b${ss} .thumnail-data`), 8, 60)
        }
    } else if( params.clientWidth <= 600 ) {
        for( let ss = 1; ss <= trg.querySelectorAll('.container .thumbnail-news-box .thumbnail .content-box').length; ss++ ) {
            minWord(trg.querySelector(`.container .thumbnail-news-box .thumbnail .ct-b${ss} .thumnail-data`), 15, 125)
        }
    } else if( params.clientWidth <= 800 ) {
        for( let ss = 1; ss <= trg.querySelectorAll('.container .thumbnail-news-box .thumbnail .content-box').length; ss++ ) {
            minWord(trg.querySelector(`.container .thumbnail-news-box .thumbnail .ct-b${ss} .thumnail-data`), 20, 150)
        }
    } else if( params.clientWidth > 800 ) {
        for( let ss = 1; ss <= trg.querySelectorAll('.container .thumbnail-news-box .thumbnail .content-box').length; ss++ ) {
            minWord(trg.querySelector(`.container .thumbnail-news-box .thumbnail .ct-b${ss} .thumnail-data`), 30, 250)
        }
    }
}