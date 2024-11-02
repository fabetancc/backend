import { Schema, model } from 'mongoose';

const TaskSchema = new Schema({

    descripcionCorta: {
        type: String,
        required: [true, 'La descripción corta es obligatoria']
    },
    descripcionLarga: {
        type: String,
        required: [true, 'La descripción larga es obligatoria']
    },
    estado: {
        type: Boolean,
        default: false
    },
    fechaCreacion: {
        type: String,
        default: Date.now
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

});

export default model('Task', TaskSchema);