const loginDisplay = document.querySelector('.content .box .login')
const regDisplay = document.querySelector('.content .box .register')
const loginChoice = document.querySelectorAll('.content .choice span')[0]
const regChoice = document.querySelectorAll('.content .choice span')[1]
const clickHere = document.querySelector('.content .box .register p span')

clickHere.addEventListener('click', function() {
    document.querySelector('.popup-bg').classList.remove('display-none')
    document.querySelector('.popup').classList.remove('display-none')
})
document.querySelector('.popup div').addEventListener('click', function() {
    document.querySelector('.popup-bg').classList.add('display-none')
    document.querySelector('.popup').classList.add('display-none')
})

showPass1.addEventListener('click', function() {
    this.previousElementSibling.type = 'text'
    this.classList.toggle('showed')

    if( this.classList.contains('showed') ) {
        this.innerText = 'Sembunyikan Sandi'
    }

    if( !this.classList.contains('showed') ) {
        this.innerText = 'Lihat Sandi'
    this.previousElementSibling.type = 'password'
    }
})
showPass2.addEventListener('click', function() {
    this.previousElementSibling.type = 'text'
    this.classList.toggle('showed')

    if( this.classList.contains('showed') ) {
        this.innerText = 'Sembunyikan Sandi'
    }

    if( !this.classList.contains('showed') ) {
        this.innerText = 'Lihat Sandi'
    this.previousElementSibling.type = 'password'
    }
})

const email = document.getElementById('email')

const changeInput = target => {
    target.type = 'text'
}

fetch('/teams-data.json').then(response => response.json()).then(team => {
    const select = document.getElementById('favourite')
    let opt = ''

    for( const m of team.teams ) {
        opt += `<option value="${m.cleanName}">${m.cleanName}</option>`
    }

    select.innerHTML += opt
}).catch(error => {
    alert("Gagal Memuat Halaman! \n Periksa Koneksi Anda")
    console.log(error)
})