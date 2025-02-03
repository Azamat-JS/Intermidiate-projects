const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: 'CRM panel API',
      version: '1.0.0',
      description: 'CRM panel for education centers',
    },
  },
  apis: ['./routes/*.js']
};

  const swaggerDocs = swaggerJSDoc(swaggerOptions);

  module.exports = swaggerDocs