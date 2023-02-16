import bcrypt from 'bcrypt';
import { studentLoginService, generateToken} from '../services/auth.service.js';

const login = async (req, res) => {
    try {
        const { matricula, password } = req.body;
        const user = await studentLoginService(matricula);
            
         if (!user) {
            return res.status(400).send({ message: "Matricula or Password not found" });
         }
        const passwordIsValid = await bcrypt.compare(password, user.password);
         if (!passwordIsValid ) {
            return res.status(400).send({ message: "Matricula or Password not found" });
         }

         const token = generateToken(user.id);

        res.send({token:token});
    } catch (error) {
      res.status(500).send({ 'message': error.message })
    }
};

export { login };