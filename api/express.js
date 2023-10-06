const mongoose = require('mongoose');
const express = require('express')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const app = express()
const port = 4000
const cors = require('cors');
//explain what the dotenv package does
dotenv.config();
console.log(process.env.jwt_secret);
//allow request from different port origins
const corsOptions = {
  origin: 'http://127.0.0.1:5501',
  //allow post requests
  methods: "GET,PUT,PATCH,POST,DELETE",
   // Update this to match your frontend's origin
};

//require models
const Destination = require('../schemas/destination.js');
const User = require('../schemas/user.js');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true}))
app.use(cors(corsOptions));


//connect to db
/* mongoose.connect('mongodb://127.0.0.1:27017/destinations')
.catch(error => console.log(error)); */






//Listen for GET requests
app.get('/destinations/:destinationId', (req, res) => {
    //it knows what the id is because of the :id on the line above
  
    res.status(200).json("You requested a destination with an id");
})

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

//user signup request

app.post("/auth/signup", (req, res) => {
  mongoose
    .connect('mongodb://127.0.0.1:27017/travel_destinations_ola')
    .then(() => {
      console.log("MongoDB Connected...");


        const insertedUser = new User({
          email: req.body.email,
          password: req.body.password,
        });

        // saving destination to the database
        insertedUser
          .save()
          .then((result) => {
            console.log(result);
            res.status(201).json(insertedUser); //remove encoded password before sending it back
          })
          .catch((err) => {
          res.status(500).json({ error: "Error Saving User:", err })
      })
        /*   .finally(() => {
            console.log("MongoDB Connection Closed");
            mongoose.disconnect();
          }); */
      
    })
    .catch((error) => console.log(error));
});


app.post('/auth/login', (req, res) => {
  User.findOne({email: req.body.email}).then(user => {
      if (user.password === req.body.password) { // Comparing clear text passwords, for now. DONT DO THIS!!!
          const generatedToken = jwt.sign({_id: user._id}, process.env.jwt_secret);
          res.status(200).json({token: generatedToken})
      }
      res.status(401).json({message: 'Invalid login'}); // email match, but password does not!
      return;
  }).catch(error => {
      res.status(401).json({message: 'Invalid login'}); // email does not match.
  })
  
});

app.listen(port, () => {
  console.log(`server init at: localhost:${port}`)
})

