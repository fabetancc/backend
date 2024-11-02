import { Router } from 'express';
import { check } from 'express-validator';

const {
    validarCampos, 
} = require('../middlewares');
const {
    login
} = require('../controllers/Auth')

const router = Router();

router.post('/login', [
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

export default router;