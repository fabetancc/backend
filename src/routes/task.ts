import { Router } from 'express';
import { check } from 'express-validator';

const {
    validarCampos,
} = require('../middlewares');

import {
    actualizarTask,
    eliminarTask,
    finalizarTask,
    guardarTask,
    obtenerTasks
} from '../controllers/Task';
import { validarJWT } from '../middlewares';

const router = Router();

router.get('/', validarJWT, obtenerTasks);
router.delete('/eliminar/:id', validarJWT, eliminarTask);
router.put('/finalizar', validarJWT, finalizarTask);

router.put('/', [
    check('descripcionCorta', 'La descripción corta es obligatoria y debe tener mínimo 4 caracteres y máximo 15').isLength({
        min: 4,
        max: 15
    }),
    check('descripcionLarga', 'La descripción larga es obligatoria y debe tener mínimo 6 caracteres').isLength({
        min: 6
    }),
    validarJWT,
    validarCampos
], actualizarTask);

router.post('/', [
    check('descripcionCorta', 'La descripción corta es obligatoria y debe tener mínimo 4 caracteres y máximo 15').isLength({
        min: 4,
        max: 15
    }),
    check('descripcionLarga', 'La descripción larga es obligatoria y debe tener mínimo 6 caracteres').isLength({
        min: 6
    }),
    validarJWT,
    validarCampos
], guardarTask);

export default router;