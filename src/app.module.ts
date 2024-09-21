import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { DataModule } from './data/data.module'
import { Customer } from './data/entities/customer.entity'

// Root application module
@Module({
  imports: [
    // Load environment variables and make them globally available
    ConfigModule.forRoot({ isGlobal: true }),
    
    // Configure TypeORM for PostgreSQL database connection
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost', // Database host
      port: parseInt(process.env.DB_PORT, 10) || 5432, // Database port
      username: process.env.DB_USERNAME || 'postgres', // Database username
      password: process.env.DB_PASSWORD || 'postgres', // Database password
      database: process.env.DB_DATABASE || 'customer', // Database name
      entities: [Customer], // Entities to be managed by TypeORM
      synchronize: true, // Auto synchronize database schema (disable in production)
    }),
    
    // Import the DataModule which handles data operations
    DataModule,
  ],
  controllers: [AppController], // Register AppController
  providers: [], // Additional providers can be added here
})
export class AppModule {}
