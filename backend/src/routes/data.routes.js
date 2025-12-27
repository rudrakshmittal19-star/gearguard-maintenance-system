const express = require('express');
const router = express.Router();
const { getTechnicians, getEquipment, getRequests, createTechnician, updateTechnician, deleteTechnician, createRequest, updateRequest } = require('../controllers/data.controller');

router.get('/technicians', getTechnicians);
router.post('/technicians', createTechnician);
router.put('/technicians/:id', updateTechnician);
router.delete('/technicians/:id', deleteTechnician);
router.get('/equipment', getEquipment);
router.get('/requests', getRequests);
router.post('/requests', createRequest);
router.put('/requests/:id', updateRequest);

module.exports = router;
