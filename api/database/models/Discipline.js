import {Schema, model} from "mongoose";

const DisciplineSchema = new Schema({
    students: {
        type: [Schema.Types.ObjectId],
        ref: "Student",
      },
  
    professor: {
        type: Schema.Types.ObjectId,
        ref: "Professor",
        required: true,
      },
      bannerUrl: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      }
    });
    
    const Discipline = model("Discipline", DisciplineSchema);

    export default Discipline;