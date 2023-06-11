let alpha
let bravo

fetch('/teams-data.json').then(response => response.json()).then(data => {
    data.teams.forEach(x => {
        document.querySelectorAll('.container .content-box .team').forEach(a => {
            a.innerHTML += `<option value="${x.cleanName}" data-team-id="${x.id}">${x.cleanName}</option>`
        })
    })
}).catch(error => {
    alert('Gagal Menyambungkan API')
    console.log(error)
})

fetch('/players-data.json').then(response => response.json()).then(data => {
    document.getElementById('homeTeam').addEventListener('change', function() {
        alpha = ''

        document.querySelectorAll('.container #homeTeam option').forEach(x => {
            if( this.value == x.value ) {

                data.data.forEach(a => {
                    if( x.dataset.teamId == a.club_team_id ) {
                        alpha += `<option value="${a.known_as}">${a.known_as}</option>`
                    }
                })

            }
        })
        document.querySelectorAll('#homeGoalScored').forEach(x => x.innerHTML = alpha)
    })

    document.getElementById('awayTeam').addEventListener('change', function() {
        bravo = ''

        document.querySelectorAll('.container #awayTeam option').forEach(x => {
            if( this.value == x.value ) {

                data.data.forEach(a => {
                    if( x.dataset.teamId == a.club_team_id ) {
                        bravo += `<option value="${a.known_as}">${a.known_as}</option>`
                    }
                })

            }
        })
        document.querySelectorAll('#awayGoalScored').forEach(x => x.innerHTML = bravo)
    })
}).catch(error => {
    alert('Gagal Menyambungkan API')
    console.log(error)
})

document.getElementById('homeScore').addEventListener('keyup', function() {
    if(this.value > 0) {
        document.getElementById('homeGoalScoredLabel').innerHTML = '<label for="homeGoalScored">Pencetak Goal:</label><br>'

        for( let ii = 0; ii < this.value; ii++ ) {
            document.getElementById('homeGoalScoredLabel').innerHTML += `
                <select name="homeGoalScored" id="homeGoalScored">
                    <option value="" hidden id="sign">Pencetak Goal ${ii+1}</option>
                </select>
            `
        }

        document.querySelectorAll('#homeGoalScored').forEach(x => x.innerHTML = alpha)
    } else document.querySelector('.container .content-box #homeGoalScoredLabel').childNodes.forEach(a => a.remove())
})

///////////////////////

document.getElementById('homeScore').addEventListener('change', function() {
    if(this.value > 0) {
        document.getElementById('homeGoalScoredLabel').innerHTML = '<label for="homeGoalScored">Pencetak Goal:</label><br>'

        for( let ii = 0; ii < this.value; ii++ ) {
            document.getElementById('homeGoalScoredLabel').innerHTML += `
                <select name="homeGoalScored" id="homeGoalScored">
                    <option value="" hidden id="sign">Pencetak Goal ${ii+1}</option>
                </select>
            `
        }

        document.querySelectorAll('#homeGoalScored').forEach(x => x.innerHTML = alpha)
    } else document.querySelector('.container .content-box #homeGoalScoredLabel').childNodes.forEach(a => a.remove())
})

/////////////////////////

document.getElementById('awayScore').addEventListener('keyup', function() {
    if(this.value > 0) {
        document.getElementById('awayGoalScoredLabel').innerHTML = '<label for="awayGoalScored">Pencetak Goal:</label><br>'

        for( let ii = 0; ii < this.value; ii++ ) {
            document.getElementById('awayGoalScoredLabel').innerHTML += `
                <select name="awayGoalScored" id="awayGoalScored">
                    <option value="" hidden id="sign">Pencetak Goal ${ii+1}</option>
                </select>
            `
        }

        document.querySelectorAll('#awayGoalScored').forEach(x => x.innerHTML = bravo)
    } else document.querySelector('.container .content-box #awayGoalScoredLabel').childNodes.forEach(a => a.remove())
})

document.getElementById('awayScore').addEventListener('change', function() {
    if(this.value > 0) {
        document.getElementById('awayGoalScoredLabel').innerHTML = '<label for="awayGoalScored">Pencetak Goal:</label><br>'

        for( let ii = 0; ii < this.value; ii++ ) {
            document.getElementById('awayGoalScoredLabel').innerHTML += `
                <select name="awayGoalScored" id="awayGoalScored">
                    <option value="" hidden id="sign">Pencetak Goal ${ii+1}</option>
                </select>
            `
        }

        document.querySelectorAll('#awayGoalScored').forEach(x => x.innerHTML = bravo)
    } else document.querySelector('.container .content-box #awayGoalScoredLabel').childNodes.forEach(a => a.remove())
})