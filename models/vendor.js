import mongoose from "mongoose";

const vendorSchema = new mongoose.Schema({
    name:{
        type:String
    },
    companyName:{
        type:String
    },
    designation:{
        type:String
    },
    addrs:{
        type:String,
    },
    BillingAddrs:{
        type:String,
    },
    contact:{
        type:String,
    },
    organizationStatus:{
        type: String,
    enum: ["Shipped", "Processing", "Delivered", "Cancelled"],
    default: "Processing",
    },

    panNumber:{
        type:String,
    },
    tanNumber:{
        type:String,
    },
    gstNumber:{
        type:String,
    },
    sign:{
        type:Buffer,
    }
});

export const Vendors = mongoose.model("Vendors", vendorSchema);

