import Student from '../database/models/Students';

export const createService   = (body)=> Student.create(body);
export const findAllService  = ()=> Student.find();
export const findByIDService = (id)=> Student.findById(id);
export const updateService   = (
id,
name,
matricula,
password,
hourEnd,
hourStart,
useVoiceChannel,
weekDays,
yearsProgramming
)=> Student.findOneAndUpdate(
    { _id: id }, 
    {
        name,
        matricula,
        password,
        hourEnd,
        hourStart,
        useVoiceChannel,
        weekDays,
        yearsProgramming
    }
);
export const deleteService = (id)=>Student.findOneAndDelete({_id: id});