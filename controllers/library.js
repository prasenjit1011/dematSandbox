const Stock         = require('../models/stock');

const sids = async () =>{
    let fields      = { "_id": 0, "sid": 1, "share_name": 1, "qty": 1, "sold_qty": 1, "stock":1 };
    let sidsData    = await Stock.find({}, fields).limit(3000)
                            .then(data=>{
                                //console.log(data);
                                return data;
                            })
                            .catch(err=>console.log(err));
    return sidsData;
}

module.exports = { sids };