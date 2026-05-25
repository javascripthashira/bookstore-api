import 'dotenv/config';
import app from './app';
import { prisma } from './library/prisma';

const PORT = process.env.PORT ?? 5000;

async function main() {
    try {
        await prisma.$connect();
        console.log('✅ Database connected');

        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
            console.log(`📚 Swagger UI at http://localhost:${PORT}/api-docs`);
        });
    } catch (error) {
        console.error('❌ Failed to start server:', error);
        await prisma.$disconnect();
        process.exit(1);
    }
}

main();