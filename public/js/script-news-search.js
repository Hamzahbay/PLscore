const stopLink = clickT => {
    for( const m of clickT ) {
        m.addEventListener('click', function() {
            let thumb = this.dataset.params
            window.location.href = `/news/${thumb}`
        })
    }
}

stopLink(document.body.querySelectorAll('.container .thumbnail-news-box .thumbnail .content-box'))