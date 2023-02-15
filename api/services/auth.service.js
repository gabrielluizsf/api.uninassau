import Student from '../database/models/Students';
import Professor from '../database/models/Professor';
import jwt from 'jsonwebtoken';

const studentLoginService = (matricula)=> Student.findOne({matricula:matricula}).select("+password");
const professorLoginService = (matricula)=> Professor.findOne({matricula:matricula}).select("+password");
const generateToken =(id)=> jwt.sign({id:id}, process.env.SECRET_JWT,{expiresIn:86400});

export {studentLoginService,professorLoginService , generateToken};