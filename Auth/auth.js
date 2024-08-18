const express = require('express');
const pool = require('../connect.js');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');


async function HandleAuth(req, res, next){

    if(!req.cookies.myCookie){
        res.render('loginError.ejs');
    }
    else{
        next();
    }

}

module.exports = {HandleAuth};