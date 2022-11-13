const mongoose = require('mongoose')
const Schema = mongoose.Schema
const multaSchema = new Schema({

    valor: {
        type: 'Number',
        required: true
    },
    tipo: {
        type:'String',
        required: true,
        enum:[
            'sancion leve',
            'sancion media',
            'sancion alta',
            'por cancelacion'
        ]
    },
    fecha:{
        type:'String',
        required:true
    },
    hora:{
        type:'String',
        required:true
    },
    vecino: {
        type: Schema.ObjectId,
        ref: 'vecino',
        required: true
    }
})
module.exports = mongoose.model('multa', multaSchema)


