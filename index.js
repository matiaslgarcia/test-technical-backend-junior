import express from 'express';
import dotenv from 'dotenv';
import router from './src/router/index.js';
import errorController from './src/controller/error/index.controller.js'

dotenv.config();

const { PORT } = process.env;

const app = express();

app.use(express.json())
app.use(router);
app.use(errorController)

app.listen(PORT, () => {
    console.log(`Server running on PORT: ${PORT}`);
})