import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

// TypeORM entity representing the 'customers' table
@Entity('customers')
export class Customer {
  @ApiProperty({ example: 'uuid-v4' }) // Swagger documentation for the ID field
  @PrimaryGeneratedColumn('uuid') // Primary key with UUID generation strategy
  id: string;

  @ApiProperty({ example: 'John Doe' }) // Swagger documentation for the name field
  @Column() // Database column for the name
  name: string;

  @ApiProperty({ example: 'john@example.com' }) // Swagger documentation for the email field
  @Column({ unique: true }) // Database column for the email with unique constraint
  email: string;

  @ApiProperty({ example: '123456789' }) // Swagger documentation for the phone field
  @Column() // Database column for the phone
  phone: string;
}
