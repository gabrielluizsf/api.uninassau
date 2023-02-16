import studentService from "../services/student.service.js";


const create = async (req, res) => {
   try {
      const { name, matricula, password} = req.body;

      if (
        !name  || !matricula || !password || !hourEnd || !hourStart ||
        !useVoiceChannel || !weekDays || !yearsProgramming
        ) {
         res.status(400);
         res.send({ message: "Need submit all fields for registration" });
      }
      const student = await studentService.createService(req.body);
      if (!student) {
         return res.status(400).send({ message: "[ERROR] Creating student Fail" });
      }
      res.status(201).send({
         message: "student created successfully",
         student: {
            id: student._id,
            name,
            matricula,
            hourEnd,
            hourStart,
            useVoiceChannel,
            weekDays,
            yearsProgramming
         },
      });
   } catch (err) {
    res.status(500).send({ message: err.message });
   };
}


const findAllstudents = async (req, res) => {
   try {
      const students = await studentService.findAllService();
      if (students.length === 0) {
         return res.status(400).send({ message: "[ERROR]0 STUDENTS REGISTERED" });
      }
      res.send(students)
   } catch (err) {
    res.status(500).send({ message: err.message });
   };
}
const findById = async (req, res) => {
   try {
      const student = req.student;
      res.send(student);
   } catch (err) {
    res.status(500).send({ message: err.message });
   };
}
const updatestudentById = async (req, res) => {
   try {
      const {
        name, 
        matricula, 
        password, 
        hourEnd,
        hourStart,
        useVoiceChannel,
        weekDays,
        yearsProgramming
        } = req.body;

      if (
        !name && !matricula && !password &&
        !hourEnd && !hourStart && !useVoiceChannel &&
        !weekDays && !yearsProgramming
        ) {
         res.status(400);
         res.send({ message: "Need submit all fields for registration" });
      }
      const { id, student } = req;

      await studentService.updateServiceById(
         id,
         name,
         matricula,
         password,
         hourEnd,
         hourStart,
         useVoiceChannel,
         weekDays,
         yearsProgramming
      );
      res.send({ message: "student successfully updated!" });
   }
   catch (err) {
    res.status(500).send({ message: err.message });
   };
}

export const deleter = async(req,res)=>{
    try{
      const { id } = req.params;
      const discipline   = await findByIdService(id);
      if(discipline.student._id != req.studentId){
        return res.send({message: "You didn't delete this Discipline"});
      }
        await deleteService(id);
        return res.send({message:"Discipline deleted successfully"});
      }
      catch(err){
        res.status(500).send({message:err.message});
      }
    }
export default { create, findAllstudents, findById, updatestudentById, deleter };