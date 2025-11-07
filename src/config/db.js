const mongoose = require('mongoose')

async function connectDB(uri) {
    try{
        mongoose.set('strictQuery', true)
        await mongoose.connect(uri, {
            autoIndex: true,
        })
        console.log('[DB] Conectado a MongoDB')
    }catch(err){
        console.error('[DB] Error de conexion:', err.message )
        process.exit(1)
    }
}

module.exports = {connectDB}