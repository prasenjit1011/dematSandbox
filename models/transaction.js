const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const transactionSchema = new Schema({
    "id":{
        type: Number,
        required: false
    },
    "account":{
        type: String,
        required: false
    },
    "share_id":{
        type: Number,
        required: false
    },
    "sid":{
        type: String,
        required: false
    },
    "stock":{
        type: String,
        required: false
    },
    "action":{
        type: String,
        required: false
    },
    "qty":{
        type: Number,
        required: false
    },
    "cost":{
        type: Number,
        required: false
    },
    "trade_value":{
        type: Number,
        required: false
    },
    "order_ref":{
        type: String,
        required: false
    },
    "settlement":{
        type: Number,
        required: false
    },
    "segment":{
        type: String,
        required: false
    },
    "dp_id_and_client_dp_id":{
        type: String,
        required: false
    },
    "exchange":{
        type: String,
        required: false
    },
    "taxes":{
        type: Number,
        required: false
    },
    "transaction_and_sebi_turnover_charges":{
        type: Number,
        required: false
    },
    "stamp_duty":{
        type: Number,
        required: false
    },
    "brokerage":{
        type: Number,
        required: false
    },
    "brokerage_taxes":{
        type: Number,
        required: false
    },
    "share_name":{
        type: String,
        required: false
    },
    "type":{
        type: Number,
        required: false
    },
    "avg_cost":{
        type: Number,
        required: false
    },
    "total":{
        type: Number,
        required: false
    }
}, { timestamps: true });


module.exports = mongoose.model('transaction', transactionSchema);
