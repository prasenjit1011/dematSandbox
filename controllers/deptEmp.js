
const Employee      = require("../models/employee");
const Department    = require("../models/department");

exports.addDepartmentEmployee = async (req, res, next) => {

    let data        = [];
    let subjects    = ['Math', 'Science', 'Geography', 'Politics', 'History'];
    let employees   = ['Sanjay', 'Rahul', 'Vijay', 'Sunil', 'Riyan']
    
    await subjects
            .map((subject, key)=>{
                console.log(subject);
                deptData = new Department({title: subject});
                deptData.save();
                data.push(deptData);
                console.log('Dept ID : ', deptData['_id']);

                empData = new Employee({name: employees[key], dept_id:deptData['_id']});
                empData.save();
                data.push(empData);
                console.log('Emp ID : ', empData['_id']);
            });

    return res.end(JSON.stringify(data));
}

exports.getEmployeeDept = async (req, res, next) => {
    console.log('----getMovieProductList----');

    let data        = [];
    let deptData    = undefined;

    //data = await Employee.find();
    //console.log(data);

    data = await Employee.find()
                    .populate("dept_id")
                    .then(function(dbProduct) {
                        
                        console.log('---EmpList---');
                        console.log(dbProduct);


                        return dbProduct;
                    })
                    .catch(function(err) {
                        console.log(err);
                        return err;
                    });
    console.log('========================');
    data.map((val,key)=>{
        console.log(val);
        
    });




    //return res.end(JSON.stringify(data));
    return res.render('./deptEmp/list',{pageTitle:"Employee Dept",data:data});

}
