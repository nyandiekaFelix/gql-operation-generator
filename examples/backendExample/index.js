import express from 'express';
import bodyParser from 'body-parser';


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(8888, () => {
  console.log(`App listening on port ${app.get('port')}`);
});
