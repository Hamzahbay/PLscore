fetch('/players-data.json').finally().then(response => response.json()).then(data => {
    document.querySelector('.container .content-box').classList.remove('display-none')
    document.querySelector('.container .loading').remove()
    data.data.forEach(x => {
        if( x.id == document.documentURI.split('/').pop() ) {
            document.getElementById('back').href = '/spec/' + x.club_team_id
            function uncap(string) {
                return string.charAt(0).toLowerCase() + string.slice(1)
            }

            let getLow = 
            x.nationality.replace(/(^|\s)\S/g, l => l.toLowerCase()).replace( /\r\n/g, '').replace(/^\s+|\s+$/, '').replace(/[^a-zA-Z\d ]/g, '').replace(/\s+$/, '').toLowerCase()

            let www = ''
            getLow.split(' ').forEach(a => www += a + '-')

            if( x.position == 'Goalkeeper' ) {
                document.body.querySelector('.container .content-box').innerHTML += `
                <div class="box">
                    <table class="tImg">
                        <tr>
                            <td style="width: 30%;">
                                <img src="https://cdn.footystats.org/img/players/${www}${x.shorthand}.png">
                            </td>
                            <td class="name">
                                ${x.known_as}
                            </td>
                        </tr>
                    </table>
                </div>
                <table class="tDe">
                    <tr>
                        <td style="width: 44%;">Nama Lengkap</td>
                        <td style="width: 1%;">:</td>
                        <td style="width: 44%;">${x.full_name}</td>
                    </tr>
                    <tr>
                        <td style="width: 44%;">Umur</td>
                        <td style="width: 1%;">:</td>
                        <td style="width: 44%;">${x.age}</td>
                    </tr>
                    <tr>
                        <td style="width: 44%;">Tinggi Badan</td>
                        <td style="width: 1%;">:</td>
                        <td style="width: 44%;">${x.height}cm</td>
                    </tr>
                    <tr>
                        <td style="width: 44%;">Berat Badan</td>
                        <td style="width: 1%;">:</td>
                        <td style="width: 44%;">${x.weight}kg</td>
                    </tr>
                    <tr>
                        <td style="width: 44%;">Negara</td>
                        <td style="width: 1%;">:</td>
                        <td style="width: 44%;">${x.nationality}</td>
                    </tr>
                    <tr>
                        <td style="width: 44%;">Pertandingan</td>
                        <td style="width: 1%;">:</td>
                        <td style="width: 44%;">${x.appearances_overall}</td>
                    </tr>
                    <tr>
                        <td style="width: 44%;">Menit Bermain</td>
                        <td style="width: 1%;">:</td>
                        <td style="width: 44%;">${x.minutes_played_overall} menit</td>
                    </tr>
                    <tr>
                        <td style="width: 44%;">Cleansheets</td>
                        <td style="width: 1%;">:</td>
                        <td style="width: 44%;">${x.clean_sheets_overall}</td>
                    </tr>
                    <tr>
                        <td style="width: 44%;">Kebobolan</td>
                        <td style="width: 1%;">:</td>
                        <td style="width: 44%;">${x.conceded_overall}</td>
                    </tr>
                    <tr>
                        <td style="width: 44%;">Assist</td>
                        <td style="width: 1%;">:</td>
                        <td style="width: 44%;">${x.assists_overall}</td>
                    </tr>
                    <tr>
                        <td style="width: 44%;">Goal</td>
                        <td style="width: 1%;">:</td>
                        <td style="width: 44%;">${x.goals_overall}</td>
                    </tr>
                    <tr>
                        <td style="width: 44%;">Kontribusi Goal per 90 Menit</td>
                        <td style="width: 1%;">:</td>
                        <td style="width: 44%;">${x.goals_involved_per_90_overall}%</td>
                    </tr>
                    <tr>
                        <td style="width: 44%;">Kartu Kuning</td>
                        <td style="width: 1%;">:</td>
                        <td style="width: 44%;">${x.yellow_cards_overall}</td>
                    </tr>
                    <tr>
                        <td style="width: 44%;">Kartu Merah</td>
                        <td style="width: 1%;">:</td>
                        <td style="width: 44%;">${x.Merah_cards_overall}</td>
                    </tr>
                </table>
                `
            } else {
                document.body.querySelector('.container .content-box').innerHTML += `
                <div class="box">
                    <table class="tImg">
                        <tr>
                            <td style="width: 30%;">
                                <img src="https://cdn.footystats.org/img/players/${www}${x.shorthand}.png">
                            </td>
                            <td class="name">
                                ${x.known_as}
                            </td>
                        </tr>
                    </table>
                </div>
                <table class="tDe">
                    <tr>
                        <td style="width: 44%;">Nama Lengkap</td>
                        <td style="width: 1%;">:</td>
                        <td style="width: 44%;">${x.full_name}</td>
                    </tr>   
                    <tr>
                        <td style="width: 44%;">Umur</td>
                        <td style="width: 1%;">:</td>
                        <td style="width: 44%;">${x.age}</td>
                    </tr>
                    <tr>
                        <td style="width: 44%;">Tinggi Badan</td>
                        <td style="width: 1%;">:</td>
                        <td style="width: 44%;">${x.height}cm</td>
                    </tr>
                    <tr>
                        <td style="width: 44%;">Berat Badan</td>
                        <td style="width: 1%;">:</td>
                        <td style="width: 44%;">${x.weight}kg</td>
                    </tr>
                    <tr>
                        <td style="width: 44%;">Negara</td>
                        <td style="width: 1%;">:</td>
                        <td style="width: 44%;">${x.nationality}</td>
                    </tr>
                    <tr>
                        <td style="width: 44%;">Pertandingan</td>
                        <td style="width: 1%;">:</td>
                        <td style="width: 44%;">${x.appearances_overall}</td>
                    </tr>
                    <tr>
                        <td style="width: 44%;">Menit Bermain</td>
                        <td style="width: 1%;">:</td>
                        <td style="width: 44%;">${x.minutes_played_overall} menit</td>
                    </tr>
                    <tr>
                        <td style="width: 44%;">Assist</td>
                        <td style="width: 1%;">:</td>
                        <td style="width: 44%;">${x.assists_overall}</td>
                    </tr>
                    <tr>
                        <td style="width: 44%;">Goal</td>
                        <td style="width: 1%;">:</td>
                        <td style="width: 44%;">${x.goals_overall}</td>
                    </tr>
                    <tr>
                        <td style="width: 44%;">Kontribusi Goal per 90 Menit</td>
                        <td style="width: 1%;">:</td>
                        <td style="width: 44%;">${x.goals_involved_per_90_overall}%</td>
                    </tr>
                    <tr>
                        <td style="width: 44%;">Penalti Gagal</td>
                        <td style="width: 1%;">:</td>
                        <td style="width: 44%;">${x.penalty_misses}</td>
                    </tr>
                    <tr>
                        <td style="width: 44%;">Penalti Sukses</td>
                        <td style="width: 1%;">:</td>
                        <td style="width: 44%;">${x.penalty_success}</td>
                    </tr>
                    <tr>
                        <td style="width: 44%;">Kartu Kuning</td>
                        <td style="width: 1%;">:</td>
                        <td style="width: 44%;">${x.yellow_cards_overall}</td>
                    </tr>
                    <tr>
                        <td style="width: 44%;">Kartu Merah</td>
                        <td style="width: 1%;">:</td>
                        <td style="width: 44%;">${x.red_cards_overall}</td>
                    </tr>
                </table>
                `

            }
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