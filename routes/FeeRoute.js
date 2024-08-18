const express = require('express');
const router = express.Router();
const pool = require('../connect');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');

const moment = require('moment');
const { route } = require('./StudentRecordRoute');


router.get('/',async (req, res)=>{
    
    const currentPage = parseInt(req.query.page) || 1;
    itemsPerPage = 10;
    // Calculate skip and limit values for pagination
    const skip = (currentPage - 1) * itemsPerPage;
    const limit = itemsPerPage;

    

    const results = await pool.query(`SELECT student.*, fee.* FROM student INNER JOIN fee ON student.fee_id = fee.fee_id LIMIT ${limit} OFFSET ${skip};`);
    const records = await pool.query('SELECT COUNT(student_id) AS student_no FROM student;');
    
    const totalRecords_temp = records[0];
    const totalRecords_temp2 = totalRecords_temp[0];
    
    const totalRecords = totalRecords_temp2.student_no;
    
    const students_temp = results[0];

    students_temp.forEach(student => {
        if(student.class_id == 1)
        student.class_id = "10th";
        if(student.class_id == 2)
        student.class_id = "11th";
        if(student.class_id == 3)
        student.class_id = "12th";
        
        if(student.class_id == 4)
        student.class_id = "9th";
    });

    const totalPages = Math.ceil(totalRecords / itemsPerPage);

    // res.send({students_temp});
    res.render('fee/fee.ejs', {students_temp, currentPage, totalPages});
    // res.send({results});

})

router.get('/paid',async (req, res)=>{
    const currentPage = parseInt(req.query.page) || 1;
    itemsPerPage = 10;
    // Calculate skip and limit values for pagination
    const skip = (currentPage - 1) * itemsPerPage;
    const limit = itemsPerPage;

    

    const results = await pool.query(`SELECT student.*, fee.* FROM student INNER JOIN fee ON student.fee_id = fee.fee_id WHERE fee.status='paid' LIMIT ${limit} OFFSET ${skip};`);
    const records = await pool.query('SELECT COUNT(student_id) AS student_no FROM student;');
    
    const totalRecords_temp = records[0];
    const totalRecords_temp2 = totalRecords_temp[0];
    
    const totalRecords = totalRecords_temp2.student_no;
    
    const students_temp = results[0];

    students_temp.forEach(student => {
        if(student.class_id == 1)
        student.class_id = "10th";
        if(student.class_id == 2)
        student.class_id = "11th";
        if(student.class_id == 3)
        student.class_id = "12th";
        
        if(student.class_id == 4)
        student.class_id = "9th";
    });

    const totalPages = Math.ceil(totalRecords / itemsPerPage);

    // res.send({students_temp});
    res.render('fee/fee2.ejs', {students_temp, currentPage, totalPages});
})

router.get('/unpaid', async (req, res) => {
    const currentPage = parseInt(req.query.page) || 1;
    itemsPerPage = 10;
    // Calculate skip and limit values for pagination
    const skip = (currentPage - 1) * itemsPerPage;
    const limit = itemsPerPage;

    

    const results = await pool.query(`SELECT student.*, fee.* FROM student INNER JOIN fee ON student.fee_id = fee.fee_id WHERE fee.status='unpaid' LIMIT ${limit} OFFSET ${skip};`);
    const records = await pool.query('SELECT COUNT(student_id) AS student_no FROM student;');
    
    const totalRecords_temp = records[0];
    const totalRecords_temp2 = totalRecords_temp[0];
    
    const totalRecords = totalRecords_temp2.student_no;
    
    const students_temp = results[0];

    students_temp.forEach(student => {
        if(student.class_id == 1)
        student.class_id = "10th";
        if(student.class_id == 2)
        student.class_id = "11th";
        if(student.class_id == 3)
        student.class_id = "12th";
        
        if(student.class_id == 4)
        student.class_id = "9th";
    });

    const totalPages = Math.ceil(totalRecords / itemsPerPage);

    // res.send({students_temp});
    res.render('fee/fee.ejs', {students_temp, currentPage, totalPages});
})



router.get('/pay',async (req, res)=>{

    const id = parseInt(req.query.id) || 1;

    const results = await pool.query(`SELECT * FROM student WHERE student_id=?`, [id]);


        
    const fee = results[0];
    const fee_id = fee[0];
    // res.send({id: fee_id.fee_id})
    id2 = fee_id.fee_id;

    const student = fee[0];

    const amount_value = await pool.query(`SELECT amount FROM fee WHERE fee_id=?`, [id2]);
    
    const amount_temp = amount_value[0];
    const fee_object = amount_temp[0];
    const amount_true = fee_object.amount;
    // res.send({amount_true});

    // The following code is very very important

    await pool.query('UPDATE fee SET status="paid" WHERE fee_id=?', [id2])
    .then(()=> res.render('fee/receipt.ejs', {name: student.name, phone: student.phone ,address: student.address, registration_id: uuidv4().slice(0,12), node_date: Date().slice(0,11), student_type: student.type, gender: student.gender, amount: amount_true}))
    .catch((error)=> console.log("An error in paying the fee", error))
})

    

router.post('/search',async (req, res)=>{

    const {data} = req.body;
    
    // SELECT * FROM students WHERE name LIKE '%John%';

    const currentPage = parseInt(req.query.page) || 1;
    itemsPerPage = 10;
    // Calculate skip and limit values for pagination
    const skip = (currentPage - 1) * itemsPerPage;
    const limit = itemsPerPage;

    
// following works
    // const results = await pool.query(`SELECT * FROM student WHERE name LIKE ? LIMIT ? OFFSET ?`, [data, limit, skip]);
    const results = await pool.query(`SELECT * FROM student WHERE LOWER(name) LIKE LOWER(?) LIMIT ? OFFSET ?`, [`${data}%`, limit, skip]);

  
    const records = await pool.query(`SELECT COUNT(student_id) AS student_no FROM student WHERE LOWER(name) LIKE LOWER(?)`, [`$data%`]);
    
    const totalRecords_temp = records[0];
    const totalRecords_temp2 = totalRecords_temp[0];
    
    const totalRecords = totalRecords_temp2.student_no;
    
    const students_temp = results[0];

    students_temp.forEach(student => {
        if(student.class_id == 1)
        student.class_id = "10th";
        if(student.class_id == 2)
        student.class_id = "11th";
        if(student.class_id == 3)
        student.class_id = "12th";
        
        if(student.class_id == 4)
        student.class_id = "9th";
    });

    const totalPages = Math.ceil(totalRecords / itemsPerPage);

    // res.send({students_temp});
    res.render('fee/fee.ejs', {students_temp, currentPage, totalPages});

    
})


module.exports = router;