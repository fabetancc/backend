const { request, response } = require('express');
import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import Usuario from '../models/user';

const validarJWT = async(req = request, res = response, next: NextFunction) =>{
    
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No se encuentra autorizado'
        });
    }

    try {
        
        const uid: any = jwt.verify(token, process.env.SECRETKEY || '');
        
        // Leer el usuario que corresponde al uid
        const usuario = await Usuario.findById(uid.uid);

        if (!usuario) {
            return res.status(401).json({
                msg: 'No se encuentra autorizado - Usuario no existe'
            });
        }

        req.usuario = usuario;

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'No se encuentra autorizado - Catch'
        });
    }

}

export {
    validarJWT
};