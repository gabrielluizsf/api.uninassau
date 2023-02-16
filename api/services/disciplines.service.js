import Discipline from "../database/models/Discipline";

const createService = (body) => Discipline.create(body);

const findAllService = (offset,limit) => 
    Discipline.find().sort({_id: -1}).skip(offset).populate("professor");

const countService = () => Discipline.countDocuments();

const topDisciplineService = () => 
    Discipline.findOne().sort({_id: -1}).populate("professor");

const findByIdService= (id) =>
    Discipline.findById(id).populate("professor");

const searchByTitleService = (title) =>
    Discipline.find({
    title: { $regex: `${title || ""}`, $options: "i" },
     })
    .sort({ _id: -1 })
    .populate("professor");

const ByProfessorService = (id) => 
    Discipline.find({professor: id}).sort({ _id: -1}).populate("professor");

const updateService = (id,title,banner) =>
    Discipline.findOneAndUpdate({_id: id},{title,banner},{rawResult: true,});

const deleteService = (id)=>
    Discipline.findOneAndDelete({_id: id});
    
export {
    createService,
    findAllService,
    countService,
    topDisciplineService,
    findByIdService,
    searchByTitleService,		
    ByProfessorService,
    updateService,
    deleteService
}
