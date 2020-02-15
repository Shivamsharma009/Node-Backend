const fs = require('fs');
const express = require('express');
const app = express();

//app.get('/', (req, res) => {
//  res.status(200).json({
//    message: 'Hello from the Server Side!',
//  app: 'Natours'
// });
//});

//Middleware
app.use(express.json());

//app.post('/', (req, res) => {
//  res.send('You can post to this endpoint.......');
//});

const tours = JSON.parse(
    fs.readFileSync('./dev-data/data/tours-simple.json')
);

app.get('/api/v1/tours', (req, res) => {
    res.status(200).json({
        status: 'sucess',
        results: tours.length,
        data: {
            tours
        }
    });
});

app.post('/api/v1/tours', (req, res) => {
    //console.log(req.body);
    //res.send('Done');

    const newID = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({
            id: newID
        },
        req.body);

    tours.push(newTour);

    // res.send('Done');
    fs.writeFile('./dev-data/data/tours-simple.json',
        JSON.stringify(tours),
        err => {
            res.status(201).json({
                status: 'sucess',
                data: {
                    tour: newTour
                }
            });
        });
});

const port = 3000;
app.listen(port, () => {
    console.log('App running on port ' + port + '........');
});