import * as express from 'express';
import * as path from 'path';
import { procedure } from './config/db/index';


const app = express();

app.get('/*', (req: express.Request, res: express.Response) => {
        procedure("spGetResturants")
        .then((restaurants) => {
            res.json(restaurants[0])
        })
    });

 app.get('/:id',  (req:express.Request, res: express.Response ) => {
    procedure("spGetRestaurant")
    .then((restaurants) => {
        res.json(restaurants[1])
    })
 });   

app.listen(process.env.PORT || 3000, () => {
    console.log(`listening on port ${process.env.PORT || 3000}`);
});