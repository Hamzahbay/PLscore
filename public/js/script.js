//Navbar
document.querySelector('.navbar .material-icons').addEventListener('click', function() {
    document.querySelector('.navbar .for-js').classList.toggle('nav-menu')
})

//alert-box
if( document.querySelector('.desc-alert') != null ) {
    for( const m of document.querySelectorAll('.desc-alert .error-box div span i strong') ) {
        m.addEventListener('click', function() {
            m.parentNode.parentNode.parentNode.parentNode.remove()
        })
    }
    for( const m of document.querySelectorAll('.desc-alert .error-box div') ) {
        if( m.firstChild.nodeValue == "\n                    Missing credentials\n                    " ) {
            m.parentNode.remove()
        }
    }
}

if( document.querySelector('.loading') != null ) {
    let iii = 0

    if( document.body.querySelector('.container .news-slideshow .loading div') != null ) {
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
    }

    if( document.body.querySelector('.container .thumbnail-news-box .thumbnail .loading div') != null ) {
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
    }

    if( document.body.querySelector('.container .comment-box .comment-content .loading div') != null ) {
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
    
        let bravo = document.body.querySelectorAll('.container .content-bottom-items .loading div')
        function autoLoad() {
                if( iii < 2 ) {
                    iii++
                    if( iii == 1 ) {
                        loadObj.load1(bravo[0], bravo[1], bravo[2])
                    }
                    if( iii == 2 ) {
                        loadObj.load2(bravo[0], bravo[1], bravo[2])
                    }
                }
                else {
                    iii = 0
                    if( iii == 0 ) {
                        loadObj.load3(bravo[0], bravo[1], bravo[2])
                    }
                }
    
                // console.log(i)
                setTimeout(autoLoad, 350)
          }
          autoLoad()
    }

    if( document.body.querySelector('.container .content-bottom-items .loading div') != null ) {
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
    
        let alpha = document.body.querySelectorAll('.container .comment-box .comment-content .loading div')
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
    }
}