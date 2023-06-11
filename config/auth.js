const { request, response } = require("express");

module.exports = {
    ensureAuthenticated: (request, response, next) => {
        if( request.isAuthenticated() ) return next()
        request.flash('error_message', 'Masuk Akun Untuk Melihat')
        response.redirect('/account/login')
    }
}