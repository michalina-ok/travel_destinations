const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express()
const port = 4000

app.use(express.json());
app.use(express.urlencoded({extended: true}))


let uri = 'mongodb://127.0.0.1:27017/'

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri,  {
  serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
  }
}
);

const db = client.db("travel_destinations_ola");
const destCollection = db.collection("destinations");


//Listen for GET requests
app.get('/destinations/:destinationId', (req, res) => {
    //it knows what the id is because of the :id on the line above
  
    res.status(200).send("You requested a destination with an id");
})
app.get('/destinations/', async (req, res) => {
    const result = await destCollection.find().toArray();
    console.log(result);
    res.status(200).json(result);
    })

//Listen for POST requests
app.post('/destinations/', async (req, res) => {
    const newDestination = req.body;
    const result = await destCollection.insertOne(newDestination);
    console.log(req.body);
    res.status(201).json(result.ops);
  })

//Listen for PUT requests
app.put('/destinations/:destinationId', (req, res) => {
    console.log(req.params.destinationId);
    res.status(200).send("Updated a destination");
  })

  //Listen for DELETE requests
  app.delete('/destinations/:destinationId', (req, res) => {
    res.status(204).end();
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

