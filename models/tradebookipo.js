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

module.exports = mongoose.model('tradebookipos', tradebook);
