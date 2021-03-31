const express = require('express');
const router = express();

const Person = require('../../models/person');
const Memory = require('../../models/memory');

router.get('/', (req, res, next) => {
    Memory.find()
    .then(memories => {
        res.status(200).json(memories);
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: "Failed to get memories"
        })
    })
})

router.get("/:personId", (req, res, next) => {
    Person.findOne({ _id: req.params.personId })
    .populate('memories')
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: "Failed to get person and populate memories"
        })
    })
})

router.get('/memory/:memoryId', (req, res, next) => {
    Memory.findOne({ _id: req.params.memoryId })
    .then(memory => {
        res.status(200).json(memory);
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: "Error getting memory"
        })
    })
})

router.post("/memory/:personId", (req, res, next) => {
    const memory = new Memory({
        event: req.body.event,
        year: req.body.year
    });

    memory.save()
    .then(result => {
        Person.findOne({_id: req.params.personId})
        .then(person => {
            person.memories.push(memory);
            person.save()
            .then(result => {
                res.status(201).json(memory)
            })
            .catch(err => {
                res.status(500).json({
                    err: err,
                    message: "Unable to save new memory to person"
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: "Unable to find person"
            })
        })
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: "Unable to save memory"
        })
    })
})

router.put('/memory/:memoryId', (req, res, next) => {

    Memory.findOne({_id: req.params.memoryId })
    .then(memory => {
        memory.event = req.body.event;
        memory.year = req.body.year;
        memory.save()
        .then(updatedMemory => {
            res.status(201).json(updatedMemory)
        })
        .catch(err => {
            res.status(500).json({
                err: err,
                message: "Failed to save updated memory"
            })
        })
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: "Failed to find memory"
        })
    })
})

router.delete('/memory/:personId/:memoryId', (req, res, next) => {
    Person.findOne({_id: req.params.personId})
    .then(person => {
        let i = 0;
        person.memories.forEach(memory => {
            if(memory == req.params.memoryId) {
                person.memories.splice(i, 1);
            }
            i++;
        })

        person.save();
    })


    Memory.findOne({ _id: req.params.memoryId })
    .then(memory => {
        memory.delete()
        .then(result => {
            res.status(204).json({
                message: "Memory deleted successfully"
            });
        })
        .catch(error => {
            res.status(500).json({
            memory: 'An error occurred',
            error: error
        });
        })
    })
    .catch(error => {
        res.status(500).json({
        memory: 'Memory not found.',
        err: error
        });
    });
})

module.exports = router;