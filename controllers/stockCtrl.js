//const sequelize = require('../util/mysql_sequelize_database');
//const Item      = require('../models/item');

exports.getStockList = (req, res, next) => {
    let apiUrl = 'https://quotes-api.tickertape.in/quotes?sids=INOXI,HAP,IRE,ADAG,ESAF,IRM,SULA,ADEL,DABU,WIPR,IGAS,CAMP,ADAN,KTKM,RELI,ADAI,APTU,AET,INFY,BION';

    fetch(apiUrl)
            .then(result=>result.json())
            .then(apiData => {
                let resData = {"status":200,msg:"LTP fetch successfully!", apiData:apiData['data']};
                return res.end(JSON.stringify(resData));

            })
            .catch(err=>{
                console.log(err);

                let resData = {"status":500,msg:"Internal Server Error!", apiData:[]};
                return res.end(resData);
            });
}