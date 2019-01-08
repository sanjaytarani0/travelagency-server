const passport = require('passport');
const Jwtstrategy = require('passport-jwt').Strategy;
const {ExtractJwt} = require('passport-jwt');
const User = require('./models/user')
const {JWT_SECRET} = require('./configuration/index');
const googleplusstrategy = require('passport-google-plus-token');
const LocalStrategy = require('passport-local').Strategy;


//JSON Web Token
passport.use(new Jwtstrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: JWT_SECRET
}, async(payload,done)=>{
    try{
        // Find the user specified in token
        const user = await User.findById(payload.sub);

        // If user doesn't exists, handle it
        if(!user){
            return done(null,false)
        }
        //user exists
       done(null,user); 
    }catch(error){
        done(error,false);
    }
}));

//Google Oauth
passport.use('googleToken',new googleplusstrategy({
    clientID:'599819292215-v15ieh0mtcmfg5i2odv9m2h07lp11tav.apps.googleusercontent.com',
    clientSecret:'YXjL7BKHp2plwwlle_lohF_5'
}, async(accessToken,refreshToken,profile,done)=>{
    console.log('accessToken', accessToken);
    console.log('refreshToken', refreshToken);
    console.log('accessToken', profile);

}))

// LOCAL STRATEGY
passport.use(new LocalStrategy({
    usernameField: 'email'
  }, async (email, password, done) => {
    try {
      // Find the user given the email
      const user = await User.findOne({ email });
      
      // If not, handle it
      if (!user) {
        return done(null, false);
      }
    
      // Check if the password is correct
      const isMatch = await user.isValidPassword(password);
    
      // If not, handle it
      if (!isMatch) {
        return done(null, false);
      }
    
      // Otherwise, return the user
      done(null, user);
    } catch(error) {
      done(error, false);
    }
  }));




