const express = require('express');
const bodyParser = require('body-parser');
const Wappalyzer = require('wappalyzer');
const cors = require('cors');

const path=require('path');

const app = express();

const port = process.env.PORT || 3000;

const options = {
    debug: false,
    delay: 500,
    maxWait: 10000,
    recursive: false,
    userAgent: 'Wappalyzer',
    htmlMaxCols: 2000,

    htmlMaxRows: 2000,
  };
const wappalyzer = new Wappalyzer(options);

// app.use(express.static('public'));
// Middleware to parse the body of the request
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});


// POST route to accept URL
app.post('/getdetails', async (req, res) => {
  const { url } = req.body;
  console.log('Received URL:', url); 
  let rawurl = url;


  // console.log("Main url=",rawurl)
  try {
    console.log("11111111");
    const site = await wappalyzer.open(rawurl);
    console.log("22222222");
    const results = await site.analyze();
    console.log("3333333",results);



    res.json(results);
  } catch (error) {
    console.error('Error analyzing URL:', error);
    res.status(500).json({ error: `Failed to analyze the URL: ${error.message}` });
  }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });