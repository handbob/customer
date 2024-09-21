import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCustomerDto, UpdateCustomerDto } from './dto'
import { Customer } from './entities/customer.entity'
import { faker } from '@faker-js/faker'

// Injectable decorator marks this class as a provider
@Injectable()
export class DataService {
  // Inject the Customer repository using TypeORM
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  /**
   * Lifecycle hook called once the module has been initialized
   * Seeds the database with fake customers if it's empty
   */
  async onModuleInit() {
    const count = await this.customerRepository.count();
    if (count === 0) {
      const customers: Partial<Customer>[] = [];
      for (let i = 0; i < 10; i++) {
        customers.push({
          name: faker.person.fullName(),
          email: faker.internet.email(),
          phone: faker.phone.number(),
        });
      }
      await this.customerRepository.save(customers);
      console.log('Nahráno 10 falešných zákazníků do databáze.'); // "Loaded 10 fake customers into the database."
    }
  }

  /**
   * Retrieve all customers from the database
   * @returns Promise resolving to an array of Customer entities
   */
  findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  /**
   * Find a single customer by ID
   * @param id - The ID of the customer to retrieve
   * @returns Promise resolving to the Customer entity
   * @throws NotFoundException if customer does not exist
   */
  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  /**
   * Create a new customer
   * @param createCustomerDto - Data Transfer Object containing customer details
   * @returns Promise resolving to the newly created Customer entity
   */
  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customerRepository.create(createCustomerDto);
    return this.customerRepository.save(customer);
  }

  /**
   * Update an existing customer by ID
   * @param id - The ID of the customer to update
   * @param updateCustomerDto - Data Transfer Object containing updated customer details
   * @returns Promise resolving to the updated Customer entity
   * @throws NotFoundException if customer does not exist
   */
  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    // Merge the updated fields into the existing customer entity
    Object.assign(customer, updateCustomerDto);
    return this.customerRepository.save(customer);
  }
}
