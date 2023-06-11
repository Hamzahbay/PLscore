const labelCtg = document.getElementById('labelCtg')
const icoPlus = document.querySelector('.fa-plus-circle')
const icoMinus = document.querySelector('.fa-minus-circle')

let tTitles = ''
let tImg = ''

let i = 0
let a = ''

const getTitles = trg => {
    if( document.querySelector('.tox .tox-editor-container .tox-sidebar-wrap .tox-edit-area__iframe') == null ) return null
    return document.querySelector('.tox .tox-editor-container .tox-sidebar-wrap .tox-edit-area__iframe').contentWindow.document.body.querySelector(trg)
}

const thumbnailTitles = (...Args) => {
    let heading = ''
    let headingArr = null
    let result = null

    Args.forEach(x => {
        if( x != null ) {
            if( x.tagName == 'H1' ) {
                heading += x.tagName.split('').pop()
            }
            if( x.tagName == 'H2' ) {
                heading += x.tagName.split('').pop()
            }
            if( x.tagName == 'H3' ) {
                heading += x.tagName.split('').pop()
            }
            if( x.tagName == 'H4' ) {
                heading += x.tagName.split('').pop()
            }
            if( x.tagName == 'H5' ) {
                heading += x.tagName.split('').pop()
            }
            if( x.tagName == 'H6' ) {
                heading += x.tagName.split('').pop()
            }
            headingArr = heading.split('')
            if( x.tagName == `H${headingArr[0]}` ) {
                result = x.textContent
            }
        }
    })
    
    const spellcheck = trg => {
        if( trg == null ) return null
        let p = ''
        const char = trg.match(/\S+/g) || ''

        for( const m of char ) {
            p += `${m} `
        }
        
        tTitles = p
        thumbnailTitle.value = p
        // char.filter(e => {
        //     if( e != '`' && e!= '"' && e!= '!' && e!= '?' && e!= '&' && e!= '%' && e!= '$' && e!= '#' && e!= '\\' && e!= '*' && e!= '/' && e!= `+` && e!= '^' && e!= '|' && e!= '=' && e!= '~' && e!= '@' && e!= '=' && e!= '<' && e!= '>' ){
        //         trg += e
        //     }
        // })
    }
    spellcheck(result)
}

const thumbnailImg = (trg, ch) => {
    if( ch.querySelector('img') == null ) return trg.value
    // ch.querySelectorAll('img').forEach(x => {
    //     x.removeAttribute("width")
    //     x.removeAttribute("height")
    //     x.removeAttribute("style")
    // })
    // ch.querySelectorAll('table').forEach(x => {
    //     x.removeAttribute("width")
    //     x.removeAttribute("height")
    //     x.removeAttribute("style")
    // })
    // ch.querySelector('table').removeAttribute('style')
    // ch.querySelector('table').removeAttribute('width')
    // ch.querySelector('table').removeAttribute('height')
    let img = ch.querySelector('img').src
    tImg = img
    trg.value = img
}

const getOpt = (sl, opt) => {
    let option = sl.innerHTML
    opt.innerHTML = option
    opt.lastElementChild.remove()
    sl.lastElementChild.remove()
}

const addCtg = () => {
    if( i == 4 ) {
        return alert('Kategori Tim Telah Maksimum!')
    } else{
        if( i > 4 ) {
            i = 0
        }
        i += 1
        let cre = document.createElement("P")
        cre.innerHTML = `<select name="category${i}" id="category${i}" class="category br-10" style="width: 100%; outline: none;" required></select>`
        
        a += i
        let arr = a.split('')
        // let fv = () => {
        //     arr.forEach(x => {
        //         if( document.getElementById(`category${x}`) == null ) return null
        //         document.getElementById(`category${x}`).addEventListener('click', function() {
        //             if( typeof document.getElementById(`empty${x}`) == 'undefined' ) return this
        //             if( document.getElementById(`empty${x}`) == null ) return this
        //             document.getElementById(`empty${x}`).remove()
        //         })
        //     })
        // }
        
        document.querySelector('.ctg-td').appendChild(cre)
        // fv()
        getOpt(document.getElementById('category0'), document.getElementById(`category${i}`))
    }
}

const removeCtg = () => {
    if( i == 0 ) {
        return alert('Anda Tidak Bisa Mengurangi Lagi!')
    } else{
        i -= 1
        document.querySelector('.ctg-td').lastElementChild.remove()
        if( i == 0 ) {
            document.getElementById('category0').innerHTML +=  `
                <option value="" disabled hidden>disabled</option>
                <option value="" disabled hidden>disabled</option>
                <option value="" disabled hidden>disabled</option>
                <option value="Premier League">Liga / Sepak Bola Inggris</option>`
        }        
    }
}

icoPlus.addEventListener('click', function() {
    addCtg()
})

icoMinus.addEventListener('click', function() {
    removeCtg()
})

// thumbnailTitle.addEventListener('click', function() {
//     alert('Anda Tidak Bisa Mengubah Thumbnail, Thumbnail Otomatis Terisi Saat Anda Mengisi Form Artikel')
// })
// thumbnailTitle.addEventListener('keyup', function() {
//     this.value = tTitles
// })
// document.getElementById('thumbnailImg').addEventListener('click', function() {
//     alert('Anda Tidak Bisa Mengubah Thumbnail, Thumbnail Otomatis Terisi Saat Anda Mengisi Form Artikel')
// })
// document.getElementById('thumbnailImg').addEventListener('keyup', function() {
//     this.value = tImg
// })

window.addEventListener('load', function() {
    if( document.querySelector('.tox .tox-editor-container .tox-sidebar-wrap .tox-edit-area__iframe') == null ) return alert('Tidak Bisa Memuat Text Editor')
    if( document.querySelector('.tox .tox-editor-container .tox-sidebar-wrap .tox-edit-area__iframe').contentWindow.document.body == null ) return null
    // document.body.addEventListener('mouseover', function() {
    //     if( document.querySelector('.tox .tox-editor-container .tox-sidebar-wrap .tox-edit-area__iframe') == null ) return null
    //     thumbnailTitles(getTitles('h1'), getTitles('h2'), getTitles('h3'), getTitles('h4'), getTitles('h5'), getTitles('h6'))
    //     thumbnailImg(document.getElementById('thumbnailImg'), document.querySelector('.tox .tox-editor-container .tox-sidebar-wrap .tox-edit-area__iframe').contentWindow.document.body)
    // })
    // document.body.addEventListener('keyup', function() {
    //     if( document.querySelector('.tox .tox-editor-container .tox-sidebar-wrap .tox-edit-area__iframe') == null ) return null
    //     thumbnailTitles(getTitles('h1'), getTitles('h2'), getTitles('h3'), getTitles('h4'), getTitles('h5'), getTitles('h6'))
    //     thumbnailImg(document.getElementById('thumbnailImg'), document.querySelector('.tox .tox-editor-container .tox-sidebar-wrap .tox-edit-area__iframe').contentWindow.document.body)
    // })
    document.querySelector('.tox .tox-editor-container .tox-sidebar-wrap .tox-edit-area__iframe').contentWindow.document.body.addEventListener('keyup', function(el) {
        if( document.querySelector('.tox .tox-editor-container .tox-sidebar-wrap .tox-edit-area__iframe') == null ) return null
        thumbnailTitles(getTitles('h1'), getTitles('h2'), getTitles('h3'), getTitles('h4'), getTitles('h5'), getTitles('h6'))
        thumbnailImg(document.getElementById('thumbnailImg'), this)
    })
    document.querySelector('.tox .tox-editor-container .tox-sidebar-wrap .tox-edit-area__iframe').contentWindow.document.body.addEventListener('keydown', function(el) {
        if( document.querySelector('.tox .tox-editor-container .tox-sidebar-wrap .tox-edit-area__iframe') == null ) return null
        thumbnailTitles(getTitles('h1'), getTitles('h2'), getTitles('h3'), getTitles('h4'), getTitles('h5'), getTitles('h6'))
        thumbnailImg(document.getElementById('thumbnailImg'), this)
    })
    // document.querySelector('.tox .tox-editor-container .tox-sidebar-wrap .tox-edit-area__iframe').contentWindow.document.body.addEventListener('mouseover', function() {
    //     thumbnailTitles(getTitles('h1'), getTitles('h2'), getTitles('h3'), getTitles('h4'), getTitles('h5'), getTitles('h6'))
    //     thumbnailImg(document.getElementById('thumbnailImg'), this)
    // })
})