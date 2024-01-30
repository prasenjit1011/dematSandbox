//const sequelize = require('../util/mysql_sequelize_database');
//const Item      = require('../models/item');

exports.getStockList = (req, res, next) => {
    let apiUrl = 'https://quotes-api.tickertape.in/quotes?sids=INOXI,HAP,IRE,ADAG,ESAF,IRM,SULA,ADEL,DABU,WIPR,IGAS,CAMP,ADAN,KTKM,RELI,ADAI,APTU,AET,INFY,BION';

    fetch(apiUrl)
            .then(result=>result.json())
            .then(apiData => {
                
                let sidData = {"ADAG":"Adani Total Gas","ADAI":"Adani Transmission","ADAN":"Adani Power Ltd","ADEL":"Adani Enterprises","AET":"Aether Industries","APTU":"APTUS VALUE","BION":"BIOCON","CAMP":"Campus Activewear","DABU":"DABIND","ESAF":"ESAF Small Finance Bank Limited","HAP":"Happy Forgings","IGAS":"Indraprastha Gas Limited - IGL","INFY":"Infosys Ltd","INOXI":"Inox India Limited","IRE":"IREDA - Indian Renewable Energy Development Agency","IRM":"IRM Energy","KTKM":"Kotak Mahindra","RELI":"RELIND","SULA":"Sula Vineyards Limited","WIPR":"Wipro"};
                let resData = {"status":200,msg:"LTP fetch successfully!", sidData:sidData, apiData:apiData['data']};

                return res.end(JSON.stringify(resData));

            })
            .catch(err=>{
                console.log(err);

                let resData = {"status":500,msg:"Internal Server Error!", apiData:[]};
                return res.end(resData);
            });
}