import * as express from 'express';
import * as path from 'path';

const app = express();

app 
    //to serve dist 
    .use(express.static(path.join(__dirname + '/../dist')))
    .get('/*', (req: express.Request, res: express.Response) => {
        res.sendFile(path.join(__dirname + '/../dist/index.html'));
    });

app.listen(process.env.PORT || 3000, () => {
    console.log(`listening on port ${process.env.PORT || 3000}`);
});