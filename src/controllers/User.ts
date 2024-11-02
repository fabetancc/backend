import { request, response } from 'express';
import bcryptjs from 'bcryptjs';

import Usuario from '../models/user';

const usuariosGet = async(req = request, res = response) => {

    const {limite = 5, desde = 0} = req.query;
    const query = {estado: true};

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async(req = request, res = response) => {

    const {nombre, correo, password} = req.body;
    const usuario = new Usuario({nombre, correo, password});
    
    // Encriptar la contraseña.
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password, salt);

    // Guardar en base de datos.
    await usuario.save();

    res.json({
        msg: 'post API - Controlador',
        usuario
    });
}

const usuariosPut = async(req = request, res = response) => {

    const {id} = req.params;
    const {_id, password, google, correo, ...resto} = req.body;

    if (password) {
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}

const usuariosPatch = (req = request, res = response) => {
    res.json({
        msg: 'patch API - Controlador'
    });
}

const usuariosDelete = async(req = request, res = response) => {

    const {id} = req.params;

    // Físicamente lo borramos.
    // const usuario = await Usuario.findByIdAndDelete(id);

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json(usuario);
}

export {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
};