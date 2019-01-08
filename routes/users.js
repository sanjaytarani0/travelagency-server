const router = require('express-promise-router')();
const passportConfig = require('../passport');
const {validateBody, schemas} =require('../helpers/routehelpers')
const userController = require('../controllers/users');
const passport = require('passport');

router.route('/signup')
.post(validateBody(schemas.authSchema), userController.signUp);

router.route('/signin')
.post(validateBody(schemas.authSchema),passport.authenticate('local',{session:false}), userController.signIn);

router.route('/secret')
.get(passport.authenticate('jwt',{session:false}),userController.secret);

// router.route('oauth/google')
// .post(passport.authenticate('googleToken',{session:false}));

module.exports = router;