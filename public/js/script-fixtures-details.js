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

fetch('/fixtures/data.json').finally(() => {
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
    data.data.reverse()
    document.getElementById('loading').remove()
    document.getElementById('loadMoreData').classList.toggle('display-none')

    let draft = ''
    let a = 10
    let i = 0

    let count = (dataCount.floorDataCount(data.length) * 10) + parseInt(dataCount.countNumberData(data.length))
    const loadMoreData = () => {
        if( a == dataCount.floorDataCount(data.length) * 10 ) {
            a = count
            i = dataCount.floorDataCount(data.length) * 10
        } else{
            a += 10
            i += 10
        }
        console.log(i)
        console.log(a)
        viewMore(data.data, document.querySelector('.container .content-box'), draft, a, i)
    }

    console.log(i)
    console.log(a)

    viewMore(data.data, document.querySelector('.container .content-box'), draft, a, i)
    document.getElementById('loadMoreData').addEventListener('click', loadMoreData)
}).catch(error => {
    alert('Gagal Menyambungkan API')
    console.log(error)
})

const dataCount = {
    countNumberData: dataLength => {
        const roundDataCount = `${dataLength/10}`
        if( roundDataCount.split('.').pop() != 0 ) {
            return roundDataCount.split('.').pop()
        } else{
            return 0
        }
    },
    floorDataCount: dataLength => {
        const floorDataCount = Math.floor(dataLength/10)
        return floorDataCount
    }
}

const viewMore = (data, addPlace, place, count, index) => {
    if( count == data.length ) {
        document.getElementById('loadMoreData').remove()
    }
    for( let y = index; y < count; y++ ) {
        place +=  `
        <div class="box" style="cursor: pointer;" onclick="location.href = '/fixtures/${data[y].id}'">
            <table>
                <tbody>
                    <tr>
                        <td class="text-center round" colspan="7">Pertandingan Ke ${data[y].game_week}</td>
                    </tr>
                    <tr>
                        <td class="team-img"><img src="https://cdn.footystats.org/img/${data[y].home_image}"></td>
                        <td class="team-name">${data[y].home_name}</td>
                        <td>${data[y].homeGoalCount}</td>
                        <td class="text-center">v</td>
                        <td class="text-right">${data[y].awayGoalCount}</td>
                        <td class="text-right team-name">${data[y].away_name}</td>
                        <td class="team-img text-right"><img src="https://cdn.footystats.org/img/${data[y].away_image}"></td>
                    </tr>
                    <tr>
                        <td class="text-center" colspan="7">${data[y].stadium_name}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        `
    }
    addPlace.innerHTML += place
}