import { Controller, Get, Post, Put, Param, Body, NotFoundException } from '@nestjs/common'
import { DataService } from './data/data.service'
import { CreateCustomerDto, UpdateCustomerDto } from './data/dto'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'
import { Customer } from './data/entities/customer.entity'

// Swagger tag for grouping customer-related endpoints
@ApiTags('customers')

// Controller decorator with route prefix 'customers'
@Controller('customers')
export class AppController {
  // Inject DataService through the constructor
  constructor(private readonly dataService: DataService) {}

  /**
   * GET /customers
   * Retrieve all customers
   */
  @Get()
  @ApiOperation({ summary: 'Get all customers' }) // Swagger operation summary
  @ApiResponse({ status: 200, description: 'List of customers', type: [Customer] }) // Swagger response
  async getAllCustomers(): Promise<Customer[]> {
    return this.dataService.findAll();
  }

  /**
   * GET /customers/:id
   * Retrieve a single customer by ID
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get customer by ID' })
  @ApiResponse({ status: 200, description: 'Customer details', type: Customer })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  async getCustomerById(@Param('id') id: string): Promise<Customer> {
    const customer = await this.dataService.findOne(id);
    if (!customer) {
      // Throw NotFoundException if customer does not exist
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  /**
   * POST /customers
   * Create a new customer
   */
  @Post()
  @ApiOperation({ summary: 'Create a new customer' })
  @ApiResponse({ status: 201, description: 'Customer created', type: Customer })
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.dataService.create(createCustomerDto);
  }

  /**
   * PUT /customers/:id
   * Update an existing customer by ID
   */
  @Put(':id')
  @ApiOperation({ summary: 'Update a customer' })
  @ApiResponse({ status: 200, description: 'Customer updated', type: Customer })
  @ApiResponse({ status: 404, description: 'Customer not found' })
  async updateCustomer(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    return this.dataService.update(id, updateCustomerDto);
  }
}
