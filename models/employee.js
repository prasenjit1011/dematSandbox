var mongoose = require("mongoose");

// Get the Schema constructor
var Schema = mongoose.Schema;

// Using Schema constructor, create a EmployeeSchema
var EmployeeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  dept_id: {
    type: Schema.Types.ObjectId,
    ref: "mydepartment"
  }
});

// Create model from the schema
var Employee = mongoose.model("myemployee", EmployeeSchema);

// Export model
module.exports = Employee;