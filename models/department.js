var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DepartmentSchema = new Schema({
  title: {
    type: String,
    required: true
  }
});

var Department = mongoose.model("Department", DepartmentSchema);
module.exports = Department;