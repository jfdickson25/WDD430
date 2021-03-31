const express = require('express');
const router = express();

router
.use('/memories', require('./memories'))
.use('/', require('./people'));

module.exports = router;