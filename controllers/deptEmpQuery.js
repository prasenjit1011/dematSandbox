
const Employee      = require("../models/employee");
const Department    = require("../models/department");


deptArr = async function(){
    console.log('-------HERE----------');

    
    dept = [];
    
    /*await Department.aggregate([
        {
            $lookup: {
                From: 'mydepartment',
                LocalField: '_id',
                foreignField: 'dept_id',
                as: 'demp'
            }
        }
    ]);
    /*
    dept = await Department.find().limit(3)
                    .then(function(result){
                        return result;
                    });

    dept = await Promise.all(dept);
    */
    console.log(dept);

}


empArr = async function(){
    
    console.log('-------------addDeptEmp------------');
    let deptEmpArr  = [];
    let department  = [{name:'Math'}, {name:'Science'}, {name:'Geography'}];
    let employees   = [{name:'Sanjay'}, {name:'Ajoy'}, {name:'Vijay'}, {name:'Sunil'}, {name:'Riyan'}, {name:'Babai'}, {name:'Bibhu'}, {name:'Debjit'}, {name:'Sampa'}, {name:'Rohan'}, {name:'Rosalia'}, {name:'Zara'}]

    Department.collection.drop();
    Employee.collection.drop();


    deptArr = await department.map(d=>{return new Department({title: d.name}).save();});
    deptArr.forEach((p,q)=>{
        p.then(async (val) => {
            i = 0;
            while(i<2){
                i++;
                empDetails = new Employee({dept_id:val._id, name: employees[q*2+i].name}).save();

                empDetails
                    .then(emp=>{
                        console.log(emp);
                        return Department.findByIdAndUpdate(val._id, {empid:[emp._id]});
                    });
            }
        })
        .catch(
            (err) => console.log(err)
        );
    });









    //let data = await Department.find().populate('empid');
    // let data = await Employee.find().limit(1).select("name");
                //////// console.log('\n\n',new Date().toString(),'\n',empDetails);

    //console.log('-: Employee Data :-',data);

    /*
    let empData = await Employee.find().limit(1)
                        .then(function(result) {
                            return result;
                        })
                        .catch(function(err) {
                            console.log(err);
                            return err;
                        });

    let deptData = await Department.find().limit(2)
                        .then(async function(result) {
                            return result;
                        })
                        .catch(function(err) {
                            console.log(err);
                            return err;
                        });

    


    let deptEmp = deptData.map(async function(d){

        return {title:d.title, myEmpData:await Employee.find().limit(1)};
    });

    console.log('\n\n******\n', deptData);
    console.log('\n\n------\n', deptEmp);
    console.log('\n******\n\n\n');
    //res.send(deptEmp);
    
    //console.log('\n-: empData :-\n',empData);
    //console.log('\n-: deptData :-\n', deptData);
    //console.log('\n-----', xp);
    /*
    let x2 = deptData.map(r=>{
                        console.log(r);
                        return r;
                    });
    
    console.log(x2);
    */

}

//empArr();
deptArr();

console.log('--Mongo--')