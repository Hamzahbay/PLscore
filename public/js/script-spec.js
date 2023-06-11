fetch('teams-data.json').finally().then(response => response.json()).then(data => {
    document.querySelector('.container .content-box').classList.remove('display-none')
    document.querySelector('.container .loading').remove()
    // data.teams.sort((a, b) => a.table_position - b.table_position)

    data.teams.forEach(x => {
        document.body.querySelector('.container .content-box').innerHTML += `
        <div class="box" onclick="location.href = '/spec/${x.id}'">
            <table>
                <thead>
                    <tr>
                        <td>${x.cleanName}</td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><img src="${x.image}" alt=""></td>
                    </tr>
                </tbody>
            </table>
        </div>
        `
    })
    
    document.querySelectorAll('.container .content-box .box').forEach(x => {
        x.addEventListener('mouseover', function() {
            let aaa = x.firstElementChild.lastElementChild.firstElementChild.firstElementChild.firstElementChild

            aaa.style.transform = 'scale(.8)'
        })
        x.addEventListener('mouseout', function() {
            let aaa = x.firstElementChild.lastElementChild.firstElementChild.firstElementChild.firstElementChild

            aaa.style.transform = 'scale(1)'
        })
    })

    document.getElementById('table').addEventListener('click', function() {
        document.body.querySelector('.container .content-box').classList.toggle('display-none')
        document.body.querySelector('.container .content-table').classList.toggle('display-none')
        this.classList.toggle('table')

        if( this.classList.contains('table') ) {
            this.innerText = 'Daftar Tim'

            data.teams.sort((a, b) => a.table_position - b.table_position)

            data.teams.forEach(x => {
                let alpha = ''
                let aa = `${x.stats.seasonGoals_overall / x.stats.seasonMatchesPlayed_overall}`

                if( aa.length > 4 ) {
                    for( let ii = 0; ii < 4; ii++ ) {
                        alpha += aa.split('')[ii]
                    }
                }
                if( aa.length < 4 ) alpha = aa

                document.body.querySelector('.container .content-table table tbody').innerHTML += `
                <tr>
                    <td class="pos">${x.table_position}</td>
                    <td class="img tim" data-link-teams="/spec/${x.id}"><img src="${x.image}"></td>
                    <td class="name tim" data-link-teams="/spec/${x.id}">${x.cleanName}</td>
                    <td class="t-items">${x.stats.seasonMatchesPlayed_overall}</td>
                    <td class="t-items">${x.stats.seasonWinsNum_overall}</td>
                    <td class="t-items">${x.stats.seasonDrawsNum_overall}</td>
                    <td class="t-items">${x.stats.seasonLossesNum_overall}</td>
                    <td class="t-items" style="color: darkgreen;">${x.stats.seasonGoals_overall}</td>
                    <td class="t-items" style="color: darkred;">${x.stats.seasonConceded_overall}</td>
                    <td class="t-items">${x.stats.seasonGoals_overall - x.stats.seasonConceded_overall}</td>
                    <td class="t-items">${alpha}</td>
                    <td class="t-items">${(x.stats.seasonWinsNum_overall * 3) + x.stats.seasonDrawsNum_overall}</td>
                    <td class="t-items">${x.stats.seasonPPG_overall}</td>
                </tr>
                `
            })

            document.querySelectorAll('.container .content-table table tbody tr .tim').forEach(x => {
                x.addEventListener('click', function() {
                    return location.href = this.dataset.linkTeams
                })
            })

            if( document.body.clientWidth <= 600 ) {
                document.querySelector('.container .content-table table thead tr').lastElementChild.previousElementSibling.previousElementSibling.remove()
                document.querySelector('.container .content-table table thead tr').lastElementChild.remove()
                document.querySelectorAll('.container .content-table table tbody tr').forEach(x => {
                    x.lastElementChild.previousElementSibling.previousElementSibling.remove()
                    x.lastElementChild.remove()
                })
            }

            for( let ii = 0; ii < 4; ii++ ) {
                document.querySelectorAll('.container .content-table table tbody tr .pos')[ii].style.background = 'rgba(45, 140, 80, 0.9)'
                document.querySelectorAll('.container .content-table table tbody tr .pos')[ii].style.color = 'whitesmoke'
                document.querySelectorAll('.container .content-table table tbody tr .pos')[ii].style.borderRadius = '5px'
            }

            for( let ii = 17; ii < 20; ii++ ) {
                document.querySelectorAll('.container .content-table table tbody tr .pos')[ii].style.background = '#ff2f28dd'
                document.querySelectorAll('.container .content-table table tbody tr .pos')[ii].style.color = 'whitesmoke'
                document.querySelectorAll('.container .content-table table tbody tr .pos')[ii].style.borderRadius = '5px'
            }

            document.querySelectorAll('.container .content-table table tbody tr .pos')[4].style.background = 'rgba(45, 140, 80, 0.6)'
            document.querySelectorAll('.container .content-table table tbody tr .pos')[4].style.color = 'whitesmoke'
            document.querySelectorAll('.container .content-table table tbody tr .pos')[4].style.borderRadius = '5px'

            document.querySelectorAll('.container .content-table table tbody tr .pos')[5].style.background = 'rgba(45, 140, 80, 0.4)'
            document.querySelectorAll('.container .content-table table tbody tr .pos')[5].style.color = 'whitesmoke'
            document.querySelectorAll('.container .content-table table tbody tr .pos')[5].style.borderRadius = '5px'
        }
        if( !this.classList.contains('table') ) {
            this.innerText = 'Klasemen'

            data.teams.forEach(x => {
                document.body.querySelector('.container .content-box').innerHTML += `
                <div class="box" onclick="location.href = '/spec/${x.id}'">
                    <table>
                        <thead>
                            <tr>
                                <td>${x.cleanName}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><img src="${x.image}" alt=""></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                `
            })
        }
    })
}).catch(error => {
    alert('Gagal Menghubungkam API!!!')
    console.log(error)
})

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