const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Destination = require('../schemas/destination.js');

const app = express();
const port = 4000;
let connectionString = 'mongodb://127.0.0.1:27017/';
//allow request from different port origins
const corsOptions = {
  origin: 'http://127.0.0.1:5501', // Update this to match your frontend's origin
};

const options = {
  origin: ["http://127.0.0.1:5501/form.html", "http://127.0.0.1:5501"],
  methods: ["GET", "POST"],
  allowedHeaders: ["X-Requested-With,content-type"],
};


// middleware
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true}))
app.use(cors(corsOptions));


//Listen for GET requests
app.get('/destinations/:destinationId', (req, res) => {
    //it knows what the id is because of the :id on the line above
    res.status(200).json("You requested a destination with an id");
})



app.get('/destinations', cors(options),  (req, res) => {
  mongoose.connect(`${connectionString}`)
  .then(() => {
    console.log("connected to mongoDB");
    Destination.find({}).then(result => {
        console.log(result);
        res.status(200).json(result)
    }).catch(err => {
        res.status(500).json(err);
    })
   /*  .finally(() => {
      console.log("disconnected from mongoDB");
      mongoose.disconnect();
    }); */
  })

})


//Listen for POST requests
app.post('/destination',  async (req, res) => {
  console.log(req.body, "req.body");
  
  const destination = new Destination({
    title: req.body.title,
    country: req.body.country,
    arrival_date: req.body.arrival_date,
    departure_date: req.body.departure_date,
    image: req.body.image,
    description: req.body.description,
    link: req.body.link
  });

  try {
    const newDestination = await destination.save();
    console.log(newDestination, "newDestination");
    res.status(201).json(newDestination);
  } catch (err) {
    res.status(500).send({message: err.message});
  }

 /*  await destCollection.insertOne(destination); */
   
   /*  res.status(201).send("Destination added"); */
  })



  // Start the Express server
  app.listen(port, () => {
    console.log(`server init at: localhost:${port}`)
  });


 
