const express = require('express')
const app = express()
const port = 4000
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require('cors');



let connectionString = 'mongodb://127.0.0.1:27017/'



// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(connectionString,  {
  serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
  }
}
);

const db = client.db("travel_destinations_ola");
const destCollection = db.collection("destinations");

app.use(express.json({limit: '25mb'}));
app.use(express.urlencoded({extended: true}))
app.use(cors());



//Listen for GET requests
app.get('/destinations/:destinationId', (req, res) => {
    //it knows what the id is because of the :id on the line above
  
    res.status(200).json("You requested a destination with an id");
})
app.get('/destinations/', async (req, res) => {
    const result = await destCollection.find().toArray();
    console.log(result);
    res.status(200).send(result);
    })

//Listen for POST requests
app.post('/destination',  async (req, res) => {


        const doc = {
           title: req.body.title,
           country: req.body.country,
            arrival_date: req.body.arrival_date,
            departure_date: req.body.departure_date,
            image: req.body.image,
            description: req.body.description
         }
     await destCollection.insertOne(doc);
   
    res.status(201).send("Destination added");
  })


app.listen(port, () => {
  console.log(`server init at: localhost:${port}`)
})

 
