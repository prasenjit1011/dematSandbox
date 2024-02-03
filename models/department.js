var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var DepartmentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  empid: [{
    type: String,
    required: false
  }]
});

var Department = mongoose.model("mydepartment", DepartmentSchema);
module.exports = Department;