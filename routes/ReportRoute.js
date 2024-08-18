const express = require('express');
const router = express.Router();
const pool = require('../connect');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
// New moment powered library to work with dates
const moment = require('moment');
const axios = require('axios');
const htmlPdf = require('html-pdf');
const PDFDocument = require('pdfkit');
const cheerio = require('cheerio');
// const { route } = require('./RegisterRoute');


router.get('/', async (req, res) => {

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
    res.render('reports/main.ejs', {balance});
})

router.get('/data',async (req, res) => {

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

// const data = {balance, total_expense, total_income};

res.json({balance, total_expense, total_income});

})



router.get('/details', async (req, res) => {
    const currentPage = parseInt(req.query.page) || 1;
    itemsPerPage = 10;
    // Calculate skip and limit values for pagination
    const skip = (currentPage - 1) * itemsPerPage;
    const limit = itemsPerPage;

    

    const results = await pool.query(`SELECT * FROM expense LIMIT ${limit} OFFSET ${skip};`);
    const records = await pool.query('SELECT COUNT(id) AS student_no FROM expense;');
    
    const totalRecords_temp = records[0];
    const totalRecords_temp2 = totalRecords_temp[0];
    
    const totalRecords = totalRecords_temp2.student_no;
    
    const students_temp = results[0];


    const totalPages = Math.ceil(totalRecords / itemsPerPage);
    expenses = students_temp;

    // res.send({students_temp});
    res.render('reports/details.ejs', {expenses, currentPage, totalPages});
})


router.get('/print',async (req, res)=>{




const expenses_table = await pool.query(`SELECT expense FROM expense WHERE expense!="NULL"`);

const income_table = await pool.query(`SELECT income FROM expense WHERE income!="NULL"`);

const maximum_value = await pool.query('SELECT * FROM expense WHERE expense = (SELECT MAX(expense) FROM expense); ');
const values = maximum_value[0];
const _true_object = values[0];





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


const data2 = await pool.query(`SELECT * FROM expense`);
const data  = data2[0];

node_date = new Date().toDateString();


res.render('pdf/pdf-expense.ejs', {data, total_expense, total_income, balance, uuidv4: uuidv4().slice(0,10), node_date, _true_object});




        // const doc = new PDFDocument();

        // doc.pipe(res); // Stream the PDF output to the response
    
        // // Extract text content from the HTML (replace with your parsing logic)    
        // // Add page content using PDFKit methods
        // doc.fontSize(12);

        // doc.text('EAST EXPENSE REPORT', {align: 'center', margin: 12});
        
        // doc.moveDown(3);
        // data.forEach(row => {
            
        //     if(row.income)
        //     {
        //         doc.text(` #: ${row.id} Income: ${row.income} PKR Dated: ${row._dated} Source: ${row.source}`);
        //         doc.text(`--------------------------------------------------------------------------------------------------------------------`);
        //     }

        //     if(row.expense){
        //         doc.text(` #: ${row.id} Expense: ${row.expense} PKR Dated: ${row._dated} Source: ${row.source}`);
        //         doc.text(`---------------------------------------------------------------------------------------------------------------------`);
        //     }
        //     doc.text('')
        // });


       
        // doc.moveDown(7);
        // doc.text(`---------------------------------------------------------------------`, {align: 'center'});
        // doc.text(`Total Balance of the Month: ${balance} PKR`, {align: 'center'});


        // doc.text(`Total Expense of the Month: ${total_expense} PKR`, {align: 'center'});
        // doc.text(`Total Income of the Month: ${total_income} PKR`, {align: 'center'});
        // doc.text(`---------------------------------------------------------------------`, {align: 'center'});


    
        // doc.end(); // Finalize PDF generation and send the response
   

})

module.exports = router;