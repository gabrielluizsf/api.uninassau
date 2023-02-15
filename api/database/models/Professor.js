import mongoose from "mongoose";
import bcrypt from "bcrypt";

const ProfessorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    matricula:{
        type: String,
        required: true,
        unique: true,
        lowercase:true,
    },
    password:{
        type: String,
        required: true,
        select:false,
    }

});

ProfessorSchema.pre("save", async function(next){
    this.password = await bcrypt.hash(this.password,10);
    next();
});

const Professor = mongoose.model("Professor",ProfessorSchema);

export default Professor;