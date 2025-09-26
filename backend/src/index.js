import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import clientsRoutes from './routes/clients.js';
import requestsRoutes from './routes/requests.js';
import attachmentRoutes from "./routes/attachments.js";
import guaranteesRoutes from './routes/guarantees.js';
import followUpsRoutes from './routes/followUps.js';
import fullCreditRequestRoutes from './routes/fullCreditRequest.js';
import authRoutes from './routes/authRoutes.js';
import 'dotenv/config'; 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsPath = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsPath)) {
  fs.mkdirSync(uploadsPath);
}

const app = express();


app.use(cors({
  origin: [
    'http://localhost:3001', 
    'http://localhost:3000', 
    'https://hoppscotch.io' 
  ]
}));


app.use(express.json());
app.use('/uploads', express.static(uploadsPath));
app.use('/credit-requests/full', fullCreditRequestRoutes);


app.use('/clients', clientsRoutes);
app.use('/requests', requestsRoutes);
app.use('/attachments', attachmentRoutes);
app.use('/guarantees', guaranteesRoutes);
app.use('/follow-ups', followUpsRoutes);
app.use('/auth', authRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
