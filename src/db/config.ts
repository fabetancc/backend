import mongoose, { ConnectOptions } from 'mongoose';

const dbConnection = async() => {

    try {
        
        await mongoose.connect(process.env.MONGODB_CNN || 'mongodb+srv://fabetancc:yR7YaRhIVAimwArN@cluster0.n4oz5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

        console.log('Base de datos online.');

    } catch (error) {
        throw new Error('Error al conectarse con la base de datos.');
    }

};

export default dbConnection;