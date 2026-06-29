import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PWA Music API",
      version: "1.0.0",
      description: "Documentación de la API",
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: [path.resolve("docs/swagger/swagger.yaml")],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;