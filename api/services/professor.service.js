import Professor from '../database/models/Professor';

export const createService   = (body)=> Professor.create(body);
export const findAllService  = ()=> Professor.find();
export const findByIdService = (id)=> Professor.findById(id);
export const updateService   = (
    id,
    name,
    matricula,
    password
    )=> Student.findOneAndUpdate(
        { _id: id }, 
        {name,matricula,password}
);
export const deleteService = (id)=> Professor.findOneAndDelete({_id:id});