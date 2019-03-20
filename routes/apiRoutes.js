const inst = require('../instagram');
const router = require("express").Router();

router.get('/start', inst.initialize)

router.post('/login', inst.login);

router.post('/like', inst.likeTagsProcesses)

router.post('/follow', inst.followPeople)

router.post('/unfollow', inst.unfollowPeople)

module.exports = router;