const express = require('express');
const router = express.Router();
const pool = require('../connect');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');

const moment = require('moment');

router.get('/', (req, res)=>{
    res.render('expenses/form.ejs');
})


router.post('/submit', async (req, res)=>{
    

    const {dated, amount, gridRadios, source} = req.body;
    let amount_2 = parseInt(amount);
    if(gridRadios == "expense"){
        // console.log(typeof dated);
        // res.send({dated, amount, source, gridRadios});
        await pool.query(`INSERT INTO expense (expense, source, _dated) VALUES (?,?,?);`,[parseInt(amount), source, dated])
        .then(()=> res.render('expenses/success.ejs', {label: "expense", dated}))
        .catch(()=> console.log("Got an error while expense form entrance"))
    }
    
    if(gridRadios == "income"){
        await pool.query(`INSERT INTO expense (income, source, _dated) VALUES (?,?,?);`,[parseInt(amount), source, dated])
        .then(()=> res.render('expenses/success.ejs', {label: "income", dated}))
        .catch(()=> console.log("Got an error while expense form entrance"))
    }
    // res.send({gridRadios, dated, amount});
})
module.exports = router;