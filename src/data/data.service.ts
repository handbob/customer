import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateCustomerDto, UpdateCustomerDto } from './dto'
import { Customer } from './entities/customer.entity'
import { faker } from '@faker-js/faker'

@Injectable()
export class DataService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

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
      console.log('Nahráno 10 falešných zákazníků do databáze.');
    }
  }

  findAll(): Promise<Customer[]> {
    return this.customerRepository.find();
  }

  async findOne(id: string): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ where: { id } });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = this.customerRepository.create(createCustomerDto);
    return this.customerRepository.save(customer);
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto): Promise<Customer> {
    const customer = await this.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    Object.assign(customer, updateCustomerDto);
    return this.customerRepository.save(customer);
  }
}
