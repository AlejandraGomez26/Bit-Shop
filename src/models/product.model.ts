import mongoose, {Schema} from "mongoose";
//sesquema de la coleccion 
const product = new Schema ({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    stock: {type: Number, required: true},
    category: {type: Array, default: []},
    description: {type: String, required: true},
    images: {type: String, required: true},


},{
    timestamps: true,
    versionKey: false
})
export default mongoose.model("product", product)
