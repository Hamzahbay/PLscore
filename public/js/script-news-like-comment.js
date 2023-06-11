const sentiment = document.body.querySelector('.container .content-bottom-items .sentiment')
const sentimentLike = document.getElementById('likeE')
const sentimentUnlike = document.getElementById('unlikeE')
const percentage = document.getElementById('percentage')
const valuesParams = document.documentURI.split('/').pop()
const scriptJs = document.getElementById('scriptJs')
let updown = document.getElementById('thumbsUpDown')
let likeN = document.getElementById('likeNumber')
let ip
let myIp = ''

/**
 * @param {String[]} appendName
 * @param {Array} appendValue
 */

const ajaxPostSubmission = (appendName , appendValue, requestInfo) => {
    if( !appendName || !appendValue || !requestInfo ) return new Error('Required argument')
    if( typeof appendName != Array || typeof appendValue != Array || typeof requestInfo != String ) {
        return new Error('Unknown type provided in argument')
    }
    if( appendName.length != appendValue.length ) {
        return new Error('Length of the argument doesn\'t match')
    }
    let data = new URLSearchParams()

    for( let i = 0; i <= appendName.length; i++ ) {
        data.append(appendName[i], appendValue[i])
        console.log(`data.append(${appendName[i]}, ${appendValue[i]})`)
    }
    
    fetch(requestInfo, {
        method: 'POST',
        body: data
    }).then(response => response.json()).then(data => data).catch(error => console.log(error))
}

window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection

// let pc = new RTCPeerConnection({ iceServers: [] }), noop = () => {}

// pc.createDataChannel('') //create a bogus data channel
// pc.createOffer(pc.setLocalDescription.bind(pc), noop) //create offer and set local description
// pc.onicecandidate = ice => {
//     let ip = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/.exec(ice.candidate.candidate)[1]
//     console.log('my ip: ' + ip)
//     pc.onicecandidate = noop
// }

const findLocalIp = (logInfo = true) => new Promise((resolve, reject) => {
    if( typeof window.RTCPeerConnection == "undefined" ) {
        return reject('WebRTC not supported in this browser')
    }

    let pc = new RTCPeerConnection()
    let iceServers = []

    pc.createDataChannel('')
    pc.createOffer().then(offer => pc.setLocalDescription(offer)).catch(error => reject(error))

    pc.onicecandidate = event => {
        if( !event || !event.candidate ) {
            // all ice candidates have been sent
            if( iceServers.length == 0 ) return reject('WebRTC disabled or restricted by this browser')
            return resolve(iceServers)
        }

        let parts = event.candidate.candidate.split(' ')
        let [base, cocomponentId, protocol, priority, ip, port,, type, ...attribute] = parts

        // console.log(" candidate: " + base.split(':')[1])
        // // console.log(" component: " + component[componentId - 1])
        // console.log("  protocol: " + protocol)
        // console.log("  priority: " + priority)
        // console.log("        ip: " + ip)
        // console.log("      port: " + port)
        // console.log("      type: " + type)

//         console.log(`
// candidate: ${base.split(':')[1]}
// protocol: ${protocol}
// priority: ${priority}
// ip: ${ip}
// port: ${port}
// type: ${type}
//         `)

        if( attribute.length ) {
            // console.log("attributes: ")
            
            for(let i = 0; i < attribute.length; i += 2) {
                // console.log("> " + attribute[i] + ": " + attribute[i+1])
            }

        }
        myIp += ip + '\\'
        // console.log()
    }
})

// findLocalIp(false)

let handleForm = event => event.preventDefault()

// let thu = likeN.innerText
// let ud = updown.innerText

if( document.getElementById('likeForm') != null ) {
    const likeForm = document.getElementById('likeForm')
    const unlikeForm = document.getElementById('unlikeForm')
    likeForm.style.display = 'none'
    unlikeForm.style.display = 'none'

    function likeSubmission() {
        const likeData = new URLSearchParams()
        likeData.append('like', document.getElementById('like').value)

        fetch(document.documentURI, {
            method: 'POST',
            body: likeData
        }).then(response => {
            response.json()
        }).then(data => {
            console.log(data)
        }).catch(error => {
            console.log(error)
        })
    }
    function unlikeSubmission() {
        const unlikeData = new URLSearchParams()
        unlikeData.append('unlike', document.getElementById('unlike').value)
    
        fetch(document.documentURI, {
            method: 'POST',
            body: unlikeData
        }).then(response => {
            response.json()
        }).then(data => {
            console.log(data)
        }).catch(error => {
            console.log(error)
        })
    }

    likeForm.addEventListener('submit', function(e) {
        handleForm(e)
        likeSubmission()

        if( sentimentUnlike.classList.contains('liked') ) {
            likeN.innerText = parseInt(likeN.innerText) + 1
            updown.innerText = parseInt(updown.innerText) + 0
        } else if( !sentimentLike.classList.contains('liked') ) {
            likeN.innerText = parseInt(likeN.innerText) + 1
            updown.innerText = parseInt(updown.innerText) + 1
        } else if( sentimentLike.classList.contains('liked') ) {
            likeN.innerText = parseInt(likeN.innerText) - 1
            updown.innerText = parseInt(updown.innerText) - 1
        }

        sentimentLike.classList.toggle('liked')
        sentimentUnlike.classList.remove('liked')
        
        // let avaregeNews = avarege(parseInt(updown.innerText), parseInt(likeN.innerText))
        percentage.innerText = avarege(parseInt(updown.innerText), parseInt(likeN.innerText)) + '%'
        if( percentage.innerText == 'NaN%' ) percentage.innerText = '0%'
    })
    unlikeForm.addEventListener('submit', function(e) {
        handleForm(e)
        unlikeSubmission()

        if( sentimentLike.classList.contains('liked') ) {
            likeN.innerText = parseInt(likeN.innerText) - 1
            updown.innerText = parseInt(updown.innerText) + 0
        } else if( !sentimentUnlike.classList.contains('liked') ) {
            likeN.innerText = parseInt(likeN.innerText) + 0
            updown.innerText = parseInt(updown.innerText) + 1
        } else if( sentimentUnlike.classList.contains('liked') ) {
            likeN.innerText = parseInt(likeN.innerText) + 0
            updown.innerText = parseInt(updown.innerText) - 1
        }

        sentimentUnlike.classList.toggle('liked')
        sentimentLike.classList.remove('liked')
        
        percentage.innerText = avarege(parseInt(updown.innerText), parseInt(likeN.innerText)) + '%'
        if( percentage.innerText == 'NaN%' ) percentage.innerText = '0%'
    }) 
}

document.getElementById('likeBtn').parentElement.style.display = 'none'
document.getElementById('unlikeBtn').parentElement.style.display = 'none'

async function viewsPost() {   
    await fetch('https://api.ipify.org?format=json').then(response => response.json()).then(data => ip = data.ip).catch(error => console.log(error))

    const data = new URLSearchParams()
    // console.log(ip)

    if( document.body.querySelector('.navbar .max-line').lastElementChild.innerText == '' ) {
        data.append('actor_ip', ip)
    }

    fetch(document.documentURI, {
        method: "POST",
        body: data
    }).then(response => {
        response.json()
    }).then(data => data).catch(error => {
        console.log(error)
    })
}

viewsPost()
// window.addEventListener('load', function() {
// })

if( document.getElementById('commentForm') != null ) {
    const comment = document.getElementById('commentInput')
    function commnetPost() {
        const commentData = new URLSearchParams()

        let comments = comment.value.split('\n')
        let customComment = ''
        let commentResult = ''

        comments.forEach(x => customComment += x + '\\<br>')

        let twp = customComment.split('\\')
        twp.pop()
        twp.forEach(x => commentResult += x)
        
        commentData.append('comment', commentResult)
        
        fetch(document.documentURI, {
            method: 'POST',
            body: commentData
        }).then(response => {
            response.json()
        }).then(data => data).catch(error => {
            console.log(error)
        })
    }
    
    document.getElementById('commentForm').addEventListener('submit', function(e) {
        handleForm(e)
        commnetPost()
        
        let date
        let time
        
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

        let comments = comment.value.split('\n')
        let customComment = ''
        let commentResult = ''

        comments.forEach(x => customComment += x + '\\<br>')

        let twp = customComment.split('\\')
        twp.pop()
        twp.forEach(x => commentResult += x)
        
        document.body.querySelector('.container .comment-box .comment-content').innerHTML += `
                    <div class="comment-content-box comment-user">
                    <i class="fas fa-trash-alt gray" id="deleteComment" style="cursor: pointer;" onclick="return location.reload()"></i>
                         <em class="font-smaller">
                         ${date}, ${time}
                         </em>
                         <span id="commentator" class="bg-tr-purple white">${document.body.querySelector('.navbar .max-line').lastElementChild.innerText}</span>
                         <p class=" bg-lightgray purple">${commentResult}</p>
                    </div>
         `
        document.body.querySelectorAll('.container .comment-box .comment-content .comment-content-box label i').forEach(x => {
            document.body.querySelectorAll('.container .comment-box .comment-content comment-content-box form').forEach(a => a.remove())

            x.addEventListener('click', function(e) {
                 handleForm(e)
                 location.reload()
             })
         })
        document.getElementById('countComment').innerText = document.body.querySelectorAll('.container .comment-box .comment-content .comment-content-box').length
        comment.value = ''
    })
}

const avarege = (total, number) => Math.round(number / total * 100)

fetch('/news/likes-data.json').finally(() => {
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
    let i = 0
    function autoLoad() {
            if( i < 2 ) {
                i++
                if( i == 1 ) {
                    loadObj.load1(bravo[0], bravo[1], bravo[2])
                }
                if( i == 2 ) {
                    loadObj.load2(bravo[0], bravo[1], bravo[2])
                }
            }
            else {
                i = 0
                if( i == 0 ) {
                    loadObj.load3(bravo[0], bravo[1], bravo[2])
                }
            }

            // console.log(i)
            setTimeout(autoLoad, 350)
      }
      autoLoad()
}).then(response => response.json()).then(like => {
    let likeNumber = []
    let unlikeNumber = []
    let userLikeNewsId = []
    for( const m of like ) {
        if( m.news.news_value == valuesParams && m.user.like == true ) {
            userLikeNewsId.push(m.user.user_id)
            likeNumber.push(m)
        }
        if( m.news.news_value == valuesParams && m.user.like == false ) {
            unlikeNumber.push(m)
        }
        if( m.news.news_value == valuesParams && m.user.user_id == sentiment.dataset.like && m.user.like == true ) {
            sentimentLike.classList.add('liked')
        }
        if( m.news.news_value == valuesParams && m.user.user_id == sentiment.dataset.like && m.user.like == false ) {
            sentimentUnlike.classList.add('liked')
        }
    }
    let total = likeNumber.concat(unlikeNumber)
    let avaregeNews = avarege(total.length, likeNumber.length)
    percentage.innerText = avaregeNews + '%'
    document.getElementById('likeNumber').innerText = likeNumber.length
    document.getElementById('thumbsUpDown').innerText = total.length
    if( percentage.innerText == 'NaN%' ) percentage.innerText = '0%'

}).catch(error => {
    alert('Gagal Memuat Halaman! \n Periksa Koneksi Anda')
    console.log(error)
})

fetch('/news/views-data.json').finally(() => {
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
    let i = 0
    function autoLoad() {
            if( i < 2 ) {
                i++
                if( i == 1 ) {
                    loadObj.load1(bravo[0], bravo[1], bravo[2])
                }
                if( i == 2 ) {
                    loadObj.load2(bravo[0], bravo[1], bravo[2])
                }
            }
            else {
                i = 0
                if( i == 0 ) {
                    loadObj.load3(bravo[0], bravo[1], bravo[2])
                }
            }

            // console.log(i)
            setTimeout(autoLoad, 350)
      }
      autoLoad()
}).then(response => response.json()).then(view => {
    document.querySelector('.container .content-bottom-items .loading').remove()
    document.querySelector('.container .content-bottom-items').classList.remove('text-center')
    document.querySelector('.container .content-bottom-items .sentiment').classList.remove('display-none')
    document.querySelector('.container .content-bottom-items .desc-sentiment').classList.remove('display-none')

    let viewOfThisNews = []
    for( const m of view ) {
        if( m.news.news_value == valuesParams ) {
            viewOfThisNews.push(m)
        }
    }
    document.getElementById('views').innerText = viewOfThisNews.length
}).catch(error => {
    alert('Gagal Memuat Halaman! \nPeriksa Koneksi Anda')
    console.log(error)
})

fetch('/news/comments-data.json').finally(() => {
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
}).then(response => response.json()).then(comment => {
    if( document.getElementById('commentFloor') != null )
        document.getElementById('commentFloor').classList.remove('display-none')

    let commentOfThisNews = []
    let commentContent = ''
    for( const m of comment ) {
        if(  m.news.news_value == valuesParams ) {
            commentOfThisNews.push(m)
        }
    }

    let totalComment = commentOfThisNews.length
    document.getElementById('countComment').innerText = totalComment

    fetch('/users-data.json').finally().then(response => response.json()).then(user => {
        let a = 0
        let us = []
        let indexData = []

        user.forEach(x => {
            us.push(x.user_id)
        })

        us.forEach(x => {
            indexData.push(user.findIndex(obj => obj.user_id == x))
        })
        // console.log(indexData)

        for( const m of commentOfThisNews ) {
            if( user.findIndex(obj => obj.user_id == m.user.user_id) != -1 ) {
                user.forEach(x => {
                    if( m.user.user_id == x.user_id ) {
                        if( m.user.user_id == document.querySelector('.container .comment-box .comment-content').dataset.userId ) {
                            a++
                            commentContent += `
                            <div class="comment-content-box comment-user">
                                <label for="submitDeleteComment${a}">
                                    <i class="fas fa-trash-alt gray" id="deleteComment" style="cursor: pointer;"></i> 
                                </label>
                                <form id="formDeleteComment${a}" class="formDeleteComment display-none">
                                    <input type="checkbox" value="${m._id}" id="checkboxComment${a}" checked>
                                    <input type="submit" value="delete" id="submitDeleteComment${a}">
                                </form>
                                <em class="font-smaller">
                                ${m.date}, ${m.time}
                                </em>
                                <span id="commentator" class="bg-tr-purple white">${x.username}</span>
                                <p class=" bg-lightgray purple">${m.user.comment}</p>
                            </div>
    
                            `
                        }
                        if( m.user.user_id != document.querySelector('.container .comment-box .comment-content').dataset.userId ) {
                            commentContent += `
                            <div class="comment-content-box">
                                <span id="commentator" class="bg-tr-purple white">${x.username}</span>
                                <em class="font-smaller">
                                ${m.date}, ${m.time}
                                </em>
                                <p class=" bg-lightgray purple" style="overflow-x: auto;">${m.user.comment}</p>
                            </div>
    
                            `
                        }
                    }
                })
            }
            if( user.findIndex(obj => obj.user_id == m.user.user_id) == -1 ) {
                commentContent += `
                            <div class="comment-content-box">
                                <span id="commentator" class="bg-tr-purple white">User Telah Dihapus</span>
                                <em class="font-smaller">
                                ${m.date}, ${m.time}
                                </em>
                                <p class=" bg-lightgray purple" style="overflow-x: auto;">${m.user.comment}</p>
                            </div>
    
                            `
            }
        }
        
        document.body.querySelector('.container .comment-box .comment-content').innerHTML = commentContent

        if(  document.getElementById('formDeleteComment') != null ) {
            document.getElementById('formDeleteComment').style.display = 'none'
        }

        if( document.querySelector('.container .comment-box .comment-content').clientHeight >= 420 ) {
            document.querySelector('.container .comment-box .comment-content').style.height = '25rem'
        }
        
        if( document.getElementById('formDeleteComment1') != null ) {
            let b = 0
            document.querySelectorAll('.container .comment-box .comment-content .comment-content-box .formDeleteComment').forEach(x => {
                b++
                
                x.addEventListener('submit', function(e) {
                    function deleteComment() {
                        const del = new URLSearchParams()
                        
                        del.append('delCom', x.firstElementChild.value)
                        
                        fetch(document.documentURI, {
                            method: 'POST',
                            body: del
                        }).then(response => {
                            response.json()
                        }).then(data => data).catch(error => {
                            console.log(error)
                        })
                    }
                    handleForm(e)
    
                    deleteComment()
                    this.parentElement.remove()
                    document.getElementById('countComment').innerText = document.body.querySelectorAll('.container .comment-box .comment-content .comment-content-box').length
                })
            })
        }
    }).catch(error => {
        alert('Gagal Memuat Halaman! \nPeriksa Koneksi Anda')
        console.log(error)
    })
}).catch(error => {
    alert('Gagal Memuat Halaman! \nPeriksa Koneksi Anda')
    console.log(error)
})

// $(function(){
//     $.ajaxSetup ({
//         cache: false
//     })

//     $("#likeForm").submit(function(){
//         $("body").load(document.documentURI)
//     })
//     $("#unlikeForm").submit(function(){
//         $("body").load(document.documentURI)
//     })
//     $("#commentForm").submit(function(){
//         $("body").load(document.documentURI)
//     })
//     $("#formDeleteComment").submit(function(){
//         $("body").load(document.documentURI)
//     })
// })