const mongoose  = require('mongoose');
const Schema    = mongoose.Schema;

const balanceSchema = new Schema({
    id:{
        type: Number,
        required:true,
    },
    day_status:{
        type: Number,
        required: false
    },
    cnt:{
        type: Number,
        required: false
    },
    total_investment:{
        type: Number,
        required: false
    },
    total_withdraw:{
        type: Number,
        required: false
    },
    current_share_price:{
        type: Number,
        required: false
    },
    net_received:{
        type: Number,
        required: false
    },
    ipo_total_investment:{
        type: Number,
        required: false
    },
    ipo_total_withdraw:{
        type: Number,
        required: false
    },
    ipo_current_share_price:{
        type: Number,
        required: false
    },
    ipo_net_received:{
        type: Number,
        required: false
    },
    earn_money:{
        type: Number,
        required: false
    },
    working_money:{
        type: Number,
        required: false
    }
}, { timestamps: true });

module.exports = mongoose.model('balancesheet', balanceSchema);