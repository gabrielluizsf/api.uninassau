import mongoose from "mongoose";
import bcrypt from "bcrypt";

const StudentSchema = new mongoose.Schema({
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
    },
    hourEnd:{
        type: String,
        required: true,
    },
    hourStart:{
        type: String,
        required: true,
    },
    useVoiceChannel:{
        type:   Boolean ,
        required: true,
    },
    weekDays: {
        type: [String],
        required: true,
    },
    yearsProgramming: {
        type: Number,
        required: true,
    },

});

StudentSchema.pre("save", async function(next){
    this.password = await bcrypt.hash(this.password,10);
    next();
});

const Student = mongoose.model("Student",StudentSchema);

export default Student;