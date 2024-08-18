const express = require('express');
const router = express.Router();
const pool = require('../connect');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');

const moment = require('moment');


router.get('/', (req, res) => {
    
    res.render('registration.ejs');

})

router.post('/', async (req, res) => {
   const {phone, address, name, class_name, inlineRadioOptions, type, fee} = req.body;

   const amount = fee;
   await pool.execute('INSERT INTO fee (amount) VALUES (?)', [fee])
   .then(()=> console.log("The fee has been inserted into database successfully "))
   .catch((error)=> console.log("Caught an error: ", error));

    const result = await pool.query(`SELECT fee_id FROM fee ORDER BY fee_id DESC LIMIT 1;`);
    


    const today = new Date();

    const arr = result[0];
    const arr2 = arr[0];
    const fee_id = arr2.fee_id;

    const formattedDate = today.toISOString().slice(0, 10);
   const student = {
        name, gender: inlineRadioOptions, address, phone, type, class_id: class_name, _dated: formattedDate, fee_id
    }

    // res.send({fee_id});


    await pool.execute(`INSERT INTO student (name, _dated, gender, address, phone, type, class_id, fee_id) VALUES (?,?,?,?,?,?,?,?)`, [student.name, student._dated, student.gender, student.address, student.phone, student.type, student.class_id, student.fee_id])
    .then(()=> res.render('student_slip.ejs', {name: student.name, phone: student.phone ,address: student.address, registration_id: uuidv4().slice(0,12), node_date: Date().slice(0,11), student_type: student.type, gender: student.gender, amount}))
    .catch((error)=> res.send({msg: "There is an error please resolve in registration"}))
 

//    const formattedDate = today.toISOString().slice(0, 10);
    // res.render('student_slip.ejs', {name, address, registration_id: uuidv4().slice(0,12), node_date: Date().slice(0,11), type});
//    res.send({phone, address, name, class_name, inlineRadioOptions, type, fee});
})

router.post('/teacher', async (req, res)=>{
    const {phone, name, address, inlineRadioOptions, type} = req.body;
    // res.send({phone, name, address, inlineRadioOptions, type});
    const teacher = {
            name, phone, gender: inlineRadioOptions, type, address
        };
        await pool.query(`INSERT INTO teacher (name, phone, gender, type, address) VALUES (?,?,?,?,?)`, 
        [teacher.name, teacher.phone, teacher.gender, teacher.type, teacher.address])
        .then(()=> res.render('register_success.ejs'))
        .catch(()=> console.log("Hello world i have cought an error registerign teacher"));
    
        // res.send({msg: "Hello world I am developer"})
})


router.get('/register_back', async (req, res) => {
 

    let result = await pool.query(`SELECT COUNT(student_id) AS student_no FROM student;`);

    
    let result2 = await pool.query(`SELECT COUNT(teacher_id) AS teacher_no FROM teacher;`);

    let recent_students = await pool.query(`SELECT * FROM student ORDER BY student_id DESC LIMIT 3;`);


// NEW ek kam kr diya hai shuru Allah khyr kry ab.

const expenses_table = await pool.query(`SELECT expense FROM expense WHERE expense!="NULL"`);

const income_table = await pool.query(`SELECT income FROM expense WHERE income!="NULL"`);


const expenses = expenses_table[0];
const incomes = income_table[0];

let total_expense = 0; // Alhamdullilah code to abhi tk chal rha hai dated 26-02-2024 development time
let total_income = 0;
let balance = 0;

expenses.forEach(obj => {
    total_expense += obj.expense;
});

incomes.forEach(obj => {
    total_income += obj.income;
});

balance = total_income - total_expense;


    let node_date = new Date();
    node_date = node_date.toDateString();

    let arr = result[0];
    let arr2 = arr[0];


    let arr3 = result2[0];
    let arr4 = arr3[0];

    // console.log( typeof arr2);
    recent_students2 = recent_students[0];

    let student_information = [];



    recent_students2.forEach(element => {
        student_information.push({name: element.name, class_name: element.class_id, Date_of_Reg: element._dated});
    });



    student_information.forEach( student => {

        let _dated_new = moment(student.Date_of_Reg);
        _dated_new = _dated_new.format("DD-MM-YY");

        student.Date_of_Reg = _dated_new;

        if(student.class_name == 1)
        student.class_name = "10th";
        if(student.class_name == 2)
        student.class_name = "11th";
        if(student.class_name == 3)
        student.class_name = "12th";
        
        if(student.class_name == 4)
        student.class_name = "9th";
    });

    // res.send({student_information});
    // res.send();

    res.render('Main_Dashboard.ejs', 
    {node_date, student_no: arr2.student_no, teacher_no: arr4.teacher_no, name1: student_information[0].name, class1: student_information[0].class_name, Date_of_Reg1: student_information[0].Date_of_Reg, name2: student_information[1].name, class_name2: student_information[1].class_name, Date_of_Reg2: student_information[1].Date_of_Reg, name3: student_information[2].name, class_name3: student_information[2].class_name, Date_of_Reg3: student_information[2].Date_of_Reg, balance});
    
    // res.render('Main_Dashboard.ejs');

});

router.get('/register_teacher', (req, res) => {
    res.render('teacher_register.ejs');
    
})


router.post('/update',async (req, res)=>{

    const id = parseInt(req.query.id);
    const {phone, address, name, class_name, inlineRadioOptions, type, fee} = req.body;

    const amount = fee;
    await pool.execute('INSERT INTO fee (amount) VALUES (?)', [fee])
   .then(()=> console.log("The fee has been inserted into database successfully "))
   .catch((error)=> console.log("Caught an error: ", error));

    const result = await pool.query(`SELECT fee_id FROM fee ORDER BY fee_id DESC LIMIT 1;`);
    

    const arr = result[0];
    const arr2 = arr[0];
    const fee_id = arr2.fee_id;

    const student = {name, phone, address, gender: inlineRadioOptions, type, fee_id};

    await pool.query(`UPDATE student SET name = ?, phone = ?, gender = ?, address = ?, type = ?, fee_id = ? WHERE student_id = ?`, [
        student.name,
        student.phone,
        student.gender,
        student.address,
        student.type,
        student.fee_id,
        id
      ])
          .then(()=> res.render('Updated_Success.ejs'))
    .catch((error) => console.log("Caught an error in updating the student ", error))

    

})




module.exports = router;