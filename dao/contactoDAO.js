const models = require("../database/models");

module.exports = {
    findAll: function (cb) {
        // Find all users
        models.contacts.findAll().then(contacts => {
            cb(null, contacts);
        });
    },
    create: function (contact, cb) {
        // Find all users
        return models.sequelize.transaction((t1) => {
            return models.contacts.create(contact).then(contact => {
                return contact;
            });
        }).then(function (result) {
            if (result) {
                console.debug('Resultado despues contacto :::: >', result);
                var contactCreated = result.dataValues;
                cb(null, contactCreated);
            } else {
                cb(null, null);
            }

        }).catch(function (err) {
            cb(err, null);
        });
    },
    update: function (IdContacts, contact, cb) {
        // Find all users
        return models.sequelize.transaction((t1) => {
            return models.contacts.update(contact, {
                where: { IdContacts: IdContacts }
            }).then(contact => {
                return contact;
            });
        }).then(function (result) {
            if (result) {
                console.debug('Resultado despues de actualizar contacto :::: >', contacto);
                cb(null, result);
            } else {
                cb(null, null);
            }
        }).catch(function (err) {
            cb(err, null);
        });
    },
    getById: function (IdContacts, cb) {
        // Find all users
        return models.sequelize.transaction((t1) => {
            return models.contacts.findByPk(IdContacts).then(contact => {
                return contact;
            });
        }).then(function (result) {
            if (result) {
                console.debug('Resultado despues getContact By Id :::: >', result);
                var contact = result.dataValues;
                cb(null, contact);
            } else {
                cb(null, null);
            }
        }).catch(function (err) {
            cb(err, null);
        });
    },
    deleteById: function (IdContacts, cb) {
        // Find all users
        return models.sequelize.transaction((t1) => {
            return models.contacts.destroy({
                where: { IdContacts: IdContacts }
            }).then(deleted => {
                return deleted;
            });
        }).then(function (result) {
            console.log('Resultado despues Eliminar contacto :::: >', result);
            cb(null, result);
        }).catch(function (err) {
            cb(err, null);
        });
    }
}