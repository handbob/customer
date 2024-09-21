import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString } from 'class-validator'

// Data Transfer Object for updating a customer
export class UpdateCustomerDto {
  @ApiPropertyOptional({ example: 'Jane Doe' }) // Optional Swagger documentation for the name field
  @IsString() // Validate that the name is a string
  @IsOptional() // Mark the field as optional
  readonly name?: string;

  @ApiPropertyOptional({ example: 'jane@example.com' }) // Optional Swagger documentation for the email field
  @IsEmail() // Validate that the email is in correct format
  @IsOptional() // Mark the field as optional
  readonly email?: string;

  @ApiPropertyOptional({ example: '987654321' }) // Optional Swagger documentation for the phone field
  @IsString() // Validate that the phone is a string
  @IsOptional() // Mark the field as optional
  readonly phone?: string;
}
