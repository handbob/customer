import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

// Data Transfer Object for creating a new customer
export class CreateCustomerDto {
  @ApiProperty({ example: 'John Doe' }) // Swagger documentation for the name field
  @IsString() // Validate that the name is a string
  @IsNotEmpty() // Ensure the name field is not empty
  readonly name: string;

  @ApiProperty({ example: 'john@example.com' }) // Swagger documentation for the email field
  @IsEmail() // Validate that the email is in correct format
  @IsNotEmpty() // Ensure the email field is not empty
  readonly email: string;

  @ApiProperty({ example: '123456789' }) // Swagger documentation for the phone field
  @IsString() // Validate that the phone is a string
  @IsNotEmpty() // Ensure the phone field is not empty
  readonly phone: string;
}
