import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Ventas',
    description: 'API de Ventas para AR Detailing'
  },
  host: 'localhost:8000',
  // components: {
  //   schemas: {
  //   }
  // }
};

const outputFile = '../../openapi-contract.json';
const routes = [
  '../routes/sale.ts'
];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen({openapi: "3.0.3"})(outputFile, routes, doc);