import express from 'express';
import { Request, Response } from 'express';
import { TypedRequestBody } from './types/req-body-type';
import { PrismaClient } from '../src/generated/prisma';

const prisma = new PrismaClient();

const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('Hello from TypeScript Express!');
});

app.post('/add/score', async (req: TypedRequestBody<{ stage: number, teamId: number, score: number }>, res: Response) => {
    try {
        const { stage, teamId, score } = req.body;
        const result = await prisma.score.create({
            data: {
                stage,
                teamId,
                score
            }
        });
        res.status(200).send(result);
    } catch (error) {
        res.status(400).send(error);
    }
});

app.get('/get/:teamId', async (req: Request, res: Response) => {
    const { teamId } = req.params;
    const teamIdNumber = parseInt(teamId, 10);

    if (isNaN(teamIdNumber)) {
        res.status(400).send('Invalid teamId');
        return;
    }

    try {
        const queryResult = await prisma.score.findMany({
            where: {
                teamId: teamIdNumber
            }
        });
        res.status(201).send(queryResult);
    } catch (error) {
        res.status(500).send(error)
    }
});
