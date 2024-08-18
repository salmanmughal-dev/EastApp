const express = require('express');
const router = express.Router();
const pool = require('../connect');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');

const moment = require('moment');
const { reset } = require('nodemon');


router.get('/', async (req, res)=>{

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
    res.render('student_lookup.ejs', {students_temp, currentPage, totalPages});
})

router.get('/academy',async (req, res) => {

    const currentPage = parseInt(req.query.page) || 1;
    itemsPerPage = 10;
    // Calculate skip and limit values for pagination
    const skip = (currentPage - 1) * itemsPerPage;
    const limit = itemsPerPage;

    

    const results = await pool.query(`SELECT * FROM student where type="academy" LIMIT ${limit} OFFSET ${skip};`);
    const records = await pool.query('SELECT COUNT(student_id) AS student_no FROM student where type="academy";');
    
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
    res.render('student_lookup.ejs', {students_temp, currentPage, totalPages});
})


router.get('/school',async (req, res) => {

   
    const currentPage = parseInt(req.query.page) || 1;
    itemsPerPage = 10;
    // Calculate skip and limit values for pagination
    const skip = (currentPage - 1) * itemsPerPage;
    const limit = itemsPerPage;

    

    const results = await pool.query(`SELECT * FROM student where type="school" LIMIT ${limit} OFFSET ${skip};`);
    const records = await pool.query('SELECT COUNT(student_id) AS student_no FROM student where type="school";');
    
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
    res.render('student_lookup.ejs', {students_temp, currentPage, totalPages});
})



// Edit the records of students


router.get('/edit', async (req, res) => {
    const id = parseInt(req.query.id) || 0;

    const result = await pool.query(`SELECT * FROM student WHERE student_id=?`, [id]);
    const temp = result[0];

    const student = temp[0];

    const {name, student_id, address, fee_id, phone} = student;

    const fee_result = await pool.query(`SELECT * FROM fee WHERE fee_id=?`, [fee_id]);

    const fee_temp = fee_result[0];
    const fee_amount = fee_temp[0];
    const {amount} = fee_amount;

    // res.send({name, student_id,amount, address, phone});

    res.render('Student_Edit.ejs', {phone, amount, name, address, id});
    // res.render('Student_Edit.ejs', {phone: "034828204", amount: "24297", name: "salman heohoar", address: "sialkot"});
    // res.send({id});
})




// Deletion Route I dont know where it is leading
router.get('/delete', (req, res)=>{
    const id =  parseInt(req.query.id) || 0;
    res.render('temp/confirmation.ejs', {id, string_msg: "Do you confirm to delete Student_ID: "});
})






// GETTING THE SEARCH FORM
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
    res.render('student_lookup.ejs', {students_temp, currentPage, totalPages});

})
// Finally deleted


router.get('/confirm',async (req, res) => {
    const id =  parseInt(req.query.id) || 0;

    await pool.query(`DELETE FROM student WHERE student_id=?`, [id])
    .then(()=> res.render('temp/confirmation.ejs', {string_msg: "Student Deleted", id: -1}))
    .catch((error) => console.log(" i have got an error while deleting the record", error));
})

module.exports = router;