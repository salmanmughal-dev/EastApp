const express = require('express');
const router = express.Router();
const pool = require('../connect');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
// New moment powered library to work with dates
const moment = require('moment');


router.get('/', (req, res) => {
    
    // const _id = uuidv4().slice(0,5);
    
    // console.log("THe generated id is: ", _id);
    res.render('login.ejs');

})

router.post('/', async (req, res) => {


    const {username, password} = req.body;

    const sql = `SELECT * FROM user;`
    const results = await pool.query(sql);
    const userData = results[0];
    let result = await pool.query(`SELECT COUNT(student_id) AS student_no FROM student;`);

    let result2 = await pool.query(`SELECT COUNT(teacher_id) AS teacher_no FROM teacher;`);

    let recent_students = await pool.query(`SELECT * FROM student ORDER BY student_id DESC LIMIT 3;`);

// NEW ek kam kr diya hai shuru Allah khyr kry ab.

    const expenses_table = await pool.query(`SELECT expense FROM expense WHERE expense!="NULL"`);

    const income_table = await pool.query(`SELECT income FROM expense WHERE income!="NULL"`);

    const user = await pool.query(`SELECT * FROM user where username="admin"`);

    // res.send({user});
    const _user_object = user[0];
    const _user_true = _user_object[0];
    


    const today = new Date();
    const dayOfMonth = today.getDate();


    if(dayOfMonth === 1 && _user_true.session === 0){
       
        await pool.query(`UPDATE fee SET status = "unpaid";`).then(()=> console.log("Data cleared first month day")).catch(error => console.log("ERROR CAUGH AT FIRST MONTH DAY"));
        await pool.query(`DELETE FROM expense`).then(()=> console.log("Data cleared first month day")).catch(error => console.log("ERROR CAUGH AT FIRST MONTH DAY"));

        await pool.query(`UPDATE user SET session = 1 WHERE id = 1;`).then(()=> console.log("Data cleared first month day")).catch(error => console.log("ERROR CAUGH AT FIRST MONTH DAY"));

    }
    if(dayOfMonth === 29 || dayOfMonth === 30 || dayOfMonth == 27){
        await pool.query(`UPDATE user SET session = 0 WHERE id = 1;`).then(()=> console.log("Data cleared first month day")).catch(error => console.log("ERROR CAUGH AT FIRST MONTH DAY"));
    }


    
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

    // console.log(balance);
    userData.forEach(user => {
        if(username==user.username && password==user.password){

            res.cookie('myCookie', uuidv4());
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

            // To clear expenses balances and setting unpaid on the first day of the month.

          


            // We shall work on the above code.
            

            res.render('Main_Dashboard.ejs', 
            {node_date, student_no: arr2.student_no, teacher_no: arr4.teacher_no, name1: student_information[0].name, class1: student_information[0].class_name, Date_of_Reg1: student_information[0].Date_of_Reg, name2: student_information[1].name, class_name2: student_information[1].class_name, Date_of_Reg2: student_information[1].Date_of_Reg, name3: student_information[2].name, class_name3: student_information[2].class_name, Date_of_Reg3: student_information[2].Date_of_Reg, balance});
            
            // res.render('Main_Dashboard.ejs');
        }
    });
    res.render('loginError.ejs');
})


module.exports = router;