//const { create, edit,del, get, list } = require('../controllers/mascota.controller');
const MarcotaController = require('../controllers/mascota.controller');
const { authenticate } = require('../config/jwt.config');

module.exports = app => {
    app.get('/api/mascotas', authenticate, MarcotaController.list);
    app.get('/api/mascotas/:id', authenticate, MarcotaController.get);
    app.post('/api/mascotas', authenticate, MarcotaController.create);
    app.put('/api/mascotas/:id', authenticate, MarcotaController.edit);
    app.delete('/api/mascotas/:id', authenticate, MarcotaController.del);
}