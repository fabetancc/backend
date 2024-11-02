import { Schema, model } from 'mongoose';

const UsuarioSchema = new Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio..']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio.'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria.']
    }

});

UsuarioSchema.methods.toJSON = function(){
    const {__v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
};

export default model('User', UsuarioSchema);