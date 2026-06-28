import swaggerJsdoc from "swagger-jsdoc";
import path from "path";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PWA Music API",
      version: "1.0.0",
    },
  },
  apis: [path.resolve("docs/swagger.yaml")],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;