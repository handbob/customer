import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { ValidationPipe } from '@nestjs/common'

import * as dotenv from 'dotenv'

// Bootstrap function to initialize the NestJS application
const bootstrap = async (): Promise<void> => {
  // Load environment variables from .env file
  dotenv.config();

  // Create a new NestJS application instance
  const app = await NestFactory.create(AppModule);

  // Retrieve the port number from environment variables
  const port = process.env.PORT;

  // Apply global validation pipe for DTO validation
  app.useGlobalPipes(new ValidationPipe());

  // Configure Swagger for API documentation
  const config = new DocumentBuilder()
    .setTitle('Customer Evidence API')
    .setDescription('API documentation for Customer Evidence')
    .setVersion('1.0')
    .build();

  // Create Swagger document based on the configuration
  const document = SwaggerModule.createDocument(app, config);

  // Setup Swagger module at the '/api' endpoint
  SwaggerModule.setup('api', app, document);

  // Start the application and listen on the specified port
  await app.listen(port);

  // Log the application URL to the console
  console.log(`Application is running on: ${await app.getUrl()}`);

  // Log the Swagger documentation URL to the console
  console.log(`Swagger docs available at: ${await app.getUrl()}/api`);
};

// Invoke the bootstrap function to start the application
bootstrap();
