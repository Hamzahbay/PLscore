if( document.querySelectorAll('#updateRole').length > 0 ) {
    let alpha
    document.querySelectorAll('#updateRole').forEach(async x => {
        await x.addEventListener('click', function() {
            this.classList.toggle('update-active')

            if( this.classList.contains('update-active') ) {
                alpha = x.parentElement.parentElement.previousElementSibling.innerText
                x.parentElement.parentElement.previousElementSibling.innerHTML = `
                <form id="roleForm">
                    <select name="" id="selectRole">
                        <option value="" hidden>Pilih Hak Akses</option>
                        <option value="admin">admin</option>
                        <option value="writer">penulis</option>
                        <option value="user">user</option>
                    </select>
                </form>
                `
        
                x.parentElement.parentElement.previousElementSibling.firstElementChild.firstElementChild.addEventListener('change', () => {
                    let data = new URLSearchParams()
        
                    data.append('role', x.parentElement.parentElement.previousElementSibling.firstElementChild.firstElementChild.value)
                    data.append('_id', x.parentElement.parentElement.previousElementSibling.dataset.id)
        
                    fetch(document.documentURI, {
                        method: 'POST',
                        body: data
                    }).then(response => {
                        response.json()
                    }).then(data => data).catch(error => {
                        console.log(error)
                    })

                    x.parentElement.parentElement.previousElementSibling.innerHTML = x.parentElement.parentElement.previousElementSibling.firstElementChild.firstElementChild.value
                    this.classList.remove('update-active')
                })
            }
            if( !this.classList.contains('update-active') ) {
                x.parentElement.parentElement.previousElementSibling.innerHTML = alpha
            }
        })
    })
}
if( document.querySelectorAll('#deleteUser').length > 0 ) {
    document.querySelectorAll('#deleteUser').forEach(async x => {
        await x.addEventListener('click', function() {
            let conf = confirm('Apakah Anda Yakin?')

            if( conf == true ) {
                let data = new URLSearchParams()
        
                data.append('delete_id', x.parentElement.parentElement.previousElementSibling.dataset.id)
    
                fetch(document.documentURI, {
                    method: 'POST',
                    body: data
                }).then(response => {
                    response.json()
                }).then(data => data).catch(error => {
                    console.log(error)
                })
                this.parentElement.parentElement.parentElement.remove()
            }
        })
    })
}

if( document.querySelector('.container .second .box') != null ) {
    async function fetching() {
        if( document.querySelector('.container .second .news-writer-box') != null ) {
            await fetch('/news/data.json').finally().then(response => response.json()).then(news => {
                news.reverse()

                for( const m of news ) {
                    if( m.writer_id == document.querySelector('.container').dataset.userId ) {
                        document.querySelector('.container .second .news-writer-box .ibox .content-box').innerHTML += `
                            <div class="cbox" onclick="location.href = '/news/${m.value}'">
                                <table>
                                    <tr>
                                        <td class="img"><img src="${m.imgThumbnail}"></td>
                                        <td class="titles">${m.thumbnail}</td>
                                    </tr>
                                </table>
                            </div>
                        `
                    }
                }

                if( window.innerWidth > 1100 ) {
                    document.querySelectorAll('.container .second .news-writer-box .ibox .content-box .cbox table tr .titles').forEach(x => {
                        minWord(x, 8, 60)
                    })
                }
                if( window.innerWidth <= 1100 ) {
                    document.querySelectorAll('.container .second .news-writer-box .ibox .content-box .cbox table tr .titles').forEach(x => {
                        minWord(x, 7, 55)
                    })
                }
                if( window.innerWidth <= 900 ) {
                    document.querySelectorAll('.container .second .news-writer-box .ibox .content-box .cbox table tr .titles').forEach(x => {
                        minWord(x, 6, 50)
                    })
                }
                if( window.innerWidth <= 600 ) {
                    document.querySelectorAll('.container .second .news-writer-box .ibox .content-box .cbox table tr .titles').forEach(x => {
                        minWord(x, 5, 40)
                    })
                }
                if( window.innerWidth <= 480 ) {
                    document.querySelectorAll('.container .second .news-writer-box .ibox .content-box .cbox table tr .titles').forEach(x => {
                        minWord(x, 4, 30)
                    })
                }
                if( window.innerWidth <= 400 ) {
                    document.querySelectorAll('.container .second .news-writer-box .ibox .content-box .cbox table tr .titles').forEach(x => {
                        minWord(x, 3, 20)
                    })
                }
            }).catch(error => {
                alert('Gagal Menyambungkan API!!!')
                return console.log(error)
            })
        }

        await fetch('/news/data.json').finally().then(response => response.json()).then(async news => {
            await fetch('/news/likes-data.json').finally().then(response => response.json()).then(like => {
                // news.reverse()
                like.reverse()

                let value = []

                like.forEach(x => {
                    if( x.user.user_id == document.querySelector('.container').dataset.userId && x.user.like == true ) value.push(x.news.news_value)
                })
                
                value.forEach(x => {
                    for( const m of news ) {
                        if( x == m.value ) {
                            document.querySelector('.container .second .news-box .ibox .content-box').innerHTML += `
                                <div class="cbox" onclick="location.href = '/news/${m.value}'">
                                    <table>
                                        <tr>
                                            <td class="img"><img src="${m.imgThumbnail}"></td>
                                            <td class="titles">${m.thumbnail}</td>
                                        </tr>
                                    </table>
                                </div>
                            `
                        }
                    }
                })

                if( window.innerWidth > 1100 ) {
                    document.querySelectorAll('.container .second .news-box .ibox .content-box .cbox table tr .titles').forEach(x => {
                        minWord(x, 8, 60)
                    })
                }
                if( window.innerWidth <= 1100 ) {
                    document.querySelectorAll('.container .second .news-box .ibox .content-box .cbox table tr .titles').forEach(x => {
                        minWord(x, 7, 55)
                    })
                }
                if( window.innerWidth <= 900 ) {
                    document.querySelectorAll('.container .second .news-box .ibox .content-box .cbox table tr .titles').forEach(x => {
                        minWord(x, 6, 50)
                    })
                }
                if( window.innerWidth <= 600 ) {
                    document.querySelectorAll('.container .second .news-box .ibox .content-box .cbox table tr .titles').forEach(x => {
                        minWord(x, 5, 40)
                    })
                }
                if( window.innerWidth <= 480 ) {
                    document.querySelectorAll('.container .second .news-box .ibox .content-box .cbox table tr .titles').forEach(x => {
                        minWord(x, 4, 30)
                    })
                }
                if( window.innerWidth <= 400 ) {
                    document.querySelectorAll('.container .second .news-box .ibox .content-box .cbox table tr .titles').forEach(x => {
                        minWord(x, 3, 20)
                    })
                }
            }).catch(error => {
                alert('Gagal Menyambungkan API!!!')
                return console.log(error)
            })
        }).catch(error => {
            alert('Gagal Menyambungkan API!!!')
            return console.log(error)
        })

        await fetch('/favouPlayers-data.json').finally().then(response => response.json()).then(async fav => {
            await fetch('/players-data.json').finally().then(response => response.json()).then(pl => {
                let player = pl.data

                fav.reverse()
                // player.reverse()

                let playerId = []

                fav.forEach(x => {
                    if( x.user_id == document.querySelector('.container').dataset.userId ) playerId.push(x.player_id)
                })
                
                for( const m of player ) {
                    playerId.forEach(x => {
                        if( m.id == x ) {
                            let getLow = 
                                m.nationality.replace(/(^|\s)\S/g, l => l.toLowerCase()).replace( /\r\n/g, '').replace(/^\s+|\s+$/, '').replace(/[^a-zA-Z\d ]/g, '').replace(/\s+$/, '').toLowerCase()
                
                            let www = ''
                            getLow.split(' ').forEach(a => www += a + '-')
                            document.querySelector('.container .second .player-box .ibox .content-box').innerHTML += `
                                <div class="cbox" onclick="location.href = '/spec/${m.club_team_id}/${m.id}'">
                                    <table>
                                        <tr>
                                            <td class="img"><img src="https://cdn.footystats.org/img/players/${www}${m.shorthand}.png"></td>
                                            <td class="titles">${m.known_as}</td>
                                        </tr>
                                    </table>
                                </div>
                            `
                        }
                    })
                }
            }).catch(error => {
                alert('Gagal Menyambungkan API!!!')
                return console.log(error)
            })
        }).catch(error => {
            alert('Gagal Menyambungkan API!!!')
            return console.log(error)
        })

        await fetch('/fixtures/favouMatch-data.json').finally().then(response => response.json()).then(async fav => {
            await fetch('/fixtures/data.json').finally().then(response => response.json()).then(fix => {
                let match = fix.data

                fav.reverse()
                // match.reverse()

                let matchId = []

                fav.forEach(x => {
                    if( x.user_id == document.querySelector('.container').dataset.userId ) matchId.push(x.match_id)
                })
                
                for( const m of match ) {
                    matchId.forEach(x => {
                        if( m.id == x ) {
                            document.querySelector('.container .second .fix-box .ibox .content-box').innerHTML += `
                                <div class="cbox" onclick="location.href = '/fixtures/${m.id}'">
                                    <table>
                                        <tr>
                                            <td class="tim1"><img src="https://cdn.footystats.org/img/${m.home_image}"></td>
                                            <td class="v">V</td>
                                            <td class="tim2"><img src="https://cdn.footystats.org/img/${m.away_image}"></td>
                                        </tr>
                                    </table>
                                </div>
                            `
                        }
                    })
                }
            }).catch(error => {
                alert('Gagal Menyambungkan API!!!')
                return console.log(error)
            })
        }).catch(error => {
            alert('Gagal Menyambungkan API!!!')
            return console.log(error)
        })
    }

    fetching()
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