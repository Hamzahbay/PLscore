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

let alpha = document.body.querySelectorAll('.container .content-table .loading div')
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

async function fetching() {
    await fetch('/fixtures/data.json').finally(() => {
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
        
        let alpha = document.body.querySelectorAll('.container .content-table .loading div')
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
    }).then(response => response.json()).then(data => {
        let fix_id = document.documentURI.split('/').pop()
        let alpha = ''
        let bravo = ''
    
        data.data.forEach(x => {
            if( x.id == fix_id ) {
                x.homeGoals.forEach(a => alpha += a + '\' ')
                x.awayGoals.forEach(a => bravo += a + '\' ')
    
                let ming = `
                <tr>
                    <td colspan="2">${alpha}</td>
                    <td class="text-center">Menit Goal</td>
                    <td colspan="2" class="text-right">${bravo}</td>
                </tr>
                `
                if( alpha.length < 1 && bravo.length < 1 ) ming = ''
    
                document.querySelector('.container .content-table').innerHTML = `
                <table data-match-id="${x.id}">
                <thead class="">
                    <tr>
                        <td colspan="5" class="text-center bg-tr-purple white" style="padding: 1% 0; border-radius: 5px 5px 0 0;">
                            Pertandingan Ke-${x.game_week}, ${x.season}
                            <i class="material-icons unf">favorite_border</i>
                            <i class="material-icons fav display-none">favorite</i>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="img"><img src="https://cdn.footystats.org/img/${x.home_image}"></td>
                        <td class="name" style="width: 20%;">
                            ${x.home_name}
                        </td>
                        <td class="v" style="width: 30%; text-align: center;">v</td>
                        <td class="name text-right" style="width: 20%;">
                            ${x.away_name}
                        </td>
                        <td class="img"><img src="https://cdn.footystats.org/img/${x.away_image}"></td>
                    </tr>
                    <tr>
                        <td colspan="2">${x.homeGoalCount}</td>
                        <td class="text-center">Skor</td>
                        <td colspan="2" class="text-right">${x.awayGoalCount}</td>
                    </tr>
                    ${ming}
                    <tr>
                        <td colspan="2">${x.team_a_possession}%</td>
                        <td class="text-center">Penguasaan Bola</td>
                        <td colspan="2" class="text-right">${x.team_b_possession}%</td>
                    </tr>
                    <tr>
                        <td colspan="2">${x.team_a_shotsOffTarget}(${x.team_a_shotsOnTarget})</td>
                        <td class="text-center">Tendangan (Tepat Sasaran)</td>
                        <td colspan="2" class="text-right">${x.team_b_shotsOffTarget}(${x.team_b_shotsOnTarget})</td>
                    </tr>
                    <tr>
                        <td colspan="2">${x.team_a_fouls}(${x.team_a_offsides})</td>
                        <td class="text-center">Pelanggaran (Offside)</td>
                        <td colspan="2" class="text-right">${x.team_b_fouls}(${x.team_b_offsides})</td>
                    </tr>
                    <tr>
                        <td colspan="2">${x.team_a_corners}</td>
                        <td class="text-center">Tendangan Pojok</td>
                        <td colspan="2" class="text-right">${x.team_b_corners}</td>
                    </tr>
                    <tr>
                        <td colspan="2">${x.team_a_yellow_cards}(${x.team_a_red_cards})</td>
                        <td class="text-center">Kartu Kuning (Merah)</td>
                        <td colspan="2" class="text-right">${x.team_b_yellow_cards}(${x.team_b_red_cards})</td>
                    </tr>
                </tbody>
            </table>
                `
            }
        })
    }).catch(error => {
        alert('Gagal Menyambungkan API')
        console.log(error)
    })

    await fetch('/fixtures//favouMatch-data.json').then(response => response.json()).then(data => {
        data.forEach(x => {
            if( x.user_id == document.querySelector('.container').dataset.userId && x.match_id == document.querySelector('.container .content-table table').dataset.matchId ) {
                document.querySelector('.container .content-table table thead tr td .unf').classList.add('display-none')
                document.querySelector('.container .content-table table thead tr td .fav').classList.remove('display-none')
            }
        })
    }).catch(error => {
        alert('Gagal Menghubungkam API!!!')
        console.log(error)
    })

    document.querySelector('.container .content-table table thead tr td .unf').addEventListener('click', function() {
        let data = new URLSearchParams()

        data.append('match_id', document.querySelector('.container .content-table table').dataset.matchId)
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

    document.querySelector('.container .content-table table thead tr td .fav').addEventListener('click', function() {
        let data = new URLSearchParams()

        data.append('match_id', document.querySelector('.container .content-table table').dataset.matchId)
        data.append('fav', 'off')

        fetch(document.documentURI, {
            method: 'POST',
            body: data
        }).then(response => {
            response.json()
        }).then(data => data).catch(error => {
            console.log(error)
        })

        this.classList.add('display-none')
        this.previousElementSibling.classList.remove('display-none')
    })
}

fetching()