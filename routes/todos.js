const express = require('express');
const router = express.Router();
const {findAll, findById, create, update, destroy, findAllByUserId, sendEmail} = require('../controllers/todos.controller');
const {checkAuth} = require('../middleware/checkAuth');

router.get('/',checkAuth,findAll);
router.get('/user/:user_id',checkAuth, findAllByUserId);
router.post('/user/:user_id',checkAuth, create);
router.post('/user/:user_id/send_email', checkAuth,sendEmail);
// router.post('/send_email',checkAuth, sendEmail);


router.get('/:id/',checkAuth, findById);
router.put('/:id/', checkAuth,update);
router.delete('/:id/', checkAuth,destroy);

module.exports = router;
