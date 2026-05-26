import express, { Router } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';
import { errorHandler } from './middleware/errorHandler';

// Route imports — uncomment as you build each module
import bookRoutes from './modules/Books/books.routes';
import authorRoute from './modules/Authors/authors.routes';

const app = express();

// ── Middleware ────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
    cors({
        origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
);

app.use(morgan('dev'));

// ── Swagger UI ────────────────────────────────────────────
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ── Routes ────────────────────────────────────────────────
app.use('/books', bookRoutes);
app.use("/authors", authorRoute);

// ── Health check ──────────────────────────────────────────
app.get('/health', (_req, res) => {
    res.json({ status: 'ok' });
});



// ── Global error handler (must be last) ───────────────────
app.use(errorHandler);

export default app;