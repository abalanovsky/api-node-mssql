const express = require('express');
const db = require('../database/db');
const router = express.Router();

const checkContainNumbers = (str) => {
    return /\d/.test(str);
}

router.get('/ping', (req, res) => {
    const message = 'Dogshouseservice.Version1.0.1'
    res.send(message).status(200);
});

router.get('/dogs', async (req, res) => {
    try {
        const { attribute, order, pageNumber, pageSize } = req.query;
        const validAttributes = ['name', 'age', 'weight', 'tail_length'];
        let sortQuery = [];

        if (attribute && !validAttributes.includes(attribute)) {
            return res.status(400).send('Invalid attribute value. Valid attributes are:' +
                ' name, age, tail_length and weight');
        }

        if (attribute && order) {
            if (order !== 'asc' && order !== 'desc') {
                return res.status(400).send('Invalid order value. Valid values are "asc" or "desc".');
            }
            sortQuery.push([attribute, order.toUpperCase()]);
        }

        const limit = pageSize ? parseInt(pageSize) : 10;
        const offset = pageNumber ? (parseInt(pageNumber) - 1) * limit : 0;
        const totalDogsCount = await db.Dog.count();
        const totalPages = Math.ceil(totalDogsCount / limit);

        if (pageNumber && (parseInt(pageNumber) > totalPages || parseInt(pageNumber) < 1)) {
            return res.status(400).send('Invalid pageNumber value. It is out of range.');
        }

        const dogs = await db.Dog.findAll({
            attributes: { exclude: ['id', 'createdAt', 'updatedAt'] },
            order: sortQuery,
            limit,
            offset
        });

        res.status(200).send(dogs);
    } catch (error) {
        console.error(error);
        res.status(500).send(`Server error ${error}`);
    }
});

router.post('/dog', async (req, res) => {
    try {
        const { name, color, tail_length, weight } = req.body
        console.log(name, color, tail_length, weight)
        
        if (!name || name.length > 36 || checkContainNumbers(name)) {
            return res.status(400).send('Name is missing, contain numbers or longer than 36 symbols ');
        } else if (!color || color.length > 22 || checkContainNumbers(color)) {
            return res.status(400).send('Color is missing, contain numbers or longer than 22 symbols ');
        } else if (!tail_length || tail_length < 0 ||
            !checkContainNumbers(tail_length) || !checkContainNumbers(weight) || !weight) {
            return res.status(400).send('Tail length or weight is missing, negative, or contain letters');
        }

        const [addedDog, created] = await db.Dog.findOrCreate({
            where: {name},
            defaults: {
                color,
                tail_length: parseInt(tail_length),
                weight: parseInt(weight)
            }
        })

        if (!created) {
            return res.status(400).send('The dog with this name already exists')
        }
        res.status(201).send(addedDog);
    } catch (error) {
        res.status(500).send(`Server error: ${error}`)
    }
});

module.exports = router;
