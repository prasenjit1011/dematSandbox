
const Employee      = require("../models/employee");
const Department    = require("../models/department");

exports.getEmployeeDept = async (req, res, next) => {

    let arr = [45,85,7887];

    return deptList = await Department
                                .find()
                                .then(async data=>{
                                    allEmpList  = await Employee.find().populate('dept_id').limit(100);
                                    empdata = await data.map(async x=>{
                                        return await Employee.find({dept_id:x._id}).limit(10);
                                    });
                                    empdata = await Promise.all(empdata);
                                    newdata = data.map((x,y)=>{
                                        deptemp = empdata
                                                    .filter((p,q)=>{
                                                        if(p[0].dept_id.toString() == x._id.toString()){
                                                            return p;
                                                        }
                                                    })
                                                    .map(p=>p);
                                        return {dept_id:x._id,title:x.title,empList:deptemp[0]};
                                    });

                                    // console.log(newdata);
                                    // console.log(data);
                                    //return res.send({pageTitle:"X", empData:allEmpList, deptEmpData:newdata});
                                    return res.render('./deptEmp/list',{pageTitle:"X", empData:allEmpList, deptEmpData:newdata});
                                });


    return res.send(JSON.stringify(deptList));
}



exports.addDeptEmp = async (req, res, next) => {

    console.log('-------------addDeptEmp------------');
    let data        = [];
    let data2       = ['-XX-'];
    let department  = [{name:'Math'}, {name:'Science'}, {name:'Geography'}];


    Department.collection.drop();


    deptArr = await department.map(async function(d){
                        const { _id } = await new Department({title: d.name})
                                                    .save()
                                                    .then((x)=>{
                                                        return x;
                                                    });
                    
                        console.log('-: XXX1 :-', _id, d.name);

                        return _id;
                    });

    console.log('-: XXXXX :-', deptArr);
    
    res.send(data2);

    /*

    let department  = [{name:'Math - '+parseInt(100*Math.random())}];//, {name:'Science'}, {name:'Geography'}];//, 'Politics', 'History', 'Physics', 'Chemistry', 'IT', 'Biology', 'Medical'];
    let employees   = [{name:'Sanjay'}, {name:'Ajoy'}, {name:'Vijay'}, {name:'Sunil'}, {name:'Riyan'}, {name:'Babai'}, {name:'Bibhu'}, {name:'Debjit'}, {name:'Sampa'}, {name:'Rohan'}, {name:'Rosalia'}, {name:'Zara'}]
    
    Department.collection.drop();
    //Employee.collection.drop();




    i = 0;
    j = 0;
    await subjects
            .map((subject, key)=>{
                console.log(subject);
                deptData = new Department({title: subject});
                deptData.save();
                data.push(deptData);
                console.log('Dept ID : ', deptData['_id']);

                j = i*2;
                while(j<(i+1)*2){
                    empData = new Employee({name: employees[key + j], dept_id:deptData['_id']});
                    empData.save();
                    data.push(empData);
                    console.log('Emp ID : ', empData['_id']);
                    j++;
                }

                
                i++;
                    
            });*/

    return res.end(JSON.stringify(data));
}


empArr = function(){

    return [456];
    //let emparr = Employee.find();

    //return JSON.stringify(emparr);
    
    /*
    return await Employee.find()
                .then(function(result) {                        
                    return result;
                })
                .catch(function(err) {
                    console.log(err);
                    return err;
                });*/
}


exports.getEmployeeDeptSSS = async (req, res, next) => {

    let arr = [45,85,77];



    return res.send(JSON.stringify(arr));
    /*
    deptArr = [];
    dept = await Department.find().limit(3)
                    .then(function(result){
                        //return result;
                        let empArr = result.map(async function(x,y){
                            empList = await Employee.find().limit(1);
                            return {id:x._id, name:x.title, empList:empList};
                        });

                        return res.send(JSON.stringify(empArr));
                        return empArr;
                        
                    });

  /*  
    x = await dept.map(async function(a,b){
        return await a.then(async function(r){
            //console.log(r);
            return await r;
        });
    });


    return res.send(JSON.stringify(x));

*/



/*



console.log('--Mongo Emp Arr--');//.populate("dept_id")

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




let deptEmp = deptData.map(function(d){
    return {title:d.title, myEmpData:Employee.find().limit(1).then(r=>r)};
});

console.log('\n\n******\n', deptData);
console.log('\n\n------\n', deptEmp);
console.log('\n******\n\n\n');
res.send(deptEmp);

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

exports.getEmployeeDeptErr01 = async (req, res, next) => {
    
    let data    = [];
    let cnt     = 999;
    let empData = await Employee.find()
                        .populate("dept_id")
                        .then(function(result) {                        
                            return result;
                        })
                        .catch(function(err) {
                            console.log(err);
                            return err;
                        });;


    let deptData = await Department.find();    
    deptData = deptData.map((x,y)=>{
        return {deptTitle : x.title, deptEmp: [11,22,44]};
    });
                    
    deptData = empArr(4);
    





    /*
    deptData     = await deptData.then(function(deptList) {                      
                                return deptList.map((val, key)=>{
                                    
                                    /*
                                    return await Employee.find()
                                                    .then(function(result) {
                                                        return {empCnt:896};
                                                    })
                                                    .catch(function(err) {
                                                        console.log(err);
                                                        return err;
                                                    });;
                                    /** */
                                    /*
                                    
                                    return {deptTitle:val.title, empCnt:859, empList: [123,456,789]};
                                });
                            })
                            .catch(function(err) {
                                console.log(err);
                                return err;
                            });
    /** */

    let pqr         = [];

    data.push({cnt:cnt, deptData:deptData, empData:empData});
    return res.end(JSON.stringify(data));

    console.log(JSON. empData);
    return res.render('./deptEmp/list', { pageTitle:"Employee Dept", xy:"Test", empData:empData});

}





exports.getEmployeeDeptErr = async (req, res, next) => {
    console.log('\n\n\n\----getEmployeeDeptList----', parseInt(100**Math.random())); 
    
    let empData     = [];
    let deptData    = [];
    let data        = [123];
    let deptEmp     = undefined;

    empData = await Employee.find()
                    .populate("dept_id")
                    .then(function(result) {                        
                        return result;
                    })
                    .catch(function(err) {
                        console.log(err);
                        return err;
                    });
    
    
    xy = 70;
    xyz = [];
    xyz.push(55);
    console.log('1st ',xyz);
    deptData = await Department.find();
   

    pqr = deptData.map((x,y)=>{
        empList = Employee
                    .find({dept_id: x._id})
                    .then((x)=>{
                        //console.log('\n-: ',x);;
                        return [99];
                    });
        
        console.log("empList", empList);



        /*
        xk = Employee.find({dept_id: x._id})
                        .then(resdata=>{
                            //console.log('\n\n',resdata);
                            return resdata;
                        })
                        .catch(err=>{
                            console.log(err)
                        });*/
        /*xt = xk.map((m,n)=>{
            return m.name;
        });*/

        //console.log(xk);
        /*xk = xk.then((val)=>{
            //console.log(111,val);
            return 77;
        });*/

        m = {title : x.title, xk:[]};
        return m;
    });
    console.log('=======>',pqr);

    /*
    let xp = await deptData.forEach(async (deptVal, key)=>{
        deptEmp = await Employee.find({dept_id:deptData[key]._id});
        
        xy++;
        xyz.push(xy);
        console.log(xyz);
        console.log('\n\n-:',xy,')', deptVal.title);
        deptEmp.forEach((empVal, empKey)=>{
            console.log('---: ',empVal.name,' :---');
        })

        // newData.push(deptVal);
        // deptData[key].assign(deptVal, {deptEmp:deptEmp});
        // deptData[key].deptEmp = deptEmp;
        // deptData[key].deptEmp = 1456;
        // console.log('\n\n\n------deptVal-------\n\n-: deptData[key] => ', deptData[key]['title'],'\n\n-: deptEmp => ', deptEmp);
        // return 145;

    });
    /* */

    //console.log('Last ',xyz);




    //newData.then((res)=>{console.log(res)})
    
    /*

    data = await newDeptData.then(res=>{
                    res.map((x,y)=>{
                        x.then((p,q)=>{
                            //console.log(p);
                            //data.push(p);
                        });
                    });
                });
    */
    //console.log('=================>', xy);
    

    //return res.end(JSON.stringify(data));
    return res.render('./deptEmp/list',{pageTitle:"Employee Dept", empData:empData, deptData:deptData, pqr:pqr});

}
