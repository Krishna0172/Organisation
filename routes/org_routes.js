const express = require('express');
const router = express.Router();
const { getOrg, getOrgById } = require('../controllers/org_controllers');

router.route('/').get(getOrg);
router.route('/:id').get(getOrgById);

module.exports = router;
