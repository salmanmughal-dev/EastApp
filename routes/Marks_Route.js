const express = require('express');
const router = express.Router();
const pool = require('../connect');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');

const moment = require('moment');


router.get('/',async (req, res)=>{
    const currentPage = parseInt(req.query.page) || 1;
    itemsPerPage = 10;
    // Calculate skip and limit values for pagination
    const skip = (currentPage - 1) * itemsPerPage;
    const limit = itemsPerPage;

    

    const results = await pool.query(`SELECT * FROM student LIMIT ${limit} OFFSET ${skip};`);
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
    res.render('marks/students_list.ejs', {students_temp, currentPage, totalPages});
})


router.get('/add',async (req, res) => {
    const id = parseInt(req.query.id) || 1;
    
    const results = await pool.query('SELECT * FROM student where student_id=?;', [id]);

    const arr = results[0];
    const student = arr[0];
    const node_date2 = new Date();
    node_date = node_date2.toString().slice(0,16);
  
    // res.send(node_date);
    if(student.class_id == 1){
        student.class_id = 9;
    }
    res.render('marks_slip.ejs', {student, uuidv4: uuidv4().slice(0,10), node_date});
    // res.send({student, uuidv4: uuidv4().slice(0,14)});
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
    res.render('marks/students_list.ejs', {students_temp, currentPage, totalPages});

})

module.exports = router;