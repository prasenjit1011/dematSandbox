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
    
    //sids    = 'DOLA,IRF,DABU,INFY,NBES,BION,RELI,ADAG,ADAN,WIPR,SBI,CAMP,ADEL,AET,ADAI,APSE,IGAS,HDFL,SYR,SHCR,AGS,NYK,APTU,SBIC,BANH,MALO,NIPF,FTRE,EMBA,SULA,AHL,CROP,MOSS,PARMA,MSU,PNBK,JKU,USK,ARTI,CAST,SREER,KIRI,BPCL,VDAN,KTKM,SBFC,ELIN,REXP,CTBK,HOEX,JIO,GGAS,DELT,GSPT,PLA,BBES,IRM,FINX,GBES,ESAF,IRE,INOXI,HAP';
    /////sidData = {"DOLA":{"cqty":1,"share_name":"Dolat Algotech Ltd"},"IRF":{"cqty":1,"share_name":"INDIAN RAILWAY FINANCE CORPORATION"},"DABU":{"cqty":9,"share_name":"DABIND"},"INFY":{"cqty":1,"share_name":"Infosys Ltd"},"NBES":{"cqty":3,"share_name":"NIFBEE"},"BION":{"cqty":6,"share_name":"BIOCON"},"RELI":{"cqty":1,"share_name":"RELIND"},"ADAG":{"cqty":9,"share_name":"Adani Total Gas"},"ADAN":{"cqty":7,"share_name":"Adani Power Ltd"},"WIPR":{"cqty":10,"share_name":"Wipro"},"SBI":{"cqty":2,"share_name":"State Bank of India"},"CAMP":{"cqty":15,"share_name":"Campus Activewear"},"ADEL":{"cqty":2,"share_name":"Adani Enterprises"},"AET":{"cqty":2,"share_name":"Aether Industries"},"ADAI":{"cqty":2,"share_name":"Adani Transmission"},"APSE":{"cqty":1,"share_name":"Adani Ports"},"IGAS":{"cqty":10,"share_name":"Indraprastha Gas Limited - IGL"},"HDFL":{"cqty":2,"share_name":"HDFC Life"},"SYR":{"cqty":2,"share_name":"Syrma SGS Technology"},"SHCR":{"cqty":1,"share_name":"Sharda Crop"},"AGS":{"cqty":2,"share_name":"AGS Transact"},"NYK":{"cqty":1,"share_name":"FSN E-Co Nykaa"},"APTU":{"cqty":5,"share_name":"APTUS VALUE"},"SBIC":{"cqty":2,"share_name":"SBI Card"},"BANH":{"cqty":2,"share_name":"Bandhan Bank"},"MALO":{"cqty":1,"share_name":"Mahindra Logist"},"NIPF":{"cqty":1,"share_name":"Nippon"},"FTRE":{"cqty":20,"share_name":"Future Consumer"},"EMBA":{"cqty":4,"share_name":"Embassy Office"},"SULA":{"cqty":10,"share_name":"Sula Vineyards Limited"},"AHL":{"cqty":3,"share_name":"Abans Holdings Limited"},"CROP":{"cqty":1,"share_name":"Crompton Greaves Consumer Electricls Ltd"},"MOSS":{"cqty":2,"share_name":"Samvardhana Motherson International Ltd"},"PARMA":{"cqty":4,"share_name":"Parmax Pharma Ltd"},"MSU":{"cqty":2,"share_name":"Motherson Sumi Wiring India Ltd"},"PNBK":{"cqty":1,"share_name":"PUNJAB NATIONAL BANK"},"JKU":{"cqty":1,"share_name":"Udaipur Cement Works Ltd"},"USK":{"cqty":1,"share_name":"Udayshivakumar Infra Limited Stock"},"ARTI":{"cqty":1,"share_name":"Aarti Industries Ltd"},"CAST":{"cqty":1,"share_name":"Castrol India Ltd"},"SREER":{"cqty":1,"share_name":"TGV SRAAC Ltd"},"KIRI":{"cqty":1,"share_name":"Kiri Industries Ltd"},"BPCL":{"cqty":1,"share_name":"Bharat Petroleum Corporation Ltd"},"VDAN":{"cqty":3,"share_name":"Vedanta"},"KTKM":{"cqty":2,"share_name":"Kotak Mahindra"},"SBFC":{"cqty":5,"share_name":"SBFC Finance Limited"},"ELIN":{"cqty":1,"share_name":"Elin Electronics"},"REXP":{"cqty":3,"share_name":"Rajesh Exports Ltd"},"CTBK":{"cqty":3,"share_name":"City Union Bank Ltd"},"HOEX":{"cqty":1,"share_name":"Hindustan Oil Exploration Company Ltd"},"JIO":{"cqty":3,"share_name":"Jio Financial Services Ltd"},"GGAS":{"cqty":2,"share_name":"Gujarat Gas Ltd"},"DELT":{"cqty":3,"share_name":"Delta Corp Ltd"},"GSPT":{"cqty":2,"share_name":"Gujarat State Petronet Ltd"},"PLA":{"cqty":1,"share_name":"Plaza Wires Ord Shs"},"BBES":{"cqty":2,"share_name":"Nippon India ETF Bank BeES"},"IRM":{"cqty":14,"share_name":"IRM Energy"},"FINX":{"cqty":1,"share_name":"Finolex Industries Ltd"},"GBES":{"cqty":3,"share_name":"Nippon India ETF Gold BeES"},"ESAF":{"cqty":125,"share_name":"ESAF Small Finance Bank Limited"},"IRE":{"cqty":85,"share_name":"IREDA - Indian Renewable Energy Development Agency"},"INOXI":{"cqty":22,"share_name":"Inox India Limited"},"HAP":{"cqty":17,"share_name":"Happy Forgings"}};


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


