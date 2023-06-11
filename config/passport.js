const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

//LOAD USER
const User = require('./../models/User')

module.exports = passport => {
    passport.use( new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
        //MATCH USER
        User.findOne({ email }).then(user => {
            if( !user ) {
                return done(null, false, { message: 'Email Belum Terdaftar' })
            }
            
            //MATCH PASSWORD
            bcrypt.compare(password, user.password, (error, match) => {
                if( error ) console.log(error)

                if( match ) {
                    return done(null, user)
                } else{
                    return done(null, false, { message: 'Kata Sandi Salah' })
                }
            })
        }).catch(error => console.log(error))
    }))

    passport.serializeUser((user, done) => {
        console.log(user)
        done(null, user.id)
    })
      
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })
}