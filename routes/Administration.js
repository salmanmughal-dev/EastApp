const express = require('express');
const router = express.Router();
const pool = require('../connect');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');

const moment = require('moment');



router.get('/', (req, res)=>{

    res.render('admin/admin.ejs');

})




module.exports = router;