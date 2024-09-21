import { ApiProperty } from '@nestjs/swagger'

// Customer class represents the customer entity in the application
export class Customer {
  @ApiProperty({ example: 'uuid-v4' }) // Swagger documentation for the ID field
  id: string;

  @ApiProperty({ example: 'John Doe' }) // Swagger documentation for the name field
  name: string;

  @ApiProperty({ example: 'john@example.com' }) // Swagger documentation for the email field
  email: string;

  @ApiProperty({ example: '123456789' }) // Swagger documentation for the phone field
  phone: string;
}
