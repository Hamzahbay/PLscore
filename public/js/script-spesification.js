fetch('/json/PLdata-teams.json').then(response => response.json()).then(response => {
    document.querySelector('.loading').classList.add('display-none')
    document.querySelector('.draft').classList.remove('display-none')
    const teams = response.data
    let draft = ''
    teams.forEach(m => {
        draft += `<div class="teams" data-tid="${m.id}" data-tname="${m.cleanName}"><div class="card-teams"><div>${m.cleanName}</div><img src="${m.image}" name="image"></div></div>`
    })
    document.querySelector('.draft .PLteams').innerHTML = draft

    document.querySelectorAll('.draft .teams').forEach(cards => {
        cards.addEventListener('click', function() {
            document.querySelector('.column-detail-position').innerHTML = `Posisi`
            document.querySelector('.players-index').classList.remove('display-none')
            document.querySelector('.draft').classList.add('display-none')
            document.querySelectorAll('h2')[0].classList.add('display-none')
            document.querySelectorAll('h2')[1].classList.remove('display-none')
            document.querySelector('.sticky-backward').classList.remove('display-none')
            let teamId = this.dataset.tid
            let teamName = this.dataset.tname
            document.querySelector('.details-title strong').innerHTML = teamName
            document.querySelector('.players-index .back').addEventListener('click', () => {
                document.querySelector('.players-index').classList.add('display-none')
                document.querySelector('.draft').classList.remove('display-none')
                document.querySelectorAll('h2')[0].classList.remove('display-none')
                document.querySelectorAll('h2')[1].classList.add('display-none')
                document.querySelector('.sticky-backward').classList.add('display-none')
            })
            document.querySelector('.sticky-backward').addEventListener('click', () => {
                document.querySelector('.players-index').classList.add('display-none')
                document.querySelector('.draft').classList.remove('display-none')
                document.querySelectorAll('h2')[0].classList.remove('display-none')
                document.querySelectorAll('h2')[1].classList.add('display-none')
                document.querySelector('.sticky-backward').classList.add('display-none')
            })
            // console.log(teamId)
            // console.log(teamName)
            fetch('/json/PLdata-players.json').then(response => response.json()).then(response => {
                document.querySelector('.loading').classList.add('display-none')
        
                const players = response.data
                // console.log(players)
                let playersIndex = ''
                let playersIndexDetails = ''
                for (const m of players) {
                    // let arr = [m.club_team_id]
                    // let clubTarget = arr.filter( x => x == teamId)
                    // console.log(clubTarget)
                    if ( m.club_team_id == teamId ) {
                        if ( m.position == "Goalkeeper" ) m.position = "Penjaga Gawang"
                        else if ( m.position == "Defender" ) m.position = "Pemain Bertahan"
                        else if ( m.position == "Midfielder" ) m.position = "Gelandang"
                        else if ( m.position == "Forward" ) m.position = "Penyerang"
                        playersIndex += `<tr data-pid="${m.id}"><td> ${m.known_as}</td><td align="center">${m.position}</td></tr>`
                        document.querySelector('.players-index .details table tbody').innerHTML = playersIndex
                        for (const y of document.querySelectorAll('.players-index .details table tbody tr')) {
                            y.addEventListener('click', function() {
                                document.querySelector('.players-index .details-click').classList.remove('display-none')
                                document.querySelector('.bg-disabled').classList.remove('display-none')
                                document.querySelector('.players-index .details-click span').addEventListener('click', () => {
                                    document.querySelector('.players-index .details-click').classList.add('display-none')
                                    document.querySelector('.bg-disabled').classList.add('display-none')
                                    playersIndexDetails = ''
                                })
                                document.querySelector('.players-index .details-click .back').addEventListener('click', () => {
                                    document.querySelector('.players-index .details-click').classList.add('display-none')
                                    document.querySelector('.bg-disabled').classList.add('display-none')
                                    playersIndexDetails = ''
                                })
                                let playerId = this.dataset.pid
                                // console.log(m.id)
                                // console.log(playerId)
                                players.forEach(x => {
                                    if ( x.id == playerId ) {
                                        if ( x.position == "Penjaga Gawang" ) playersIndexDetails += `
                                            <thead><tr><td align="center" colspan="3">${x.known_as}</td></tr></thead>
                                            <tbody>
                                                <tr><td>Nama Lengkap</td><td align="center"> : </td><td>${x.full_name}</td></tr>
                                                <tr><td>Umur</td><td align="center"> : </td><td>${x.age}</td></tr>
                                                <tr><td>Tinggi</td><td align="center"> : </td><td>${x.height} cm</td></tr>
                                                <tr><td>Berat</td><td align="center"> : </td><td>${x.weight} kg</td></tr>
                                                <tr><td>Kewarganegaraan</td><td align="center"> : </td><td>${x.nationality}</td></tr>
                                                <tr><td>Tim</td><td align="center"> : </td><td>${teamName}</td></tr>
                                                <tr><td>Posisi</td><td align="center"> : </td><td>${x.position}</td></tr>
                                                <tr><td>Bermain</td><td align="center"> : </td><td>${x.appearances_overall}</td></tr>
                                                <tr><td>Menit Bermain</td><td align="center"> : </td><td>${x.minutes_played_overall} menit</td></tr>
                                                <tr><td>Goal</td><td align="center"> : </td><td>${x.goals_overall}</td></tr>
                                                <tr><td>Assist</td><td align="center"> : </td><td>${x.assists_overall}</td></tr>
                                                <tr><td>Kebobolan</td><td align="center"> : </td><td>${x.conceded_overall}</td></tr>
                                                <tr><td>Clean Sheets</td><td align="center"> : </td><td>${x.clean_sheets_overall}</td></tr>
                                                <tr><td>Kartu Kuning</td><td align="center"> : </td><td>${x.yellow_cards_overall}</td></tr>
                                                <tr><td>Kartu Merah</td><td align="center"> : </td><td>${x.red_cards_overall}</td></tr>
                                            </tbody>
                                        `
                                        else playersIndexDetails += `
                                            <thead><tr><td align="center" colspan="3">${x.known_as}</td></tr></thead>
                                            <tbody>
                                                <tr><td>Nama Lengkap</td><td align="center"> : </td><td>${x.full_name}</td></tr>
                                                <tr><td>Umur</td><td align="center"> : </td><td>${x.age}</td></tr>
                                                <tr><td>Tinggi</td><td align="center"> : </td><td>${x.height} cm</td></tr>
                                                <tr><td>Berat</td><td align="center"> : </td><td>${x.weight} kg</td></tr>
                                                <tr><td>Kewarganegaraan</td><td align="center"> : </td><td>${x.nationality}</td></tr>
                                                <tr><td>Tim</td><td align="center"> : </td><td>${teamName}</td></tr>
                                                <tr><td>Posisi</td><td align="center"> : </td><td>${x.position}</td></tr>
                                                <tr><td>Bermain</td><td align="center"> : </td><td>${x.appearances_overall}</td></tr>
                                                <tr><td>Menit Bermain</td><td align="center"> : </td><td>${x.minutes_played_overall} menit</td></tr>
                                                <tr><td>Goal</td><td align="center"> : </td><td>${x.goals_overall}</td></tr>
                                                <tr><td>Assist</td><td align="center"> : </td><td>${x.assists_overall}</td></tr>
                                                <tr><td>Kartu Kuning</td><td align="center"> : </td><td>${x.yellow_cards_overall}</td></tr>
                                                <tr><td>Kartu Merah</td><td align="center"> : </td><td>${x.red_cards_overall}</td></tr>
                                            </tbody>
                                            `
                                    }
                                    document.querySelector('.players-index .details-click table').innerHTML = playersIndexDetails
                                })
                            })
                        }
                    }
                }
            }).finally(document.querySelector('.loading').innerHTML = `<div>Tunggu...</div>`, document.querySelector('.loading').classList.remove('display-none'))
        })
    })
}).finally(document.querySelector('.loading').innerHTML = `<div>Tunggu...</div>`, document.querySelector('.loading').classList.remove('display-none'), document.querySelector('.draft').classList.add('display-none'))

playerSearch.addEventListener('click', function() {
    let keyword = this.parentNode.parentNode.childNodes[1].value
    fetch('/json/PLdata-players.json').then(response => response.json()).then(response => {
        document.querySelector('.loading').classList.add('display-none')

        const players = response.data
        let playersIndexDetails = ''
        for (const m of players) {
            if ( m.known_as == keyword ) {
                players.forEach(x => {
                    if ( x.position == "Goalkeeper" ) x.position = "Penjaga Gawang"
                    else if ( x.position == "Defender" ) x.position = "Pemain Bertahan"
                    else if ( x.position == "Midfielder" ) x.position = "Gelandang"
                    else if ( x.position == "Forward" ) x.position = "Penyerang"
                })
                document.querySelector('.player-search-result').classList.remove('display-none')
                document.querySelector('.bg-disabled').classList.remove('display-none')
                document.querySelector('.player-search-result .back').addEventListener('click', () => {
                    document.querySelector('.player-search-result').classList.add('display-none')
                    document.querySelector('.bg-disabled').classList.add('display-none')
                })
                document.querySelector('.player-search-result span').addEventListener('click', () => {
                    document.querySelector('.player-search-result').classList.add('display-none')
                    document.querySelector('.bg-disabled').classList.add('display-none')
                })
                if ( m.position == "Penjaga Gawang" ) {
                    let teamName = ''
                    if ( m.club_team_id == 59 ) teamName += 'Arsenal'
                    if ( m.club_team_id == 92 ) teamName += 'Tottenham Hotspur'
                    if ( m.club_team_id == 93 ) teamName += 'Manchester City'
                    if ( m.club_team_id == 108 ) teamName += 'Leicester City'
                    if ( m.club_team_id == 143 ) teamName += 'Crystal Palace'
                    if ( m.club_team_id == 144 ) teamName += 'Everton'
                    if ( m.club_team_id == 145 ) teamName += 'Burnley'
                    if ( m.club_team_id == 146 ) teamName += 'Southampton'
                    if ( m.club_team_id == 148 ) teamName += 'AFC Bournemouth'
                    if ( m.club_team_id == 149 ) teamName += 'Manchester United'
                    if ( m.club_team_id == 151 ) teamName += 'Liverpool'
                    if ( m.club_team_id == 152 ) teamName += 'Chelsea'
                    if ( m.club_team_id == 153 ) teamName += 'West Ham United'
                    if ( m.club_team_id == 155 ) teamName += 'Watford'
                    if ( m.club_team_id == 157 ) teamName += 'Newcastle United'
                    if ( m.club_team_id == 158 ) teamName += 'Aston Villa'
                    if ( m.club_team_id == 159 ) teamName += 'Norwich City'
                    if ( m.club_team_id == 209 ) teamName += 'Brighton & Hove Albion'
                    if ( m.club_team_id == 223 ) teamName += 'Wolverhampton Wanderers'
                    if ( m.club_team_id == 251 ) teamName += 'Sheffield United'
                     playersIndexDetails += `
                                            <thead><tr><td align="center" colspan="3">${m.known_as}</td></tr></thead>
                                            <tbody>
                                                <tr><td>Nama Lengkap</td><td align="center"> : </td><td>${m.full_name}</td></tr>
                                                <tr><td>Umur</td><td align="center"> : </td><td>${m.age}</td></tr>
                                                <tr><td>Tinggi</td><td align="center"> : </td><td>${m.height} cm</td></tr>
                                                <tr><td>Berat</td><td align="center"> : </td><td>${m.weight} kg</td></tr>
                                                <tr><td>Kewarganegaraan</td><td align="center"> : </td><td>${m.nationality}</td></tr>
                                                <tr><td>Tim</td><td align="center"> : </td><td>${teamName}</td></tr>
                                                <tr><td>Posisi</td><td align="center"> : </td><td>${m.position}</td></tr>
                                                <tr><td>Bermain</td><td align="center"> : </td><td>${m.appearances_overall}</td></tr>
                                                <tr><td>Menit Bermain</td><td align="center"> : </td><td>${m.minutes_played_overall} menit</td></tr>
                                                <tr><td>Goal</td><td align="center"> : </td><td>${m.goals_overall}</td></tr>
                                                <tr><td>Assist</td><td align="center"> : </td><td>${m.assists_overall}</td></tr>
                                                <tr><td>Kebobolan</td><td align="center"> : </td><td>${m.conceded_overall}</td></tr>
                                                <tr><td>Clean Sheets</td><td align="center"> : </td><td>${m.clean_sheets_overall}</td></tr>
                                                <tr><td>Kartu Kuning</td><td align="center"> : </td><td>${m.yellow_cards_overall}</td></tr>
                                                <tr><td>Kartu Merah</td><td align="center"> : </td><td>${m.red_cards_overall}</td></tr>
                                            </tbody>
                                        `
                                    }
                else {
                    let teamName = ''
                    if ( m.club_team_id == 59 ) teamName += 'Arsenal'
                    if ( m.club_team_id == 92 ) teamName += 'Tottenham Hotspur'
                    if ( m.club_team_id == 93 ) teamName += 'Manchester City'
                    if ( m.club_team_id == 108 ) teamName += 'Leicester City'
                    if ( m.club_team_id == 143 ) teamName += 'Crystal Palace'
                    if ( m.club_team_id == 144 ) teamName += 'Everton'
                    if ( m.club_team_id == 145 ) teamName += 'Burnley'
                    if ( m.club_team_id == 146 ) teamName += 'Southampton'
                    if ( m.club_team_id == 148 ) teamName += 'AFC Bournemouth'
                    if ( m.club_team_id == 149 ) teamName += 'Manchester United'
                    if ( m.club_team_id == 151 ) teamName += 'Liverpool'
                    if ( m.club_team_id == 152 ) teamName += 'Chelsea'
                    if ( m.club_team_id == 153 ) teamName += 'West Ham United'
                    if ( m.club_team_id == 155 ) teamName += 'Watford'
                    if ( m.club_team_id == 157 ) teamName += 'Newcastle United'
                    if ( m.club_team_id == 158 ) teamName += 'Aston Villa'
                    if ( m.club_team_id == 159 ) teamName += 'Norwich City'
                    if ( m.club_team_id == 209 ) teamName += 'Brighton & Hove Albion'
                    if ( m.club_team_id == 223 ) teamName += 'Wolverhampton Wanderers'
                    if ( m.club_team_id == 251 ) teamName += 'Sheffield United'
                     playersIndexDetails += `
                                            <thead><tr><td align="center" colspan="3">${m.known_as}</td></tr></thead>
                                            <tbody>
                                                <tr><td>Nama Lengkap</td><td align="center"> : </td><td>${m.full_name}</td></tr>
                                                <tr><td>Umur</td><td align="center"> : </td><td>${m.age}</td></tr>
                                                <tr><td>Tinggi</td><td align="center"> : </td><td>${m.height} cm</td></tr>
                                                <tr><td>Berat</td><td align="center"> : </td><td>${m.weight} kg</td></tr>
                                                <tr><td>Kewarganegaraan</td><td align="center"> : </td><td>${m.nationality}</td></tr>
                                                <tr><td>Tim</td><td align="center"> : </td><td>${teamName}</td></tr>
                                                <tr><td>Posisi</td><td align="center"> : </td><td>${m.position}</td></tr>
                                                <tr><td>Bermain</td><td align="center"> : </td><td>${m.appearances_overall}</td></tr>
                                                <tr><td>Menit Bermain</td><td align="center"> : </td><td>${m.minutes_played_overall} menit</td></tr>
                                                <tr><td>Goal</td><td align="center"> : </td><td>${m.goals_overall}</td></tr>
                                                <tr><td>Assist</td><td align="center"> : </td><td>${m.assists_overall}</td></tr>
                                                <tr><td>Kartu Kuning</td><td align="center"> : </td><td>${m.yellow_cards_overall}</td></tr>
                                                <tr><td>Kartu Merah</td><td align="center"> : </td><td>${m.red_cards_overall}</td></tr>
                                            </tbody>
                                            `
                                        }
                document.querySelector('.player-search-result table').innerHTML = playersIndexDetails
            }
        }
    }).finally(document.querySelector('.loading').innerHTML = `<div>Tunggu...</div>`, document.querySelector('.loading').classList.remove('display-none'))
})

positionSearch.addEventListener('click', function() {
    let keyword = this.parentNode.parentNode.childNodes[1].value
    fetch('/json/PLdata-players.json').then(response => response.json()).then(response => {
        document.querySelector('.loading').classList.add('display-none')

        const players = response.data
        let playerSearch = ''
        let playersIndexDetails = ''
        players.forEach(m => {
            if ( m.position == "Goalkeeper" ) m.position = "Penjaga Gawang"
            else if ( m.position == "Defender" ) m.position = "Pemain Bertahan"
            else if ( m.position == "Midfielder" ) m.position = "Gelandang"
            else if ( m.position == "Forward" ) m.position = "Penyerang"
        })
        for ( const m of players ) {
            if ( m.position == keyword ) {
                let teamName = ''
                if ( m.club_team_id == 59 ) teamName += 'Arsenal'
                if ( m.club_team_id == 92 ) teamName += 'Tottenham Hotspur'
                if ( m.club_team_id == 93 ) teamName += 'Manchester City'
                if ( m.club_team_id == 108 ) teamName += 'Leicester City'
                if ( m.club_team_id == 143 ) teamName += 'Crystal Palace'
                if ( m.club_team_id == 144 ) teamName += 'Everton'
                if ( m.club_team_id == 145 ) teamName += 'Burnley'
                if ( m.club_team_id == 146 ) teamName += 'Southampton'
                if ( m.club_team_id == 148 ) teamName += 'AFC Bournemouth'
                if ( m.club_team_id == 149 ) teamName += 'Manchester United'
                if ( m.club_team_id == 151 ) teamName += 'Liverpool'
                if ( m.club_team_id == 152 ) teamName += 'Chelsea'
                if ( m.club_team_id == 153 ) teamName += 'West Ham United'
                if ( m.club_team_id == 155 ) teamName += 'Watford'
                if ( m.club_team_id == 157 ) teamName += 'Newcastle United'
                if ( m.club_team_id == 158 ) teamName += 'Aston Villa'
                if ( m.club_team_id == 159 ) teamName += 'Norwich City'
                if ( m.club_team_id == 209 ) teamName += 'Brighton & Hove Albion'
                if ( m.club_team_id == 223 ) teamName += 'Wolverhampton Wanderers'
                if ( m.club_team_id == 251 ) teamName += 'Sheffield United'
                document.querySelector('.players-index').classList.remove('display-none')
                document.querySelector('.draft').classList.add('display-none')
                document.querySelectorAll('h2')[0].classList.add('display-none')
                document.querySelectorAll('h2')[1].classList.remove('display-none')
                document.querySelector('.sticky-backward').classList.remove('display-none')
                document.querySelector('.players-index .back').addEventListener('click', () => {
                    document.querySelector('.players-index').classList.add('display-none')
                    document.querySelector('.draft').classList.remove('display-none')
                    document.querySelectorAll('h2')[0].classList.remove('display-none')
                    document.querySelectorAll('h2')[1].classList.add('display-none')
                    document.querySelector('.sticky-backward').classList.add('display-none')
                })
                document.querySelector('.sticky-backward').addEventListener('click', () => {
                    document.querySelector('.players-index').classList.add('display-none')
                    document.querySelector('.draft').classList.remove('display-none')
                    document.querySelectorAll('h2')[0].classList.remove('display-none')
                    document.querySelectorAll('h2')[1].classList.add('display-none')
                    document.querySelector('.sticky-backward').classList.add('display-none')
                })
                document.querySelector('.column-detail-position').innerHTML = `Tim`
                playerSearch += `<tr data-pid="${m.id}"><td> ${m.known_as}</td><td align="center">${teamName}</td></tr>`
                document.querySelector('.details-title span').innerHTML = m.position
                document.querySelector('.details-title strong').innerHTML = 'Liga Inggris'
                document.querySelector('.players-index .details table tbody').innerHTML = playerSearch
                for (const y of document.querySelectorAll('.players-index .details table tbody tr')) {
                    y.addEventListener('click', function() {
                        document.querySelector('.players-index .details-click').classList.remove('display-none')
                        document.querySelector('.bg-disabled').classList.remove('display-none')
                        document.querySelector('.players-index .details-click span').addEventListener('click', () => {
                            document.querySelector('.players-index .details-click').classList.add('display-none')
                            document.querySelector('.bg-disabled').classList.add('display-none')
                            playersIndexDetails = ''
                        })
                        document.querySelector('.players-index .details-click .back').addEventListener('click', () => {
                            document.querySelector('.players-index .details-click').classList.add('display-none')
                            document.querySelector('.bg-disabled').classList.add('display-none')
                            playersIndexDetails = ''
                        })
                        let playerId = this.dataset.pid
                        // console.log(m.id)
                        // console.log(playerId)
                        players.forEach(x => {
                            if ( x.id == playerId ) {
                                if ( x.position == "Penjaga Gawang" ) playersIndexDetails += `
                                    <thead><tr><td align="center" colspan="3">${x.known_as}</td></tr></thead>
                                    <tbody>
                                        <tr><td>Nama Lengkap</td><td align="center"> : </td><td>${x.full_name}</td></tr>
                                        <tr><td>Umur</td><td align="center"> : </td><td>${x.age}</td></tr>
                                        <tr><td>Tinggi</td><td align="center"> : </td><td>${x.height} cm</td></tr>
                                        <tr><td>Berat</td><td align="center"> : </td><td>${x.weight} kg</td></tr>
                                        <tr><td>Kewarganegaraan</td><td align="center"> : </td><td>${x.nationality}</td></tr>
                                        <tr><td>Posisi</td><td align="center"> : </td><td>${x.position}</td></tr>
                                        <tr><td>Bermain</td><td align="center"> : </td><td>${x.appearances_overall}</td></tr>
                                        <tr><td>Menit Bermain</td><td align="center"> : </td><td>${x.minutes_played_overall} menit</td></tr>
                                        <tr><td>Goal</td><td align="center"> : </td><td>${x.goals_overall}</td></tr>
                                        <tr><td>Assist</td><td align="center"> : </td><td>${x.assists_overall}</td></tr>
                                        <tr><td>Kebobolan</td><td align="center"> : </td><td>${x.conceded_overall}</td></tr>
                                        <tr><td>Clean Sheets</td><td align="center"> : </td><td>${x.clean_sheets_overall}</td></tr>
                                        <tr><td>Kartu Kuning</td><td align="center"> : </td><td>${x.yellow_cards_overall}</td></tr>
                                        <tr><td>Kartu Merah</td><td align="center"> : </td><td>${x.red_cards_overall}</td></tr>
                                    </tbody>
                                `
                                else playersIndexDetails += `
                                    <thead><tr><td align="center" colspan="3">${x.known_as}</td></tr></thead>
                                    <tbody>
                                        <tr><td>Nama Lengkap</td><td align="center"> : </td><td>${x.full_name}</td></tr>
                                        <tr><td>Umur</td><td align="center"> : </td><td>${x.age}</td></tr>
                                        <tr><td>Tinggi</td><td align="center"> : </td><td>${x.height} cm</td></tr>
                                        <tr><td>Berat</td><td align="center"> : </td><td>${x.weight} kg</td></tr>
                                        <tr><td>Kewarganegaraan</td><td align="center"> : </td><td>${x.nationality}</td></tr>
                                        <tr><td>Posisi</td><td align="center"> : </td><td>${x.position}</td></tr>
                                        <tr><td>Bermain</td><td align="center"> : </td><td>${x.appearances_overall}</td></tr>
                                        <tr><td>Menit Bermain</td><td align="center"> : </td><td>${x.minutes_played_overall} menit</td></tr>
                                        <tr><td>Goal</td><td align="center"> : </td><td>${x.goals_overall}</td></tr>
                                        <tr><td>Assist</td><td align="center"> : </td><td>${x.assists_overall}</td></tr>
                                        <tr><td>Kartu Kuning</td><td align="center"> : </td><td>${x.yellow_cards_overall}</td></tr>
                                        <tr><td>Kartu Merah</td><td align="center"> : </td><td>${x.red_cards_overall}</td></tr>
                                    </tbody>
                                    `
                            }
                            document.querySelector('.players-index .details-click table').innerHTML = playersIndexDetails
                        })
                    })
                }
            }
        }
    }).finally(document.querySelector('.loading').innerHTML = `<div>Tunggu...</div>`, document.querySelector('.loading').classList.remove('display-none'))
})

nationalitySearch.addEventListener('click', function() {
    let keyword = this.parentNode.parentNode.childNodes[1].value
    fetch('/json/PLdata-players.json').then(response => response.json()).then(response => {
        document.querySelector('.loading').classList.add('display-none')

        const players = response.data
        let playerSearch = ''
        let playersIndexDetails = ''
        players.forEach(m => {
            if ( m.position == "Goalkeeper" ) m.position = "Penjaga Gawang"
            else if ( m.position == "Defender" ) m.position = "Pemain Bertahan"
            else if ( m.position == "Midfielder" ) m.position = "Gelandang"
            else if ( m.position == "Forward" ) m.position = "Penyerang"
        })
        
        for ( const m of players ) {
            if ( m.nationality == keyword ) {
                let teamName = ''
                if ( m.club_team_id == 59 ) teamName += 'Arsenal'
                if ( m.club_team_id == 92 ) teamName += 'Tottenham Hotspur'
                if ( m.club_team_id == 93 ) teamName += 'Manchester City'
                if ( m.club_team_id == 108 ) teamName += 'Leicester City'
                if ( m.club_team_id == 143 ) teamName += 'Crystal Palace'
                if ( m.club_team_id == 144 ) teamName += 'Everton'
                if ( m.club_team_id == 145 ) teamName += 'Burnley'
                if ( m.club_team_id == 146 ) teamName += 'Southampton'
                if ( m.club_team_id == 148 ) teamName += 'AFC Bournemouth'
                if ( m.club_team_id == 149 ) teamName += 'Manchester United'
                if ( m.club_team_id == 151 ) teamName += 'Liverpool'
                if ( m.club_team_id == 152 ) teamName += 'Chelsea'
                if ( m.club_team_id == 153 ) teamName += 'West Ham United'
                if ( m.club_team_id == 155 ) teamName += 'Watford'
                if ( m.club_team_id == 157 ) teamName += 'Newcastle United'
                if ( m.club_team_id == 158 ) teamName += 'Aston Villa'
                if ( m.club_team_id == 159 ) teamName += 'Norwich City'
                if ( m.club_team_id == 209 ) teamName += 'Brighton & Hove Albion'
                if ( m.club_team_id == 223 ) teamName += 'Wolverhampton Wanderers'
                if ( m.club_team_id == 251 ) teamName += 'Sheffield United'
                document.querySelector('.players-index').classList.remove('display-none')
                document.querySelector('.draft').classList.add('display-none')
                document.querySelectorAll('h2')[0].classList.add('display-none')
                document.querySelectorAll('h2')[1].classList.remove('display-none')
                document.querySelector('.sticky-backward').classList.remove('display-none')
                document.querySelector('.players-index .back').addEventListener('click', () => {
                    document.querySelector('.players-index').classList.add('display-none')
                    document.querySelector('.draft').classList.remove('display-none')
                    document.querySelectorAll('h2')[0].classList.remove('display-none')
                    document.querySelectorAll('h2')[1].classList.add('display-none')
                    document.querySelector('.sticky-backward').classList.add('display-none')
                    document.querySelector('.position-column-for-nationality').classList.add('display-none')
                })
                document.querySelector('.sticky-backward').addEventListener('click', () => {
                    document.querySelector('.players-index').classList.add('display-none')
                    document.querySelector('.draft').classList.remove('display-none')
                    document.querySelectorAll('h2')[0].classList.remove('display-none')
                    document.querySelectorAll('h2')[1].classList.add('display-none')
                    document.querySelector('.sticky-backward').classList.add('display-none')
                    document.querySelector('.position-column-for-nationality').classList.add('display-none')
                })
                document.querySelector('.position-column-for-nationality').classList.remove('display-none')
                document.querySelector('.column-detail-position').innerHTML = `Tim`
                playerSearch += `<tr data-pid="${m.id}"><td> ${m.known_as}</td><td align="center">${teamName}</td><td align="center">${m.position}</td></tr>`
                document.querySelector('.details-title span').innerHTML = `Pemain Liga Inggris dari`
                document.querySelector('.details-title strong').innerHTML = m.nationality
                document.querySelector('.players-index .details table tbody').innerHTML = playerSearch
                for (const y of document.querySelectorAll('.players-index .details table tbody tr')) {
                    y.addEventListener('click', function() {
                        document.querySelector('.players-index .details-click').classList.remove('display-none')
                        document.querySelector('.bg-disabled').classList.remove('display-none')
                        document.querySelector('.players-index .details-click span').addEventListener('click', () => {
                            document.querySelector('.players-index .details-click').classList.add('display-none')
                            document.querySelector('.bg-disabled').classList.add('display-none')
                            playersIndexDetails = ''
                        })
                        document.querySelector('.players-index .details-click .back').addEventListener('click', () => {
                            document.querySelector('.players-index .details-click').classList.add('display-none')
                            document.querySelector('.bg-disabled').classList.add('display-none')
                            playersIndexDetails = ''
                        })
                        let playerId = this.dataset.pid
                        // console.log(m.id)
                        // console.log(playerId)
                        players.forEach(x => {
                            if ( x.id == playerId ) {
                                if ( x.position == "Penjaga Gawang" ) playersIndexDetails += `
                                    <thead><tr><td align="center" colspan="3">${x.known_as}</td></tr></thead>
                                    <tbody>
                                        <tr><td>Nama Lengkap</td><td align="center"> : </td><td>${x.full_name}</td></tr>
                                        <tr><td>Umur</td><td align="center"> : </td><td>${x.age}</td></tr>
                                        <tr><td>Tinggi</td><td align="center"> : </td><td>${x.height} cm</td></tr>
                                        <tr><td>Berat</td><td align="center"> : </td><td>${x.weight} kg</td></tr>
                                        <tr><td>Kewarganegaraan</td><td align="center"> : </td><td>${x.nationality}</td></tr>
                                        <tr><td>Posisi</td><td align="center"> : </td><td>${x.position}</td></tr>
                                        <tr><td>Bermain</td><td align="center"> : </td><td>${x.appearances_overall}</td></tr>
                                        <tr><td>Menit Bermain</td><td align="center"> : </td><td>${x.minutes_played_overall} menit</td></tr>
                                        <tr><td>Goal</td><td align="center"> : </td><td>${x.goals_overall}</td></tr>
                                        <tr><td>Assist</td><td align="center"> : </td><td>${x.assists_overall}</td></tr>
                                        <tr><td>Kebobolan</td><td align="center"> : </td><td>${x.conceded_overall}</td></tr>
                                        <tr><td>Clean Sheets</td><td align="center"> : </td><td>${x.clean_sheets_overall}</td></tr>
                                        <tr><td>Kartu Kuning</td><td align="center"> : </td><td>${x.yellow_cards_overall}</td></tr>
                                        <tr><td>Kartu Merah</td><td align="center"> : </td><td>${x.red_cards_overall}</td></tr>
                                    </tbody>
                                `
                                else playersIndexDetails += `
                                    <thead><tr><td align="center" colspan="3">${x.known_as}</td></tr></thead>
                                    <tbody>
                                        <tr><td>Nama Lengkap</td><td align="center"> : </td><td>${x.full_name}</td></tr>
                                        <tr><td>Umur</td><td align="center"> : </td><td>${x.age}</td></tr>
                                        <tr><td>Tinggi</td><td align="center"> : </td><td>${x.height} cm</td></tr>
                                        <tr><td>Berat</td><td align="center"> : </td><td>${x.weight} kg</td></tr>
                                        <tr><td>Kewarganegaraan</td><td align="center"> : </td><td>${x.nationality}</td></tr>
                                        <tr><td>Posisi</td><td align="center"> : </td><td>${x.position}</td></tr>
                                        <tr><td>Bermain</td><td align="center"> : </td><td>${x.appearances_overall}</td></tr>
                                        <tr><td>Menit Bermain</td><td align="center"> : </td><td>${x.minutes_played_overall} menit</td></tr>
                                        <tr><td>Goal</td><td align="center"> : </td><td>${x.goals_overall}</td></tr>
                                        <tr><td>Assist</td><td align="center"> : </td><td>${x.assists_overall}</td></tr>
                                        <tr><td>Kartu Kuning</td><td align="center"> : </td><td>${x.yellow_cards_overall}</td></tr>
                                        <tr><td>Kartu Merah</td><td align="center"> : </td><td>${x.red_cards_overall}</td></tr>
                                    </tbody>
                                    `
                            }
                            document.querySelector('.players-index .details-click table').innerHTML = playersIndexDetails
                        })
                    })
                }
            }
        }
    }).finally(document.querySelector('.loading').innerHTML = `<div>Tunggu...</div>`, document.querySelector('.loading').classList.remove('display-none'))
})

/*$(window).scroll(function() {
    let wScroll = $(this).scrollTop()
    // console.log(wScroll)
    if ( wScroll >= 100 ) {
        console.log('ok')
        $('.search-details').css({
        'transform':'translate(0px, '+ wScroll / 2 +'%)'
    })
    }
})*/