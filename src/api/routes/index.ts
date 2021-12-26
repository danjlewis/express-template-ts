import express from 'express';

const router: express.Router = express.Router();

router.get('/ping', (req: express.Request, res: express.Response) => {
    res.sendStatus(200);
});

export default router;
