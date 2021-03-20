var express = require('express');
var router = express.Router();

const sequenceGenerator = require('./sequenceGenerator');
const Contact = require('../models/contact');

router.get('/', (req,res,next) => {
    Contact.find()
        .populate('group')
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

        
router.post('/', (req, res, next) => {
    const maxContactId = sequenceGenerator.nextId("contacts");

    const contact = new Contact({
        id: maxContactId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        imageUrl: req.body.imageUrl
    });

    contact.save()
        .then(createdContact => {
            res.status(201).json({
            message: 'Contact added successfully',
            contact: createdContact
            });
        })
        .catch(error => {
            res.status(500).json({
                message: 'An error occurred',
                error: error
            });
        });
});

    
router.put('/:id', (req, res, next) => {
    Contact.findOne({ id: req.params.id })
    .then(contact => {
        contact.name = req.body.name;
        contact.description = req.body.description;
        contact.url = req.body.url;

        Contact.updateOne({ id: req.params.id }, contact)
        .then(result => {
            res.status(204).json({
            contact: 'Contact updated successfully'
            })
        })
        .catch(error => {
            res.status(500).json({
            contact: 'An error occurred',
            error: error
        });
        });
    })
    .catch(error => {
        res.status(500).json({
        contact: 'Contact not found.',
        error: { Contact: 'Contact not found'}
        });
    });
});

    
router.delete("/:id", (req, res, next) => {
    Contact.findOne({ id: req.params.id })
    .then(contact => {
        Contact.deleteOne({ id: req.params.id })
        .then(result => {
            res.status(204).json({
            contact: "Contact deleted successfully"
            });
        })
        .catch(error => {
            res.status(500).json({
            contact: 'An error occurred',
            error: error
        });
        })
    })
    .catch(error => {
        res.status(500).json({
        contact: 'Contact not found.',
        error: { contact: 'Contact not found'}
        });
    });
});

module.exports = router; 