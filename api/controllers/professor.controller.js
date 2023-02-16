import professorService from "../services/professor.service.js";


const create = async (req, res) => {
   try {
      const { name, matricula, password} = req.body;

      if (!name  || !matricula || !password ) {
         res.status(400);
         res.send({ message: "Need submit all fields for registration" });
      }
      const professor = await professorService.createService(req.body);
      if (!professor) {
         return res.status(400).send({ message: "[ERROR] Creating Professor Fail" });
      }
      res.status(201).send({
         message: "professor created successfully",
         professor: {
            id: professor._id,
            name,
            matricula,
         },
      });
   } catch (err) {
    res.status(500).send({ message: err.message });
   };
}


const findAllProfessors = async (req, res) => {
   try {
      const professors = await professorService.findAllService();
      if (professors.length === 0) {
         return res.status(400).send({ message: "[ERROR]0 professorS REGISTERED" });
      }
      res.send(professors)
   } catch (err) {
    res.status(500).send({ message: err.message });
   };
}
const findById = async (req, res) => {
   try {
      const professor = req.professor;
      res.send(professor);
   } catch (err) {
    res.status(500).send({ message: err.message });
   };
}
const updateProfessorById = async (req, res) => {
   try {
      const { name, matricula, password} = req.body;

      if (!name && !matricula && !password) {
         res.status(400);
         res.send({ message: "Need submit all fields for registration" });
      }
      const { id, professor } = req;

      await professorService.updateServiceById(
         id,
         name,
         matricula,
         password
      );
      res.send({ message: "professor successfully updated!" });
   }
   catch (err) {
    res.status(500).send({ message: err.message });
   };
}

export const deleter = async(req,res)=>{
    try{
      const { id } = req.params;
      const discipline   = await findByIdService(id);
      if(discipline.professor._id != req.professorId){
        return res.send({message: "You didn't delete this Discipline"});
      }
        await deleteService(id);
        return res.send({message:"Discipline deleted successfully"});
      }
      catch(err){
        res.status(500).send({message:err.message});
      }
    }

export default { create, findAllProfessors, findById, updateProfessorById,deleter };