import express from 'express';
const morgan = require("morgan");
import saleRouter  from '@/routes/sale';
import { envs } from './config/env';
const app = express();

app.use(morgan("combined"))
app.use(express.json());
const { PORT, DEFAULT_API_PREFIX } = envs;

app.use(DEFAULT_API_PREFIX, saleRouter);
app.listen(PORT || 8000, () => console.log("MS-VENTAS-BFF STARTED"));