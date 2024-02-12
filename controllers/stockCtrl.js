//const sequelize = require('../util/mysql_sequelize_database');
//const Item      = require('../models/item');

const Stock = require('../models/stock');


exports.getStockList = (req, res, next) => {
    let sidsList    = '';
    Stock.find().select('sid')
                .then(data=>{
                    data = [88,99];
                    return res.end(JSON.stringify(data))
                })
                .catch(err=>console.log(err));

    /*
    let sids    = 'DOLA,IRF,DABU,INFY,NBES,BION,RELI,ADAG,ADAN,WIPR,SBI,CAMP,ADEL,AET,ADAI,APSE,IGAS,HDFL,SYR,SHCR,AGS,NYK,APTU,SBIC,BANH,MALO,NIPF,FTRE,EMBA,SULA,AHL,CROP,MOSS,PARMA,MSU,PNBK,JKU,USK,ARTI,CAST,SREER,KIRI,BPCL,VDAN,KTKM,SBFC,ELIN,REXP,CTBK,HOEX,JIO,GGAS,DELT,GSPT,PLA,BBES,IRM,FINX,GBES,ESAF,IRE,INOXI,HAP';
    let sidData = {"DOLA":{"cqty":1,"share_name":"Dolat Algotech Ltd"},"IRF":{"cqty":1,"share_name":"INDIAN RAILWAY FINANCE CORPORATION"},"DABU":{"cqty":9,"share_name":"DABIND"},"INFY":{"cqty":1,"share_name":"Infosys Ltd"},"NBES":{"cqty":3,"share_name":"NIFBEE"},"BION":{"cqty":6,"share_name":"BIOCON"},"RELI":{"cqty":1,"share_name":"RELIND"},"ADAG":{"cqty":9,"share_name":"Adani Total Gas"},"ADAN":{"cqty":7,"share_name":"Adani Power Ltd"},"WIPR":{"cqty":10,"share_name":"Wipro"},"SBI":{"cqty":2,"share_name":"State Bank of India"},"CAMP":{"cqty":15,"share_name":"Campus Activewear"},"ADEL":{"cqty":2,"share_name":"Adani Enterprises"},"AET":{"cqty":2,"share_name":"Aether Industries"},"ADAI":{"cqty":2,"share_name":"Adani Transmission"},"APSE":{"cqty":1,"share_name":"Adani Ports"},"IGAS":{"cqty":10,"share_name":"Indraprastha Gas Limited - IGL"},"HDFL":{"cqty":2,"share_name":"HDFC Life"},"SYR":{"cqty":2,"share_name":"Syrma SGS Technology"},"SHCR":{"cqty":1,"share_name":"Sharda Crop"},"AGS":{"cqty":2,"share_name":"AGS Transact"},"NYK":{"cqty":1,"share_name":"FSN E-Co Nykaa"},"APTU":{"cqty":5,"share_name":"APTUS VALUE"},"SBIC":{"cqty":2,"share_name":"SBI Card"},"BANH":{"cqty":2,"share_name":"Bandhan Bank"},"MALO":{"cqty":1,"share_name":"Mahindra Logist"},"NIPF":{"cqty":1,"share_name":"Nippon"},"FTRE":{"cqty":20,"share_name":"Future Consumer"},"EMBA":{"cqty":4,"share_name":"Embassy Office"},"SULA":{"cqty":10,"share_name":"Sula Vineyards Limited"},"AHL":{"cqty":3,"share_name":"Abans Holdings Limited"},"CROP":{"cqty":1,"share_name":"Crompton Greaves Consumer Electricls Ltd"},"MOSS":{"cqty":2,"share_name":"Samvardhana Motherson International Ltd"},"PARMA":{"cqty":4,"share_name":"Parmax Pharma Ltd"},"MSU":{"cqty":2,"share_name":"Motherson Sumi Wiring India Ltd"},"PNBK":{"cqty":1,"share_name":"PUNJAB NATIONAL BANK"},"JKU":{"cqty":1,"share_name":"Udaipur Cement Works Ltd"},"USK":{"cqty":1,"share_name":"Udayshivakumar Infra Limited Stock"},"ARTI":{"cqty":1,"share_name":"Aarti Industries Ltd"},"CAST":{"cqty":1,"share_name":"Castrol India Ltd"},"SREER":{"cqty":1,"share_name":"TGV SRAAC Ltd"},"KIRI":{"cqty":1,"share_name":"Kiri Industries Ltd"},"BPCL":{"cqty":1,"share_name":"Bharat Petroleum Corporation Ltd"},"VDAN":{"cqty":3,"share_name":"Vedanta"},"KTKM":{"cqty":2,"share_name":"Kotak Mahindra"},"SBFC":{"cqty":5,"share_name":"SBFC Finance Limited"},"ELIN":{"cqty":1,"share_name":"Elin Electronics"},"REXP":{"cqty":3,"share_name":"Rajesh Exports Ltd"},"CTBK":{"cqty":3,"share_name":"City Union Bank Ltd"},"HOEX":{"cqty":1,"share_name":"Hindustan Oil Exploration Company Ltd"},"JIO":{"cqty":3,"share_name":"Jio Financial Services Ltd"},"GGAS":{"cqty":2,"share_name":"Gujarat Gas Ltd"},"DELT":{"cqty":3,"share_name":"Delta Corp Ltd"},"GSPT":{"cqty":2,"share_name":"Gujarat State Petronet Ltd"},"PLA":{"cqty":1,"share_name":"Plaza Wires Ord Shs"},"BBES":{"cqty":2,"share_name":"Nippon India ETF Bank BeES"},"IRM":{"cqty":14,"share_name":"IRM Energy"},"FINX":{"cqty":1,"share_name":"Finolex Industries Ltd"},"GBES":{"cqty":3,"share_name":"Nippon India ETF Gold BeES"},"ESAF":{"cqty":125,"share_name":"ESAF Small Finance Bank Limited"},"IRE":{"cqty":85,"share_name":"IREDA - Indian Renewable Energy Development Agency"},"INOXI":{"cqty":22,"share_name":"Inox India Limited"},"HAP":{"cqty":17,"share_name":"Happy Forgings"}};
    
    let apiUrl = 'https://quotes-api.tickertape.in/quotes?sids='+sids;

    fetch(apiUrl)
            .then(result=>result.json())
            .then(apiData => {

                let resData = {"status":200,msg:"LTP fetch successfully!", sidData:sidData, apiData:apiData['data']};
                return res.end(JSON.stringify(resData));

            })
            .catch(err=>{
                console.log(err);

                let resData = {"status":500,msg:"Internal Server Error!", apiData:[]};
                return res.end(resData);
            });
    */
}