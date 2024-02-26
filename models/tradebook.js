const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const tradebook = new Schema({
    sid:{
        type: String,
        required: false
    },
    date:{
        type: Date,
        required: false
    },
    stock:{
        type: String,
        required: false
    },
    action:{
        type: String,
        required: false
    },
    qty:{
        type: Number,
        required: false
    },
    price:{
        type: mongoose.Types.Decimal128,
        required: false,
        get: getCosts
    },
    tradeValue:{
        type: mongoose.Types.Decimal128,
        required: false,
        get: getCosts
    },
    orderRef:{
        type: String,
        required: false
    },
    settlement:{
        type: String,
        required: false
    },
    segment:{
        type: String,
        required: false
    },
    DpidClientId:{
        type: String,
        required: false
    },
    exchange:{
        type: String,
        required: false
    },
    stt:{
        type: mongoose.Types.Decimal128,
        required: false,
        get: getCosts
    },
    TransactionSebiTurnoverCharges:{
        type: mongoose.Types.Decimal128,
        required: false,
        get: getCosts
    },
    stampDuty:{
        type: mongoose.Types.Decimal128,
        required: false,
        get: getCosts
    },
    brokerageServiceTax:{
        type: mongoose.Types.Decimal128,
        required: false,
        get: getCosts
    },
    brokerageTaxes:{
        type: mongoose.Types.Decimal128,
        required: false,
        get: getCosts
    },
    account:{
        type: String,
        required: false
    }
}, {toJSON: {getters: true}});

function getCosts(value) {
    if (typeof value !== 'undefined') {
       return parseFloat(value.toString());
    }
    return value;
};

module.exports = mongoose.model('tradebooks', tradebook);



//{"_id":{"$oid":"65d1fa569f95ca8f0095f7a5"},"id":"2","account":"prasenjit","share_id":"48","sid":"AET","stock":"AETIND",
//"created_at":"2022-05-31","action":"Buy","qty":"23","cost":"642.00","trade_value":"14766.00","order_ref":"02_ipoid","settlement":null,
//"segment":null,"dp_id_and_client_dp_id":null,"exchange":null,"taxes":"0.00","transaction_and_sebi_turnover_charges":"0.00","stamp_duty":"0.00",
//"brokerage":"0.00","brokerage_taxes":"0.00","share_name":null,"sharecode":null,"type":"1","avg_cost":"0.00","total":"14766.00",
//"updated_at":"2023-12-22 10:38:10"}


