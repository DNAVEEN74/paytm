import { Schema, model } from 'mongoose';

const bankBalanceSchema = new Schema({
    userId: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    balance: { type: Number, required: true }
});

const Account = model("Account", bankBalanceSchema);

export default Account;