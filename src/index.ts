import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import { procedure}  from './config/db/index';


const app = express();

app 
    //to serve dist 
    //GET all hotels
    .get('/*', (req: express.Request, res: express.Response) => {
        procedure("spGetHotels")
        .then((hotels) => {
            res.json(hotels[0])
        })
    });

app.listen(process.env.PORT || 3000, () => {
    console.log(`listening on port ${process.env.PORT || 3000}`);
});