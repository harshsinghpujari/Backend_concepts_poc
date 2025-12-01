import express from 'express';
import './scheduler3.js';


const app = express();

const port = 3000;

app.use(express.json());

app.listen(port, () => {
  console.log("App is listening at port: ", port)
}) 