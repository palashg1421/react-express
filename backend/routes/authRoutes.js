const router    = require('express').Router();
const auth      = require('../app/controllers/authController');

/** Register */
router.post('/signup', auth.signup);

/** Login */
router.post('/login', auth.login);

module.exports = router;
