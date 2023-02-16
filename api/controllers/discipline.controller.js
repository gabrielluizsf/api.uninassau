import {
    createService, findAllService, findByIdService ,
    countService, topDisciplineService, searchByTitleService, 
    updateService,ByProfessorService,
    deleteService
   } from "../services/disciplines.service.js";
 
 
 export const create = async (req, res) => {
     try {
         const { banner, title, text } = req.body;
         if (!title || !banner || !text) {
             res.status(400).send({
                 message: "Submit All Fields for Registration"
             });
         }
         await createService({
             banner,
             title,
             text,
             professor: req.professorId
 
         })
 
         res.status(201).send({ message: "Discipline created" });
     }
     catch (err) {
       res.status(500).send({ message: err.message });
     };
 
 }
 
 export const findAll = async (req, res) => {
     try {
         let { limit, offset } = req.query;
 
         limit = Number(limit);
         offset = Number(offset);
 
         if (!limit) {
             limit = 5;
         }
         if (!offset) {
             offset = 0;
         }
 
         const Disciplines = await findAllService();
         const total = await countService();
         const currentUrl = req.baseUrl;
 
         const next = offset + limit;
         const nextUrl =
             next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;
         const previous = offset - limit < 0 ? null : offset - limit;
         const previousUrl =
             previous != null ? `${currentUrl}?limit=${limit}&offset=${next}` : null;
        
             if (Disciplines.length === 0) {
             return res.status(400).send({ message: "[ERROR]0 REGISTERED DisciplineS" });
         }
         res.send({
             nextUrl,
             previousUrl,
             limit,
             offset,
             total,
             results: Disciplines.map((item) => ({
                 id: item._id,
                 title: item.title,
                 banner: item.bannerUrl,
                 name: item.professor.name,
                 students: item.students
             })),
         });
     }
     catch (err) {
       res.status(500).send({ message: err.message });
     }
 }
 
 export const topDiscipline = async (req, res) => {
     try {
         const Disciplines = await topDisciplineService();
         res.send({
             Disciplines: {
                 id: Disciplines._id,
                 title: Disciplines.title,
                 banner: Disciplines.bannerUrl,
                 students: Disciplines.students,
                 name: Disciplines.professor.name,
             }
         })
     }
     catch (err) {
       res.status(500).send({ message: err.message });
     }
 }
 
 export const findById = async(req,res)=>{
      try{
       const id = req.params.id;
       const Disciplines = await findByIdService(id);
       res.send({
         Discipline: {
             id:         Disciplines._id,
             title:      Disciplines.title,
             banner:     Disciplines.bannerUrl,
             students:      Disciplines.students,
             name:       Disciplines.professor.name
           } 
       })	     
      }
      catch(err){
       res.status(500).send({message: err});
      }
 }
 export const searchByTitle = async(req,res)=>{
     try {
         const { title } = req.query;
         const Disciplines = await searchByTitleService(title);
     
         if (Disciplines.length === 0) {
           return res
             .status(400)
             .send({ message: "There are no Disciplines with this title" });
         }
     
         return res.send({
           results: Disciplines.map((item) => ({
             id: item._id,
             title: item.title,
             text: item.text,
             banner: item.banner,
             students: item.students,
             name: item.professor.name
           })),
         });
       } catch (err) {
         res.status(500).send({ message: err.message });
       }
     };
 export const ByProfessor = async(req,res)=>{
   try{
   const id = req.professorId;
   const Disciplines = await ByProfessorService(id);
     return res.send({
       results: Disciplines.map((item)=>({
         id:         item._id,
         title:      item.title,
         banner:     item.bannerUrl,
         students:      item.students,
         name:       item.professor.name
       }),
     )
     });
   }catch(err){
     res.status(500).send({message:err.message});
   }
 }
 export const update = async(req,res)=>{
   try{
   const id     = req.id;
   const title  = req.title;
   const banner = req.bannerUrl;
     await updateService(id,title,banner);
     return res.send({message:"Discipline successfully updated!"});
   }
   catch(err){
     res.status(500).send({message:err.message});
   }
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