const nodeCache     = require("node-cache");
const myCache       = new nodeCache();
const Stock         = require('../models/stock');
const Balancesheet  = require('../models/balancesheet');
const Transaction   = require('../models/transaction');

const apiList       = {
                        tickertape: 'https://quotes-api.tickertape.in/quotes?sids=',//DABU
                        groww: 'https://groww.in/v1/api/charting_service/v2/chart/delayed/exchange/NSE/segment/CASH/',//CAMPUS/all?intervalInDays=3&minimal=true';
                    };

               

exports.getStockList = async (req, res, next) => {
    let cacheSidData        = myCache.get("cacheSidData");
    let cacheApiData        = myCache.get("cacheApiData");
    

    if(cacheSidData !== undefined &&  cacheApiData !== undefined){
        let resData = {"status":201, msg:"LTP fetch from cache successfully!", sidData: cacheSidData, apiData: cacheApiData};
        return res.end(JSON.stringify(resData));
    }
   
    let fields      = { "_id": 0, "sid": 1, "share_name": 1, "qty": 1, "sold_qty": 1 };
    let sidsData    = await Stock.find({}, fields).limit(300)
                            .then(data=>{
                                return data;
                            })
                            .catch(err=>console.log(err));
    
    let sids    = sidsData.map(data=>data.sid).toString();
    let sidData = {};
    sidsData.forEach(data=>{
        sidData[data.sid] = {"sid": data.sid, "share_name": data.share_name, "qty": data.qty, "sold_qty": data.sold_qty, "cqty": (data.qty-data.sold_qty)};
    });
    

    let apiUrl = apiList['tickertape']+sids;
    fetch(apiUrl)
            .then(result=>result.json())
            .then(apiData => {
                myCache.set( "cacheSidData", sidData, 300 );
                myCache.set( "cacheApiData", apiData['data'], 300 );
                let resData = {"status":200, msg:"LTP fetch successfully!", sidData:sidData, apiData:apiData['data']};
                return res.end(JSON.stringify(resData));
            })
            .catch(err=>{
                console.log(err);
                let resData = {"status":500, msg:"Internal Server Error!", sidData:[], apiData:[]};
                return res.end(resData);
            });   
}


exports.getNetworth = async (req, res, next) => {

    let balanceData    = await Balancesheet.find().sort({created_at: "descending"}).limit(300)
                                .then(data=>{
                                    return data;
                                })
                                .catch(err=>console.log(err));
    
    return res.end(JSON.stringify(balanceData));
}

function weeklydata(apiData){
    let arr2 = [4445];


    let d           = null;
    let d1          = null;
    let d2          = null;
    apiData.forEach((val, key)=>{
        //console.log('Val :: ', val);
    
        d   = new Date(val[0]*1000).getDate()+'/'+new Date(val[0]*1000).getMonth()+'/'+new Date(val[0]*1000).getFullYear();        
        if(d != d1){
            filterData = {};
            arr1    = [];
            apiData.forEach((x,y)=>{
                d2 = new Date(x[0]*1000).getDate()+'/'+new Date(x[0]*1000).getMonth()+'/'+new Date(val[0]*1000).getFullYear();
                if(d == d2){
                    arr1.push(x[1].toFixed(2));
                }
            });
            arr2[d] = {min:Math.min(...arr1), max:Math.max(...arr1)};
            
        }
        d1 = d;
    });;

    return arr2;
}

exports.getShareDetails = async (req, res, next) => {
    //let data            = undefined;
    let duration        = undefined;
    let interval        = undefined;
    let apiUrl          = undefined;
    let sid             = req.params.sid;
    let shareDetails    = await Stock.find({sid:sid}).limit(300)
                                    .then(data=>{
                                        return data;
                                    })
                                    .catch(err=>console.log(err));


    let transactionDetails  = await Transaction.find({sid:sid}).sort({created_at: "ascending"}).limit(300)
                                                .then(data=>{
                                                    return data;
                                                })
                                                .catch(err=>console.log(err));


    let code        = shareDetails[0].sid_grow;  
    
    let arr1        = [];
    let arr2        = [];
    //let weeklyData  = [];
    let d           = null;
    let d1          = null;
    let d2          = null;
    duration        = 'weekly';
    interval        = '1';
    apiUrl          = apiList['groww']+code+'/'+duration+'?intervalInDays='+interval+'&minimal=true';;
    let weeklyData  = await fetch(apiUrl).then(result=>result.json())
                            .then((apiData) => { 
                                let result = new Promise((resolve, reject) => {
                                                apiData['candles'].forEach((val, key)=>{
                                                    d   = new Date(val[0]*1000).getDate()+'/'+new Date(val[0]*1000).getMonth()+'/'+new Date(val[0]*1000).getFullYear();        
                                                    if(d != d1){
                                                        filterData = {};
                                                        arr1    = [];
                                                        apiData['candles'].forEach((x,y)=>{
                                                            d2 = new Date(x[0]*1000).getDate()+'/'+new Date(x[0]*1000).getMonth()+'/'+new Date(val[0]*1000).getFullYear();
                                                            if(d == d2){
                                                                arr1.push(x[1].toFixed(2));
                                                            }
                                                        });
                                                        arr2.push({dtd: val[0], date:d, min:Math.min(...arr1), max:Math.max(...arr1)});
                                                    }
                                                    d1 = d;
                                                });;
                                                resolve(arr2);
                                            });

                                //console.log('XYZ', data);
                                return result;
                            })
                            .catch(err=>{ console.log('Arr2 : Err', err);return []; });


    duration        = '1y';
    interval        = '7';
    apiUrl          = apiList['groww']+code+'/'+duration+'?intervalInDays='+interval+'&minimal=true';;
    let oneYearData = await fetch(apiUrl).then(result=>result.json())
                            .then(apiData => { return apiData['candles']; })
                            .catch(err=>{ return []; });

    duration        = 'all';
    interval        = '365';
    apiUrl          = apiList['groww']+code+'/'+duration+'?intervalInDays='+interval+'&minimal=true';;
    let historyData = await fetch(apiUrl).then(result=>result.json())
                            .then(apiData => { return apiData['candles']; })
                            .catch(err=>{ return []; });


    let data = { shareDetails:shareDetails[0], transactionDetails:transactionDetails, weeklyData:weeklyData, oneYearData:oneYearData, historyData:historyData };
    return res.end(JSON.stringify(data));

}


exports.updateStockData = async (req, res, next) => {
    let cacheSidData        = myCache.get("cacheSidData");
    let cacheApiData        = myCache.get("cacheApiData");
    
    if(cacheSidData === undefined &&  cacheApiData === undefined){
        let resData = {"status":201, msg:"LTP cache data not found!"};
        return res.end(JSON.stringify(resData));
    }   
}

exports.TradeBook = async (req, res, next) => {
    const tradeBookData = req.file;
    const productImage  = tradeBookData.filename;//ProductData.destination+'/'+
    //const product       = new Product({name: productName, price: productPrice, description:productDetail, imageUrl: productImage });
    let resData = {"status":201, msg:"LTP cache data not found!"};
    return res.end(JSON.stringify(resData));
    
}


