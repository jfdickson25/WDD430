const express = require('express');
const router = express();

const Person = require('../../models/person');
const Memory = require('../../models/memory');
const { create } = require('../../models/person');

router.get('/', (req, res, next) => {
    Person.find()
    .then(response => {
        if(!response) {
            return res.status(500).json({
                message: "Error occured while retrieving data"
            })
        }
        res.status(200).json(response);
    })
});

router.get('/:id', (req, res, next) => {
    Person.findOne({_id: req.params.id})
    .then(person => {
        res.status(200).json(person);
    })  
    .catch(err => {
        res.status(500).json({err: err})
    })
})

router.post('/', (req, res, next) => {
    const person = new Person({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        imgUrl: req.body.imgUrl
    })

    person.save()
    .then(createdPerson => {
        res.status(201).json(createdPerson);
    })
    .catch(error => {
        res.status(500).json({
            message: 'An error occurred',
            error: error
        });
    });
});

router.put('/:id', (req, res, next) => {
    Person.findOne({ _id: req.params.id })
    .then(person => {
        person.firstName = req.body.firstName;
        person.lastName = req.body.lastName;
        person.imgUrl = req.body.imgUrl;

        person.save()
        .then(updatedPerson => {
            res.status(201).json(updatedPerson);
        })
        .catch(error => {
            res.status(204).json({
                message: 'An error occured while attempting to update person',
                error: error
            });
        });
    })
    .catch(error => {
        res.status(204).json({
            message: 'An error occured while attempting to find person',
            error: error
        });
    });
});

    
router.delete("/:id", (req, res, next) => {

    Person.findOne({_id: req.params.id })
    .then(person => {
        person.memories.forEach(memory => {
            console.log("Deleting memory: ", memory);
            Memory.findOne({_id: memory})
            .then(memory => {
                memory.delete();
            })
            .catch(err => {
                res.status(500).json({
                    err: err,
                    message: "Failed to find memory"
                })
            })
        })

        person.delete()
        .then(result => {
            res.status(204).json({
                person: "Person deleted successfully"
            });
        })
        .catch(error => {
            res.status(500).json({
                person: 'An error occurred',
                error: error
            });
        });
    });
    
});

module.exports = router;