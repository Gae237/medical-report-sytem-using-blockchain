const express = require('express');
const router = express.Router();
const { grantAccess, revokeAccess } = require('../controllers/accessController');

router.post('/grant', grantAccess);
router.post('/revoke', revokeAccess);

module.exports = router;
