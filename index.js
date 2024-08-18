// System Privilages
const express = require('express');
const pool = require('./connect');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');
const {HandleAuth} = require('./Auth/auth');

const cors = require('cors');

const allowedOrigins = ['https://example.com', 'http://localhost:8000/reports/data'];



// Application 

const app = express();


// Routes Information.

const LoginRoute = require('./routes/login');
const RegisterRoute = require('./routes/RegisterRoute');
const StudentRoute = require('./routes/StudentRecordRoute');
const FeeRoute = require('./routes/FeeRoute');
const staffRoute = require('./routes/Staff_Route');
const expenseRoute = require('./routes/ExpenseRoute');
const ReportRoute = require('./routes/ReportRoute');
const MarksRoute = require('./routes/Marks_Route');
const AdministrationRoute = require('./routes/Administration');

app.use(cors({
    origin: allowedOrigins,
    credentials: true, // Allow cookies and other credentials
}));

// Authorizations and Validators

app.set('view engine', 'ejs');
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser());


// App Routes & System Dynamic Information

app.get('/', (req, res) => {
    res.redirect('/login');
})

// My Controllers Thanks to usman bahi for introducing controllers

app.use('/login', LoginRoute);
app.use('/register', HandleAuth, RegisterRoute);
app.use('/students', HandleAuth, StudentRoute);
app.use('/fee', HandleAuth, FeeRoute);
app.use('/staff', HandleAuth, staffRoute);
app.use('/expenses', HandleAuth, expenseRoute);
app.use('/reports',HandleAuth, ReportRoute);
app.use('/marks', HandleAuth, MarksRoute);
app.use('/administration', HandleAuth, AdministrationRoute);


// Server initialization App Listen
app.listen(8000, ()=>{
    console.log("I am listening on Port 8000");
})