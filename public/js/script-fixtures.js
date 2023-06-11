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

let alpha = document.body.querySelectorAll('.container .content-box .loading div')
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

fetch('https://raw.githubusercontent.com/openfootball/football.json/master/2020-21/en.1.json').finally(() => {
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

    let alpha = document.body.querySelectorAll('.container .content-box .loading div')
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
    document.getElementById('loading').remove()
    // console.log(data)
    data.matches.reverse()
    data.matches.forEach(x => {
        if( typeof x.score == 'undefined' ) {
            document.body.querySelector('.container .content-box').innerHTML +=     `
            <div class="box">
                <table>
                  <tr>
                    <td class="text-center round" colspan="5">${x.round}</td>
                  </tr>
                  <tr>
                    <td class="team-name">${x.team1}</td>
                    <td></td>
                    <td class="text-center">v</td>
                    <td class="text-right"></td>
                    <td class="text-right team-name">${x.team2}</td>
                  </tr>
                  <tr>
                    <td class="text-center" colspan="5">${x.date}</td>
                  </tr>
                </table>
              </div>
            `
        }
        if( typeof x.score != 'undefined' ) {
            document.body.querySelector('.container .content-box').innerHTML +=     `
            <div class="box">
                <table>
                  <tr>
                    <td class="text-center round" colspan="5">${x.round}</td>
                  </tr>
                  <tr>
                    <td class="team-name">${x.team1}</td>
                    <td>${x.score.ft[0]}</td>
                    <td class="text-center">v</td>
                    <td class="text-right">${x.score.ft[1]}</td>
                    <td class="text-right team-name">${x.team2}</td>
                  </tr>
                  <tr>
                    <td class="text-center" colspan="5">${x.date}</td>
                  </tr>
                </table>
              </div>
            `
        }
    })
}).catch(error => {
    alert('Gagal menyambungkan API')
    console.log(error)
})