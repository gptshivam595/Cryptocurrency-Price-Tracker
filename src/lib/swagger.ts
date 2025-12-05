import { createSwaggerSpec } from 'next-swagger-doc';

export const getApiDocs = async () => {
    const spec = createSwaggerSpec({
        apiFolder: 'src/app/api',
        definition: {
            openapi: '3.0.0',
            info: {
                title: 'Crypto Price Tracker API',
                version: '1.0',
            },
            components: {
                securitySchemes: {
                    ApiKeyAuth: {
                        type: 'apiKey',
                        in: 'header',
                        name: 'x-api-key',
                    },
                    BearerAuth: {
                        type: 'http',
                        scheme: 'bearer',
                    },
                },
            },
            security: [
                {
                    ApiKeyAuth: [],
                },
                {
                    BearerAuth: [],
                },
            ],
        },
    });
    return spec;
};
