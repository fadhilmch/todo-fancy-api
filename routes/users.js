const express = require('express');
const router = express.Router();
const {signIn, signUp, signInFb,findAll,destroy} = require('../controllers/users.controller');

router.get('/', findAll);
// router.post('/', create);
router.post('/signup', signUp);
router.post('/login', signIn);
router.post('/signinfb', signInFb);

// router.get('/:id', findById);
// router.put('/:id', update);
router.delete('/:id', destroy);

module.exports = router;
