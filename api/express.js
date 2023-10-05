const mongoose = require('mongoose');
const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');
//allow request from different port origins
const corsOptions = {
  origin: 'http://127.0.0.1:5501',
  //allow post requests
  methods: "GET,PUT,PATCH,POST,DELETE",
   // Update this to match your frontend's origin
};

//require models
const Destination = require('../schemas/destination.js');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true}))
app.use(cors(corsOptions));


//connect to db
/* mongoose.connect('mongodb://127.0.0.1:27017/destinations')
.catch(error => console.log(error)); */






//Listen for GET requests
app.get("/destinations/:destinationId", (req, res) => {
  const destinationId = req.params.destinationId
  console.log(destinationId, "destinationId");

  mongoose
    .connect('mongodb://127.0.0.1:27017/travel_destinations_ola')
    .then(() => {
      console.log("MongoDB Connected...");
      Destination.findById(destinationId)
        .then((destination) => res.status(200).json(destination))
        .catch((err) => res.status(500).json({ error: "Error Fetching Destinations:", err }))
        .finally(() => {
          console.log("MongoDB Connection Closed");
          mongoose.disconnect();
        });
    })
    .catch((error) => console.log(error));
});


/* app.get('/destinations/:destinationId', (req, res) => {
    //it knows what the id is because of the :id on the line above
 
  
    res.status(200).json("You requested a destination with an id");
}) */


//Listen for GET requests
    app.get("/destinations", (req, res) => {
      mongoose
        .connect('mongodb://127.0.0.1:27017/travel_destinations_ola')
        .then(() => {
          console.log("MongoDB Connected...");
          Destination.find()
            .then((destinations) => res.status(200).json(destinations))
            .catch((err) => res.status(500).json({ error: "Error Fetching Destinations:", err }))
            .finally(() => {
              console.log("MongoDB Connection Closed");
              mongoose.disconnect();
            });
        })
        .catch((error) => console.log(error));
    });

//Listen for POST requests
  app.post("/destinations", (req, res) => {
    mongoose
      .connect('mongodb://127.0.0.1:27017/travel_destinations_ola')
      .then(() => {
        console.log("MongoDB Connected...");
        if (req.body.country && req.body.title) {
          const destination = new Destination({
            title: req.body.title,
            country: req.body.country,
             arrival_date: req.body.arrival_date,
             departure_date: req.body.departure_date,
             image: req.body.image,
             description: req.body.description,
             link: req.body.link
          });
  
          // saving destination to the database
          destination
            .save()
            .then((response) => {
              const resID = new mongoose.Types.ObjectId(response.insertedId);
              console.log(resID);
              res.status(201).json({ insertedID: resID });
            })
            .catch((err) => console.error("Error Saving Destination:", err))
            .finally(() => {
              console.log("MongoDB Connection Closed");
              mongoose.disconnect();
            });
        }
      })
      .catch((error) => console.log(error));
  });




app.listen(port, () => {
  console.log(`server init at: localhost:${port}`)
})

 
