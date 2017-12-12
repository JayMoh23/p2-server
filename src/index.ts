import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import { procedure}  from './config/db/index';
import * as axios from 'axios';
import { formatYelpSearchUrl } from './middleware/utils'

const exp = require('express')
const bp = require('body-parser')
const app = express();
const apiKey = 'RrgYj2_KwycE8D9-H3B6P1QuWGLSy1Cloc5RtWwVzvl_pt0_4QUO8VJv7y1KjItWOmQccm9_ZaWqwislMaZkxCJiIQQEr5FXsYK3A3uBaw_l-5so2fOLyoF2PbguWnYx';

app.use(bp.json())
app.use(bp.urlencoded({extended: true}))

// GET all dishes
 app.get('/db/dishes', (req: express.Request, res: express.Response, next: express.NextFunction ) => {
    procedure("spGetDishes")
    .then((dishes) => {
        res.json(dishes[0])
    })
 }); 

 //GET one dish
 app.get('/db/dishes/:id', (req: express.Request, res: express.Response, next: express.NextFunction ) => {
    procedure("spGetDish", [+req.params.id])
    .then((dish) => {
        res.json(dish[0][0])
    })
 });

 //POST a new dish 
 app.post("/db/dishes", (req:express.Request, res:express.Response, next:express.NextFunction)=> {
    procedure("spInsertDish",[req.body.name, req.body.ingredients, req.body.date, req.body.itsavaliable, req.body.rating])
    .then((dish) => {
        return res.json(dish)   
    })
});

//GET ingredients for one dish


//POST new ingredients for a dish
app.post("/db/ingredients", (req:express.Request, res:express.Response, next:express.NextFunction)=> {
    procedure("spInsertIngredients",[req.body.name])
    .then((i) => {
        return res.json(i)
    })
});
 
//  GET results from terms searched in Yelp API
 app.get('/db/restaurants', (req: express.Request, res: express.Response, next: express.NextFunction) => {
    axios.default.get(formatYelpSearchUrl(req.query.term), {
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        })
        .then((results) => {
            res.send(results.data);
        });
 });

app.listen(process.env.PORT || 3000, () => {
    console.log(`listening on port ${process.env.PORT || 3000}`);
});