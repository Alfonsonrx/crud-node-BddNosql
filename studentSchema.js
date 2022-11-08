var mongoose=require('mongoose');

var StudentSchema = new mongoose.Schema({
	StudentId:{ type : Number , unique : true, required : true, dropDups: true },
	Name:String,
	Roll:Number,
	Birthday:Date,
	Address:String
});

module.exports = mongoose.model(
	'student', StudentSchema, 'Students');
