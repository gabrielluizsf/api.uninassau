import mongoose from "mongoose";
import { findByIdService } from "../services/disciplines.service.js";
import professorService from "../services/professor.service.js";
import studentService from "../services/student.service.js";

const isValidId = (req,res,next)=>{
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
      return res.status(400).send({message:"Invalid ID"});
    }
    next();
}
const isValidProfessor = async (req,res,next)=>{
    const id = req.params.id;
    const professor = await professorService.findByIdService(id);
    if(!professor){
      return res.status(400).send({message:"[ERROR] PROFESSOR NOT FOUND"});
   }
   req.id = id;
   req.professor = professor;
   next();
}
const isValidStudent = async (req,res,next)=>{
    const id = req.params.id;
    const student = await studentService.findByIdService(id);
    if(!student){
      return res.status(400).send({message:"[ERROR] STUDENT NOT FOUND"});
   }
   req.id = id;
   req.student = student;
   next();
}
export const isValidDiscipline = async (req,res,next)=>{
   const id = req.params.id;
   const discipline = await findByIdService(id);
   if(!discipline){
    return res.status(400).send({message:"[ERROR] DISCIPLINE NOT FOUND"});
   }
   
  if(discipline.user._id != req.userId){
    return res.send({message: "You didn't update this discipline"});
  }
   const {title, banner} = req.body;
   if (!title && !banner){
    res.status(400).send({message:"Submit at least one field to update the discipline"});
   }
   const titleContent  = title;
   const bannerContent = banner;
  req.id      = id;
  req.title   = titleContent;
  req.banner  = bannerContent;
  next();
}

export default{isValidId,isValidProfessor, isValidStudent}
