const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models').User;

const passwordsMatch = async (submittedPassword, storedPasswordHash) => {
    return bcrypt.compareSync(submittedPassword, storedPasswordHash);
}

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    },
    async (username, password, done) => {
        console.log(password);
        const user = await User.findOne({ where: { username }});
        
        if (!user) {
            console.log("User does not exist");
            return done(null, false, { message: "Failed Login"})
        } 
        const match = await passwordsMatch(password, user.passwordHash);
        if (match === false) {
            console.log("Password does not match");
            return done(null, false, { message: "Failed Login"})
        }
        console.log("Logged in");
        return done(null, user, { message: "Succesfully Logged In"});
    }
))

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findByPk(id);
    if (!user) {
        done(null, false);
        return;
    } else {
        done(null, user);
        return;
    }
});


passport.isAuthenticated = () => {
    (req, res, next) => (req.user ? next() : res.sendStatus(401));
}

module.exports = passport;