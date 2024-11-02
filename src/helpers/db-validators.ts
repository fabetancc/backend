import { Usuario } from '../models';

const emailExiste = async(correo = '') => {

    const existeEmail = await Usuario.findOne({correo});
    
    if (existeEmail) throw new Error(`El correo ${correo} ya está registrado.`);

};

const existeUsuarioPorId = async(id = '') => {

    const existeUsuario = await Usuario.findById(id);
    
    if (!existeUsuario) throw new Error(`El ID ${id} no está registrado.`);

};

export {
    emailExiste
};