const express = require('express');
const router = express.Router();
const pool = require('../connect');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
// New moment powered library to work with dates
const moment = require('moment');


router.get('/', async (req, res)=>{
   


    const currentPage = parseInt(req.query.page) || 1;
    itemsPerPage = 10;
    // Calculate skip and limit values for pagination
    const skip = (currentPage - 1) * itemsPerPage;
    const limit = itemsPerPage;

    

    const results = await pool.query(`SELECT * FROM teacher LIMIT ${limit} OFFSET ${skip};`);
    const records = await pool.query(`SELECT COUNT(teacher_id) AS student_no FROM teacher;`)
    
    const totalRecords_temp = records[0];
    const totalRecords_temp2 = totalRecords_temp[0];
    
    const totalRecords = totalRecords_temp2.student_no;
    
    const students_temp = results[0];

  

    const totalPages = Math.ceil(totalRecords / itemsPerPage);

    // res.send({students_temp});
    res.render('staff/staff.ejs', {students_temp, currentPage, totalPages});
})


 router.get('/delete', (req, res)=>{
    const id = parseInt(req.query.id) || 0;

    res.render('staff/confirmation.ejs', {string_msg: "Do you want to delete the staff with id #: ", id});

 })

 router.get('/confirm',async (req, res) => {
    const id = parseInt(req.query.id) || 0;

    await pool.query(`DELETE FROM teacher WHERE teacher_id=?`, [id])
    .then(()=> res.render('temp/confirmation.ejs', {string_msg: "Staff Deleted", id: -1}))
    .catch((error) => console.log(" i have got an error while deleting the record", error));

 })
module.exports = router;