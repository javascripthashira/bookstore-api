import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Bookstore API',
            version: '1.0.0',
            description: 'REST API for managing books and authors',
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Development server',
            },
        ],
        components: {
            schemas: {
                Author: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', format: 'uuid' },
                        name: { type: 'string' },
                        bio: { type: 'string', nullable: true },
                    },
                },
                Book: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', format: 'uuid' },
                        title: { type: 'string' },
                        price: { type: 'number' },
                        stock: { type: 'integer' },
                        publishedAt: { type: 'string', format: 'date-time' },
                        authorId: { type: 'string', format: 'uuid' },
                        author: { $ref: '#/components/schemas/Author' },
                        genres: {
                            type: 'array',
                            items: { type: 'string' },
                        },
                    },
                },
                Genre: {
                    type: 'object',
                    properties: {
                        id: { type: 'string', format: 'uuid' },
                        name: { type: 'string' },
                    },
                },
            },
        },
    },
    apis: ['./src/modules/**/*.routes.ts'],
};

export const swaggerSpec = swaggerJsdoc(options);