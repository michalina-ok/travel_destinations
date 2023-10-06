const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
var passport = require("passport");
var passportJWT = require("passport-jwt");
const cors = require('cors');
const app = express()
const port = 4000
dotenv.config();


console.log(process.env.jwt_secret);

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true}))

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.jwt_secret
};
const strategy = new JwtStrategy(jwtOptions, async function(jwt_payload, next) {
  const user = await User.findOne({ _id: jwt_payload._id});
  console.log("user found", user);
  if (user) {
    next(null, user);
  } else {
    next(null, false);
  }
});
passport.use(strategy);
app.use(passport.initialize());




//allow request from different port origins
const corsOptions = {
  origin: 'http://127.0.0.1:5501',
  //allow post requests
  methods: "GET,PUT,PATCH,POST,DELETE",
   // Update this to match your frontend's origin
};
app.use(cors(corsOptions));

//require models
const Destination = require('../schemas/destination.js');
const User = require('../schemas/user.js');



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

//LISTEN FOR DELETE REQUESTS
app.delete('/destinations/:destinationId', passport.authenticate('jwt', {session: false}), (req, res) => {

  if (mongoose.connection.readyState !== 1) {
    return res.status(500).json({ message: 'Database not connected' });
  }

  console.log('Decoded token:', req.user);
  Destination.deleteOne({_id: req.params.destinationId}).then( result => {
      res.status(200).json({message: 'Success'});
  })
  
})



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

  User.findOne({email: req.body.email}).then( async (user) => {
      if(await user.isValidPassword(req.body.password)) {
        console.log("user found", user);
          const generatedToken = jwt.sign({_id: user._id}, process.env.jwt_secret);
          res.status(200).json({token: generatedToken})
          return;
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

