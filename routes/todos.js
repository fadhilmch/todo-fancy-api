const express = require('express');
const router = express.Router();
const {findAll, findById, create, update, destroy, findAllByUserId, sendEmail} = require('../controllers/todos.controller');
const {checkAuth} = require('../middleware/checkAuth');

router.get('/',findAll);
router.get('/user/:user_id', findAllByUserId);
router.post('/user/:user_id', create);
router.post('/user/:user_id/send_email', sendEmail);
// router.post('/send_email',, sendEmail);


router.get('/:id/', findById);
router.put('/:id/', update);
router.delete('/:id/', destroy);

module.exports = router;
