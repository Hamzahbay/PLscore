async function fetching() {
    await fetch('/teams-data.json').finally().then(response => response.json()).then(data => {
        if( document.documentURI.split('/').pop() == 'ts' ) {
            document.body.querySelector('.container .titles h2').innerText = 'Top Skor Liga Inggris'
            return
        }
        if( document.documentURI.split('/').pop() == 'ta' ) {
            document.body.querySelector('.container .titles h2').innerText = 'Top Assist Liga Inggris'
            return
        }
        if( document.documentURI.split('/').pop() == 'tcs' ) {
            document.body.querySelector('.container .titles h2').innerText = 'Top Cleansheets Liga Inggris'
            return
        }
        if( document.documentURI.split('/').pop() == 'tyc' ) {
            document.body.querySelector('.container .titles h2').innerText = 'Top Kartu Kuning'
            return
        }
        if( document.documentURI.split('/').pop() == 'trc' ) {
            document.body.querySelector('.container .titles h2').innerText = 'Top Kartu Merah'
            return
        }
        if( document.documentURI.split('/').pop() == 'bf' ) {
            document.body.querySelector('.container .titles h2').innerText = 'Penyerang Terbaik'
            return
        }
        if( document.documentURI.split('/').pop() == 'bm' ) {
            document.body.querySelector('.container .titles h2').innerText = 'Gelandang / Playmaker Terbaik'
            return
        }
        if( document.documentURI.split('/').pop() == 'bd' ) {
            document.body.querySelector('.container .titles h2').innerText = 'Defender Terbaik'
            return
        }
        data.teams.forEach(x => {
            if( x.id == document.documentURI.split('/').pop() ) {
                document.body.querySelector('.container .titles h2').innerText = x.cleanName
            }
        })
    }).catch(error => {
        alert('Gagal Menghubungkam API!!!')
        console.log(error)
    })
    
    await fetch('/players-data.json').finally().then(response => response.json()).then(data => {
        document.getElementById('loading').remove()
        document.querySelector('.container .content-box').classList.remove('display-none')
        let alp = ''

        function uncap(string) {
            return string.charAt(0).toLowerCase() + string.slice(1)
        }

        if( document.documentURI.split('/').pop() == 'ts' ) {
            data.data.sort((a, b) => a.goals_overall - b.goals_overall)
            data.data.reverse()

            data.data.forEach(x => {
                if( x.goals_overall > 0 ) {
                    let getLow = 
                    x.nationality.replace(/(^|\s)\S/g, l => l.toLowerCase()).replace( /\r\n/g, '').replace(/^\s+|\s+$/, '').replace(/[^a-zA-Z\d ]/g, '').replace(/\s+$/, '').toLowerCase()
        
                    let www = ''
                    getLow.split(' ').forEach(a => www += a + '-')
    
                    alp += `
                    <div class="box" data-player-id="${x.id}" onclick="location.href = '/spec/${x.club_team_id}/${x.id}'">
                        <table>
                            <tr>
                                <td style="width: 30%;">
                                    <img src="https://cdn.footystats.org/img/players/${www}${x.shorthand}.png">
                                </td>
                                <td class="name">
                                    ${x.known_as}
                                </td>
                                <td class="count">
                                    ${x.goals_overall}
                                </td>
                            </tr>
                        </table>
                    </div>
                    <i class="material-icons unf">favorite_border</i>
                    <i class="material-icons fav display-none">favorite</i>
                    `
                }
            })
            
            document.body.querySelector('.container .content-box').innerHTML = alp

            return
        }

        if( document.documentURI.split('/').pop() == 'ta' ) {
            data.data.sort((a, b) => a.assists_overall - b.assists_overall)
            data.data.reverse()

            data.data.forEach(x => {
                if( x.assists_overall > 0 ) {
                    let getLow = 
                    x.nationality.replace(/(^|\s)\S/g, l => l.toLowerCase()).replace( /\r\n/g, '').replace(/^\s+|\s+$/, '').replace(/[^a-zA-Z\d ]/g, '').replace(/\s+$/, '').toLowerCase()
        
                    let www = ''
                    getLow.split(' ').forEach(a => www += a + '-')
    
                    alp += `
                    <div class="box" data-player-id="${x.id}" onclick="location.href = '/spec/${x.club_team_id}/${x.id}'">
                        <table>
                            <tr>
                                <td style="width: 30%;">
                                    <img src="https://cdn.footystats.org/img/players/${www}${x.shorthand}.png">
                                </td>
                                <td class="name">
                                    ${x.known_as}
                                </td>
                                <td class="count">
                                    ${x.assists_overall}
                                </td>
                            </tr>
                        </table>
                    </div>
                    <i class="material-icons unf">favorite_border</i>
                    <i class="material-icons fav display-none">favorite</i>
                    `
                }
            })
            
            document.body.querySelector('.container .content-box').innerHTML = alp

            return
        }

        if( document.documentURI.split('/').pop() == 'tcs' ) {
            data.data.sort((a, b) => a.clean_sheets_overall - b.clean_sheets_overall)
            data.data.reverse()

            data.data.forEach(x => {
                if( x.clean_sheets_overall > 0 && x.position == 'Goalkeeper' ) {
                    let getLow = 
                    x.nationality.replace(/(^|\s)\S/g, l => l.toLowerCase()).replace( /\r\n/g, '').replace(/^\s+|\s+$/, '').replace(/[^a-zA-Z\d ]/g, '').replace(/\s+$/, '').toLowerCase()
        
                    let www = ''
                    getLow.split(' ').forEach(a => www += a + '-')
    
                    alp += `
                    <div class="box" data-player-id="${x.id}" onclick="location.href = '/spec/${x.club_team_id}/${x.id}'">
                        <table>
                            <tr>
                                <td style="width: 30%;">
                                    <img src="https://cdn.footystats.org/img/players/${www}${x.shorthand}.png">
                                </td>
                                <td class="name">
                                    ${x.known_as}
                                </td>
                                <td class="count">
                                    ${x.clean_sheets_overall}
                                </td>
                            </tr>
                        </table>
                    </div>
                    <i class="material-icons unf">favorite_border</i>
                    <i class="material-icons fav display-none">favorite</i>
                    `
                }
            })
            
            document.body.querySelector('.container .content-box').innerHTML = alp

            return
        }

        if( document.documentURI.split('/').pop() == 'tyc' ) {
            data.data.sort((a, b) => a.yellow_cards_overall - b.yellow_cards_overall)
            data.data.reverse()

            data.data.forEach(x => {
                if( x.yellow_cards_overall > 0 ) {
                    let getLow = 
                    x.nationality.replace(/(^|\s)\S/g, l => l.toLowerCase()).replace( /\r\n/g, '').replace(/^\s+|\s+$/, '').replace(/[^a-zA-Z\d ]/g, '').replace(/\s+$/, '').toLowerCase()
        
                    let www = ''
                    getLow.split(' ').forEach(a => www += a + '-')
    
                    alp += `
                    <div class="box" data-player-id="${x.id}" onclick="location.href = '/spec/${x.club_team_id}/${x.id}'">
                        <table>
                            <tr>
                                <td style="width: 30%;">
                                    <img src="https://cdn.footystats.org/img/players/${www}${x.shorthand}.png">
                                </td>
                                <td class="name">
                                    ${x.known_as}
                                </td>
                                <td class="count">
                                    ${x.yellow_cards_overall}
                                </td>
                            </tr>
                        </table>
                    </div>
                    <i class="material-icons unf">favorite_border</i>
                    <i class="material-icons fav display-none">favorite</i>
                    `
                }
            })
            
            document.body.querySelector('.container .content-box').innerHTML = alp

            return
        }

        if( document.documentURI.split('/').pop() == 'trc' ) {
            data.data.sort((a, b) => a.red_cards_overall - b.red_cards_overall)
            data.data.reverse()

            data.data.forEach(x => {
                if( x.red_cards_overall > 0 ) {
                    let getLow = 
                    x.nationality.replace(/(^|\s)\S/g, l => l.toLowerCase()).replace( /\r\n/g, '').replace(/^\s+|\s+$/, '').replace(/[^a-zA-Z\d ]/g, '').replace(/\s+$/, '').toLowerCase()
        
                    let www = ''
                    getLow.split(' ').forEach(a => www += a + '-')
    
                    alp += `
                    <div class="box" data-player-id="${x.id}" onclick="location.href = '/spec/${x.club_team_id}/${x.id}'">
                        <table>
                            <tr>
                                <td style="width: 30%;">
                                    <img src="https://cdn.footystats.org/img/players/${www}${x.shorthand}.png">
                                </td>
                                <td class="name">
                                    ${x.known_as}
                                </td>
                                <td class="count">
                                    ${x.red_cards_overall}
                                </td>
                            </tr>
                        </table>
                    </div>
                    <i class="material-icons unf">favorite_border</i>
                    <i class="material-icons fav display-none">favorite</i>
                    `
                }
            })
            
            document.body.querySelector('.container .content-box').innerHTML = alp

            return
        }

        if( document.documentURI.split('/').pop() == 'bf' ) {
            data.data.sort((a, b) => a.rank_in_league_top_attackers - b.rank_in_league_top_attackers)
            // data.data.reverse()

            data.data.forEach(x => {
                if( x.rank_in_league_top_attackers > 0 && x.position == 'Forward' ) {
                    let getLow = 
                    x.nationality.replace(/(^|\s)\S/g, l => l.toLowerCase()).replace( /\r\n/g, '').replace(/^\s+|\s+$/, '').replace(/[^a-zA-Z\d ]/g, '').replace(/\s+$/, '').toLowerCase()
        
                    let www = ''
                    getLow.split(' ').forEach(a => www += a + '-')
    
                    alp += `
                    <div class="box" data-player-id="${x.id}" onclick="location.href = '/spec/${x.club_team_id}/${x.id}'">
                        <table>
                            <tr>
                                <td style="width: 30%;">
                                    <img src="https://cdn.footystats.org/img/players/${www}${x.shorthand}.png">
                                </td>
                                <td class="name">
                                    ${x.known_as}
                                </td>
                                <td class="count">
                                    ${x.rank_in_league_top_attackers}
                                </td>
                            </tr>
                        </table>
                    </div>
                    <i class="material-icons unf">favorite_border</i>
                    <i class="material-icons fav display-none">favorite</i>
                    `
                }
            })
            
            document.body.querySelector('.container .content-box').innerHTML = alp

            return
        }

        if( document.documentURI.split('/').pop() == 'bm' ) {
            data.data.sort((a, b) => a.rank_in_league_top_midfielders - b.rank_in_league_top_midfielders)
            // data.data.reverse()

            data.data.forEach(x => {
                if( x.rank_in_league_top_midfielders > 0 && x.position == 'Midfielder' ) {
                    let getLow = 
                    x.nationality.replace(/(^|\s)\S/g, l => l.toLowerCase()).replace( /\r\n/g, '').replace(/^\s+|\s+$/, '').replace(/[^a-zA-Z\d ]/g, '').replace(/\s+$/, '').toLowerCase()
        
                    let www = ''
                    getLow.split(' ').forEach(a => www += a + '-')
    
                    alp += `
                    <div class="box" data-player-id="${x.id}" onclick="location.href = '/spec/${x.club_team_id}/${x.id}'">
                        <table>
                            <tr>
                                <td style="width: 30%;">
                                    <img src="https://cdn.footystats.org/img/players/${www}${x.shorthand}.png">
                                </td>
                                <td class="name">
                                    ${x.known_as}
                                </td>
                                <td class="count">
                                    ${x.rank_in_league_top_midfielders}
                                </td>
                            </tr>
                        </table>
                    </div>
                    <i class="material-icons unf">favorite_border</i>
                    <i class="material-icons fav display-none">favorite</i>
                    `
                }
            })
            
            document.body.querySelector('.container .content-box').innerHTML = alp

            return
        }

        if( document.documentURI.split('/').pop() == 'bd' ) {
            data.data.sort((a, b) => a.rank_in_league_top_defenders - b.rank_in_league_top_defenders)
            // data.data.reverse()

            data.data.forEach(x => {
                if( x.rank_in_league_top_defenders > 0 && x.position == 'Defender' ) {
                    let getLow = 
                    x.nationality.replace(/(^|\s)\S/g, l => l.toLowerCase()).replace( /\r\n/g, '').replace(/^\s+|\s+$/, '').replace(/[^a-zA-Z\d ]/g, '').replace(/\s+$/, '').toLowerCase()
        
                    let www = ''
                    getLow.split(' ').forEach(a => www += a + '-')
    
                    alp += `
                    <div class="box" data-player-id="${x.id}" onclick="location.href = '/spec/${x.club_team_id}/${x.id}'">
                        <table>
                            <tr>
                                <td style="width: 30%;">
                                    <img src="https://cdn.footystats.org/img/players/${www}${x.shorthand}.png">
                                </td>
                                <td class="name">
                                    ${x.known_as}
                                </td>
                                <td class="count">
                                    ${x.rank_in_league_top_defenders}
                                </td>
                            </tr>
                        </table>
                    </div>
                    <i class="material-icons unf">favorite_border</i>
                    <i class="material-icons fav display-none">favorite</i>
                    `
                }
            })
            
            document.body.querySelector('.container .content-box').innerHTML = alp

            return
        }

        data.data.forEach(x => {
            if( x.club_team_id == document.documentURI.split('/').pop() ) {
                function uncap(string) {
                    return string.charAt(0).toLowerCase() + string.slice(1)
                }
    
                let getLow = 
                x.nationality.replace(/(^|\s)\S/g, l => l.toLowerCase()).replace( /\r\n/g, '').replace(/^\s+|\s+$/, '').replace(/[^a-zA-Z\d ]/g, '').replace(/\s+$/, '').toLowerCase()
    
                let www = ''
                getLow.split(' ').forEach(a => www += a + '-')
    
                if( x.position == 'Goalkeeper' ) {
                    document.body.querySelector('.container .content-box .gk .ctn').innerHTML += `
                    <div class="box" data-player-id="${x.id}" onclick="location.href = '/spec/${x.club_team_id}/${x.id}'">
                        <table>
                            <tr>
                                <td style="width: 30%;">
                                    <img src="https://cdn.footystats.org/img/players/${www}${x.shorthand}.png">
                                </td>
                                <td class="name">
                                    ${x.known_as}
                                </td>
                                <td class="count">
                                    ${x.nationality}
                                </td>
                            </tr>
                        </table>
                    </div>
                    <i class="material-icons unf">favorite_border</i>
                    <i class="material-icons fav display-none">favorite</i>
                    `
                }
                if( x.position == 'Defender' ) {
                    document.body.querySelector('.container .content-box .df .ctn').innerHTML += `
                    <div class="box" data-player-id="${x.id}" onclick="location.href = '/spec/${x.club_team_id}/${x.id}'">
                        <table>
                            <tr>
                                <td style="width: 30%;">
                                    <img src="https://cdn.footystats.org/img/players/${www}${x.shorthand}.png">
                                </td>
                                <td class="name">
                                    ${x.known_as}
                                </td>
                                <td class="count">
                                    ${x.nationality}
                                </td>
                            </tr>
                        </table>
                    </div>
                    <i class="material-icons unf">favorite_border</i>
                    <i class="material-icons fav display-none">favorite</i>
                    `
                }
                if( x.position == 'Midfielder' ) {
                    document.body.querySelector('.container .content-box .mf .ctn').innerHTML += `
                    <div class="box" data-player-id="${x.id}" onclick="location.href = '/spec/${x.club_team_id}/${x.id}'">
                        <table>
                            <tr>
                                <td style="width: 30%;">
                                    <img src="https://cdn.footystats.org/img/players/${www}${x.shorthand}.png">
                                </td>
                                <td class="name">
                                    ${x.known_as}
                                </td>
                                <td class="count">
                                    ${x.nationality}
                                </td>
                            </tr>
                        </table>
                    </div>
                    <i class="material-icons unf">favorite_border</i>
                    <i class="material-icons fav display-none">favorite</i>
                    `
                }
                if( x.position == 'Forward' ) {
                    document.body.querySelector('.container .content-box .fw .ctn').innerHTML += `
                    <div class="box" data-player-id="${x.id}" onclick="location.href = '/spec/${x.club_team_id}/${x.id}'">
                        <table>
                            <tr>
                                <td style="width: 30%;">
                                    <img src="https://cdn.footystats.org/img/players/${www}${x.shorthand}.png">
                                </td>
                                <td class="name">
                                    ${x.known_as}
                                </td>
                                <td class="count">
                                    ${x.nationality}
                                </td>
                            </tr>
                        </table>
                    </div>
                    <i class="material-icons unf">favorite_border</i>
                    <i class="material-icons fav display-none">favorite</i>
                    `
                }
            }
        })
    }).catch(error => {
        alert('Gagal Menghubungkam API!!!')
        console.log(error)
    })

    await fetch('/favouPlayers-data.json').then(response => response.json()).then(data => {
        data.forEach(function(x) {
            document.querySelectorAll('.container .content-box .box').forEach(function(a) {
                if( x.user_id == document.querySelector('.container').dataset.userId && x.player_id == a.dataset.playerId ) {
                    a.nextElementSibling.classList.add('display-none')
                    a.nextElementSibling.nextElementSibling.classList.remove('display-none')
                }
            })
        })
    }).catch(error => {
        alert('Gagal Menghubungkam API!!!')
        console.log(error)
    })
    
    document.querySelectorAll('.container .content-box .box').forEach(x => {
        x.addEventListener('mouseover', function() {
            x.nextElementSibling.style.color = 'white'
            x.nextElementSibling.nextElementSibling.style.color = 'white'
        })
        x.addEventListener('mouseout', function() {
            x.nextElementSibling.style.color = 'darkred'
            x.nextElementSibling.nextElementSibling.style.color = 'darkred'
        })
    })
    document.querySelectorAll('.container .content-box .unf').forEach(x => {
        x.addEventListener('click', function() {
            let data = new URLSearchParams()

            data.append('player_id', this.previousElementSibling.dataset.playerId)
            data.append('fav', 'on')

            fetch(document.documentURI, {
                method: 'POST',
                body: data
            }).then(response => {
                response.json()
            }).then(data => data).catch(error => {
                console.log(error)
            })

            this.classList.add('display-none')
            this.nextElementSibling.classList.remove('display-none')
        })
    })
    document.querySelectorAll('.container .content-box .fav').forEach(x => {
        x.addEventListener('click', function() {
            let data = new URLSearchParams()

            data.append('player_id', this.previousElementSibling.previousElementSibling.dataset.playerId)
            data.append('user_id', document.querySelector('.container').dataset.userId)
            data.append('fav', 'off')

            fetch(document.documentURI, {
                method: 'POST',
                body: data
            }).then(response => {
                response.json()
            }).then(data => data).catch(error => {
                console.log(error)
            })

            this.previousElementSibling.classList.remove('display-none')
            this.classList.add('display-none')
        })
    })
}

fetching()

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

let alpha = document.body.querySelectorAll('.container .loading div')
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