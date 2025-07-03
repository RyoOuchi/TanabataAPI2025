"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const prisma_1 = require("../src/generated/prisma");
const cors_1 = __importDefault(require("cors"));
const prisma = new prisma_1.PrismaClient();
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)({
    origin: '*', // or restrict to your frontend URL
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'ngrok-skip-browser-warning']
}));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Hello from TypeScript Express!');
});
app.post('/add/score', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { stage, teamId, score } = req.body;
        const result = yield prisma.score.create({
            data: {
                stage,
                teamId,
                score
            }
        });
        res.status(200).send(result);
    }
    catch (error) {
        res.status(400).send(error);
    }
}));
app.get('/get/:teamId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { teamId } = req.params;
    const teamIdNumber = parseInt(teamId, 10);
    if (isNaN(teamIdNumber)) {
        res.status(400).send('Invalid teamId');
        return;
    }
    try {
        const queryResult = yield prisma.score.findMany({
            where: {
                teamId: teamIdNumber
            }
        });
        res.status(201).send(queryResult);
    }
    catch (error) {
        res.status(500).send(error);
    }
}));
app.get('/get-all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("GET /get-all route hit");
    try {
        const queryResult = yield prisma.score.findMany();
        res.status(200).json(queryResult);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Something went wrong' });
    }
}));
app.delete('/delete-all', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deleteResult = yield prisma.score.deleteMany();
        res.status(200).json({
            message: 'All scores deleted successfully',
            deletedCount: deleteResult.count
        });
    }
    catch (error) {
        console.error('Error deleting scores:', error);
        res.status(500).json({ error: 'Something went wrong while deleting scores' });
    }
}));
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
