document.querySelector('.container .second .first-cont img').addEventListener('click', function(e) {
    slide(document.querySelectorAll('.container .second .first-cont span')[0], document.querySelectorAll('.container .second .first-cont span')[1], document.querySelector('.container .second .first-cont img'))

})
document.querySelector('.container .second .second-cont img').addEventListener('click', function(e) {
    slide(document.querySelectorAll('.container .second .second-cont span')[0], document.querySelectorAll('.container .second .second-cont span')[1], document.querySelector('.container .second .second-cont img'))
})

document.addEventListener('scroll', function() {
    this.body.querySelector('.title-text1').style.opacity = 1
    this.body.querySelector('.title-text1').style.marginTop = '5%'
    
    if( globalThis.pageYOffset >= 80 ) {
        this.body.querySelector('.title-text').style.opacity = 1
        this.body.querySelector('.title-text').style.marginTop = '-5%'
    }

    if( globalThis.pageYOffset >= 610 && this.body.clientWidth >= 1080 ) {
        document.querySelector('.navbar').classList.add('bg-purple')
        document.querySelector('.navbar .for-js .min-line').classList.add('bg-purple')
    }
    if( globalThis.pageYOffset <= 610 && this.body.clientWidth >= 1080 ) {
        document.querySelector('.navbar').classList.remove('bg-purple')
        document.querySelector('.navbar .for-js .min-line').classList.remove('bg-purple')
    }
    if( globalThis.pageYOffset >= 540 && this.body.clientWidth >= 880 && this.body.clientWidth < 1080 ) {
        document.querySelector('.navbar').classList.add('bg-purple')
        document.querySelector('.navbar .for-js .min-line').classList.add('bg-purple')
    }
    if( globalThis.pageYOffset <= 540 && this.body.clientWidth >= 880 && this.body.clientWidth < 1080 ) {
        document.querySelector('.navbar').classList.remove('bg-purple')
        document.querySelector('.navbar .for-js .min-line').classList.remove('bg-purple')
    }

    if( globalThis.pageYOffset >= 1420 && this.body.clientWidth >= 1100 ) {
        this.body.querySelector('.last').style.opacity = 1
        this.body.querySelector('.last a').style.margin = 0
    }
    if( globalThis.pageYOffset >= 1220 && this.body.clientWidth >= 1000 ) {
        this.body.querySelector('.last').style.opacity = 1
        this.body.querySelector('.last a').style.margin = 0
    }
    if( globalThis.pageYOffset >= 1120 && this.body.clientWidth >= 900 ) {
        this.body.querySelector('.last').style.opacity = 1
        this.body.querySelector('.last a').style.margin = 0
    }
})

const slide = (doc0, doc1, target) => {
    target.classList.toggle('img-mouseover')
    doc0.classList.toggle('display-none')
    doc1.classList.toggle('display-none')

    setTimeout(function() {
        doc0.classList.toggle('opac-10')
        doc0.classList.toggle('opac-0')
        doc1.classList.toggle('opac-10')
        doc1.classList.toggle('opac-0')
    }, 800)
    setTimeout(function() {
        doc0.classList.toggle('white')
        doc0.classList.toggle('lightgray')
        doc1.classList.toggle('white')
        doc1.classList.toggle('lightgray')
    }, 1000)

}
setInterval(function() {
    slide(document.querySelectorAll('.container .second .first-cont span')[0], document.querySelectorAll('.container .second .first-cont span')[1], document.querySelector('.container .second .first-cont img'))
    slide(document.querySelectorAll('.container .second .second-cont span')[0], document.querySelectorAll('.container .second .second-cont span')[1], document.querySelector('.container .second .second-cont img'))
}, 6000)