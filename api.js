var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var StudentModel = require('./studentschema');

// Connecting to database
var query = 'mongodb+srv://dcontreras:dcontreras'
	+ '@clusterinacap.bdnmykt.mongodb.net/College?'
	+ 'retryWrites=true&w=majority';

const db = (query);
mongoose.Promise = global.Promise;

mongoose.connect(db, { useNewUrlParser : true,
useUnifiedTopology: true }, function(error) {
	if (error) {
		console.log("Error!" + error);
	}
});

// router.get('/save', function(req, res) {
//     var newStudent = new StudentModel({StudentId:120, 
//         Name:"Sam", Roll:1, Birthday:2001-09-02});

//     newStudent.save(function(err, data) {
//         if(err) {
//             console.log(error);
//         }
//         else {
//             res.send("Data inserted");
//         }
//     });
// });

router.post('/save', function(req, res) {
    var newStudent = new StudentModel();
    newStudent.StudentId = req.body.StudentId;
    newStudent.Name = req.body.Name;
    newStudent.Roll = req.body.Roll;
    newStudent.Birthday = req.body.Birthday;

    newStudent.save(function(err, data){
        if(err){
            console.log(err);
            let errMsg = {error: "No se ha podido ingresar"};
            res.send(errMsg);
        }
        else{
            let dataRes = {data: data,
                        msj: "Data inserted"};
            res.send(dataRes);
        }
    });
});

router.get('/findall', function(req, res) {
    StudentModel.find(function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.send(data.sort((first,second)=>{return first.StudentId - second.StudentId}));
        }
    });  
});

router.post('/findfirst', function(req, res) {
    StudentModel.findOne({StudentId: {$eq: req.body.student_id }}, 
        function(err, data) {
            if(err){
                console.log(err);
            }
            else{
                console.log(data);
                res.send(data);
            }
        }
    );  
});

router.post('/findone', function(req, res) {
    StudentModel.findOne({_id: {$eq: req.body.student_id }}, 
        function(err, data) {
            if(err){
                console.log(err);
            }
            else{
                res.send(data);
            }
        }
    );  
});

router.post('/delete', function(req, res) {
    StudentModel.findByIdAndDelete((req.body.student_id), 
    function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
            console.log("Data Deleted!");
        }
    });  
});

router.post('/update', function(req, res) {
    StudentModel.findByIdAndUpdate(req.body.id, {
            StudentId: req.body.StudentId,
            Name: req.body.Name,
            Roll: req.body.Roll,
            Birthday: req.body.Birthday,
        }, function(err, data) {
        if(err){
            console.log(err);
        }
        else{
            res.send(data);
            console.log("Data updated!");
        }
    });  
});

module.exports = router;
