import { request, response } from "express";
import bcryptjs from "bcryptjs";

import { Usuario } from '../models';
import { generarJWT } from "../helpers/generar-jwt";

const login = async(req = request, res = response) => {

    const {correo, password} = req.body;

    try {
        
        // Verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if (!usuario) {
            return res.status(400).json({
                msg: 'El usuario o la contraseña son incorrectos - correo'
            });
        }

        // Verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'El usuario o la contraseña son incorrectos - password'
            });
        }

        // Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Algo salió mal. Comuníquese con el administrador'
        });
    }

};

export {
    login
};