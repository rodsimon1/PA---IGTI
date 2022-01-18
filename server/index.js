import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import itemsRoutes from './routes/items.js';

const app = express();
dotenv.config();

app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));

app.use(cors());

app.use('/items', itemsRoutes);

app.get('/', (req, res) => {
  res.send('Olá para o API do Projeto Aplicado IGTI de Rodrigo');
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.log(err.message);
  });

// mongoose.set('useFindAndModify', false); --> CRASHING
