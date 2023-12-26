const express = require('express');
const router = express.Router();
const { getOrg, getOrgById ,get_org_detailBy_Id, get_counts} = require('../controllers/org_controllers');

router.route('/').get(getOrg);
router.route('/:id').get(getOrgById);
router.route('/detail/:id').get(get_org_detailBy_Id)
router.route('/count/:id').get(get_counts)

module.exports = router;
