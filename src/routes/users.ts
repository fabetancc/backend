import { Router } from 'express';
import { check } from 'express-validator';

const {
    validarCampos, 
} = require('../middlewares');
import { validarJWT } from '../middlewares';

import { emailExiste } from '../helpers/db-validators';

import { usuariosGet, usuariosPost, usuariosPut, usuariosPatch, usuariosDelete } from '../controllers/User';


const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
    check('password', 'El password es obligatorio y debe tener mínimo 6 caracteres.').isLength({
        min: 6
    }),
    check('correo', 'El correo no es válido.').isEmail(),
    check('correo').custom(emailExiste),
    validarCampos
], usuariosPost);

router.put('/:id', [
    check('id', 'No es un ID válido.').isMongoId(),
    validarCampos
], usuariosPut);

router.patch('/', usuariosPatch);

router.delete('/:id', [
    validarJWT,
    check('id', 'No es un ID válido.').isMongoId(),
    validarCampos
], usuariosDelete);

export default router;