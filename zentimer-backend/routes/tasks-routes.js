const express = require('express');
const router = express.Router();

router.get('/tasks', () => {});
router.post('/task', () => {});
router.put('/task/:id', () => {});
router.delete('/task/:id', () => {});

module.exports = router;