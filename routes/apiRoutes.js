const inst = require('../controllers/instagram');
const router = require("express").Router();
const user = require('../controllers/login')

router.get('/start', inst.initialize)

router.post('/login', inst.login)

router.post('/like', inst.likeTagsProcesses)

router.post('/follow', inst.followPeople)

router.post('/unfollow', inst.unfollowPeople)

router.post('/account/signup', user.signUp)

router.post('/account/signin', user.signIn)

router.get('/account/logout', user.logOut)

router.get('/account/verify', user.verify)



module.exports = router;