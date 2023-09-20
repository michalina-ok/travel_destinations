const http = require('http')
const { MongoClient, ServerApiVersion } = require("mongodb");
const hostname = "127.0.0.1";
const port = 4000;

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


const server = http.createServer((req, res) => { 
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');


    if(req.method === 'POST') {
      let body = '';

      req.on('data', chunk => {
        body += chunk.toString();
      });


      req.on('end',  () => {
        const parsedBody = JSON.parse(body);
         run(parsedBody).then(function(id) {
          res.writeHead(201, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ destination: id}));
        });
      });
    } 
  });

server.listen(port, hostname, () => {
    console.log(`server running at http://${hostname}:${port}/`)
});










