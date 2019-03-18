const inst = require('../instagram');
const router = require("express").Router();

router.get('/start', () => {
    inst.initialize()
})

router.route('/login').post(inst.login);

router.post('/like', (req, res) => {
    inst.likeTagsProcesses(req.body.tag, req.body.quant)
})

router.post('/follow', (req, res) => {
    inst.followPeople(req.body.quant)
})

router.post('/unfollow', (req, res) => {
    inst.unfollowPeople(req.body.quant)
})

module.exports = router;