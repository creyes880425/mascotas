const mongoose = require('mongoose');


const MascotaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
        minlength: [3, 'El nombre debe tener al menos 3 caracteres']
    },
    tipo: {
        type: String,
        required: [true, 'El tipo es requerido'],
        minlength: [3, 'El tipo debe tener al menos 3 caracteres']
    },
    color: {
        type: String,
        required: [true, 'El color es requerido'],
        minlength: [3, 'El color debe tener al menos 3 caracteres']
    },
    edad: {
        type: Number,
        min:[0, 'No puede ser menor a 0 años'],
        max: [120, 'No puede tener mas de 120 años']
    },
    juguetes: Array,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, 'El usuario es requerido']
    }
}, { timestamps: true });

MascotaSchema.virtual('user', {
    ref: 'User',
    localField: 'userId',
    foreignField: '_id'
});

MascotaSchema.set('toObject', { virtuals: true });
MascotaSchema.set('toJSON', { virtuals: true });

const Mascota = mongoose.model("Mascota", MascotaSchema);

module.exports = Mascota;