const express = require('express');
const jwt=require("jsonwebtoken");
const route = express.Router()

var passport = require("passport");
const cookieParser = require("cookie-parser");
const decodeCookie = require("jwt-decode");
var LocalStrategy = require("passport-local");

route.use(cookieParser()); 


var bcrypt = require("bcrypt");


var User = require("../models/student");
var Result =require("../models/result");
var announcement=require("../models/announcement");
var subject=require(".././models/subject");

const { cookie } = require('express-validator');
const { application } = require('express');
const cons = require('consolidate');
const { default: mongoose } = require('mongoose');
const router = require('./admin');

route.use(passport.initialize());
route.use(passport.session());




route.get('/adminhome', (req, res) => {
    
    res.render('adminhome',{message:null});  

});

route.get('/studenthome', (req, res) => {
    
    
    res.render('studenthome',{message:null});  
    
});
route.get('/error',(req, res) => {
    
    
    res.render('error');  
    
});
route.get('/studentprofile', async (req, res) => {
    console.log(`this is cookies ${req.cookies.srms}`);
    var decoded =decodeCookie(req.cookies.srms);
    console.log(decoded._id);
    //console.log(decoded._id);
    const user = await User.findById(decoded._id);
    console.log(user)
    res.render('studentprofile',{user:user,message:null});


});
route.post('/studentprofile', async (req, res) => {
    console.log(`this is cookies ${req.cookies.srms}`);
    var decoded =decodeCookie(req.cookies.srms);
    console.log(decoded._id);
    //console.log(decoded._id);
    const user3 = await User.findById(decoded._id);
    User.findByIdAndUpdate(decoded._id, {$set: req.body}, function () {
    
        res.status(200);
        res.render('studenthome',{message:"Profile Updated"});
    
        
    });


});
route.get('/addnewstudent',(req, res) =>
{
  res.render('addnewstudent')
});
route.get('/managestudent', async (req, res) => {  
    const user =  await User.find({});
    res.render('managestudent',{user});


});
route.get('/addannouncement', async (req, res) => {  
    // const an =  await announcement.find({});
    // console.log("ans"+an);
    res.render('addannouncement');


});
route.get('/announcement', async (req, res) => {

    const an = await announcement.find({});
    console.log("ans "+ an);
    res.render('announcement',{an});


});

route.post('/addannouncement', (req, res) => {  
    // const an =  await announcement.find({});
    // console.log("ans"+an);
    try{
        if (
            !req.body.email ||   
            !req.body.password
           
          ) {
            return res.status(422).json({ err: "Please Enter in All the required field" });
          }
        
            let newannouncement = new announcement({
                name: req.body.email,
                link: req.body.password,
                
            });
           
            
           
            
            newannouncement.save();
            res.status(200).render('addannouncement',{message:"Annoncement Added "});
    
        }catch(error){
           res.status(400).render('error');
           //afafwfaw
        }
        
    


});
route.get('/deletestudent/:id', function(req, res, next) {
    User.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/student/managestudent');
        } else {
            console.log('Failed to Delete user Details: ' + err);
        }
    });
});

route.get('/updateprofile/(:id)',  async function(req, res) {
    const user3 = await User.findById(req.params.id);
    res.render('updateprofile',{user3});
})
route.post('/updateprofile/(:id)',  function(req, res) {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, function () {

        res.redirect('/student/managestudent');
    });
})

route.post('/addnewstudent',(req, res) =>
{
    try{
        if (
            !req.body.name ||   
            !req.body.email ||
            !req.body.rollno ||
            !req.body.gender ||
            !req.body.phone ||
            !req.body.branch ||
            !req.body.password ||
            !req.body.sem
          ) 
            
                res.json({
                  status:404,
                  message:"Your feedback successfully saved."
                });
        
            
          
        console.log(req.body);
            let newUser = new User({
                name: req.body.name,
                email: req.body.email,
                rollno: req.body.rollno,
                gender:req.body.gender,
                phone:req.body.phone,
                branch:req.body.branch,
                password:req.body.password,
                sem:req.body.sem
            });
           
            
           
            
            newUser.save();
            res.status(200).render("adminhome",{message:"New Student Added"});
    
        }catch(error){
            res.status(400);
            res.render('error');
        }
    
});


route.get('/viewmarks', async (req, res) => {
    console.log(`this is cookies ${req.cookies.srms}`);
    var decoded =decodeCookie(req.cookies.srms);
    console.log(decoded._id);
    //console.log(decoded._id);
    const user = await User.findById(decoded._id);
    const roll=user.rollno;
    const sem=user.sem;
    const sub=await subject.findOne({sem:sem});
    const userroll = await Result.findOne({rollno:roll});
    res.render('viewmarks',{userroll,user,sub});



});

route.get('/addmarks/(:id)', async function(req, res) {
   
    const user3 = await User.findById(req.params.id);
    const sem=user3.sem;
    const branch=user3.branch; 
    const useremail = await subject.findOne({sem:sem});
    res.render('addmarks',{user3,useremail});
});
route.post('/addmarks/(:id)', async (req, res) => {


    try{
        if (
            !req.body.rollno ||   
            !req.body.sub1 ||
            !req.body.sub2 ||
            !req.body.sub3 ||
            !req.body.sub4 ||
            !req.body.sub5 
          ) {
            return res.status(422).json({ err: "Please Enter in All the required field" });
          }
        console.log(req.body);
            let newResult = new Result({
                rollno: req.body.rollno,
                marks1: req.body.sub1,
                marks2: req.body.sub2,
                marks3:req.body.sub3,
                marks4:req.body.sub4,
                marks5:req.body.sub5
            });
           
            
            await newResult.save();
            res.status(200).render('adminhome',{message:"Marks Added"});
            
            
    
        }catch(error){
            res.status(400).render('error');
        }
        
    });














route.get('/home', (req, res) => {
    
    res.render('home');  

});





route.get("/adminlogout", (req, res) => {
    res.clearCookie("srms");
    
      res.redirect("/");

  });


route.get("/logout", (req, res) => {
    res.clearCookie("srms");
    
      res.redirect("/");

  });

// route.post('/signup', (req, res) => {
//     try{
//     if (
//         !req.body.name ||   
//         !req.body.email ||
//         !req.body.rollno ||
//         !req.body.gender ||
//         !req.body.phone ||
//         !req.body.branch ||
//         !req.body.password ||
//         !req.body.sem
//       ) {
//         return res.status(422).render({ err: "Please Enter in All the required field" });
//       }
//     console.log(req.body);
//         let newUser = new User({
//             name: req.body.name,
//             email: req.body.email,
//             rollno: req.body.rollno,
//             gender:req.body.gender,
//             phone:req.body.phone,
//             branch:req.body.branch,
//             password:req.body.password,
//             sem:req.body.sem
//         });
       
        
       
        
//         newUser.save();
//         res.status(200).render('login',{message:null});

//     }catch(error){
//         res.status(404).render("error");
//     }
    
// })



module.exports=route;