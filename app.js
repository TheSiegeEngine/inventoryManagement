const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const models = require('./models');
const path = require('path');
const PORT = process.env.port || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res, next) => {
    console.log("hey");
    res.sendfile('./public/index.html');
});

app.post('/add/:name/:quantity?/:price?', (req, res, next) => {
    let item = req.params;
    models.items
        .create({
            name: item.name,
            quantity: item.quantity,
            price: item.price
        })
        .then(item => {
            res.send(`${item.name} added successfully`);
        });
});

app.delete(
    '/sub/:name?',
    (req, res, next) => {
        models.items
            .destroy({
                where: {
                    name: req.params.name
                }
            })
            .then(rowDeleted => {
                if (rowDeleted >= 1) {
                    res.send(`${req} deleted from inventory`);
                }
            });
    },
    err => {
        console.log(`Error: ${err}`);
    }
);

app.get('/list', (req, res, next) => {
    models.items.findAll().then(items => {
        res.send(items);
    });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
