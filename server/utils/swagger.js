const swaggerJSDoc = require('swagger-jsdoc');


const swaggerOptions = {
    swaggerDefinition: {
      info: {
        title: 'Payment API',
        version: '1.0.0',
        description: 'API for handling payments for students',
      },
    },
    apis: ['../routes/*.js']
}
  const swaggerDocs = swaggerJSDoc(swaggerOptions);

  module.exports = swaggerDocs