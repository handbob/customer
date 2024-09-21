import { Test, TestingModule } from '@nestjs/testing'
import { DataService } from '../src/data/data.service'
import { Repository } from 'typeorm'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Customer } from '../src/data/entities/customer.entity'
import { NotFoundException } from '@nestjs/common'

// Factory function to create a mock repository
const mockRepository = () => ({
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
  count: jest.fn(),
});

// Type definition for the mock repository
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

// Describe block for DataService unit tests
describe('DataService', () => {
  let service: DataService;
  let repository: MockRepository;

  // Setup before each test
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DataService,
        { provide: getRepositoryToken(Customer), useFactory: mockRepository },
      ],
    }).compile();

    // Retrieve instances of DataService and the mock repository
    service = module.get<DataService>(DataService);
    repository = module.get<MockRepository>(getRepositoryToken(Customer));
  });

  // Test case to ensure the service is defined
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // Test case for retrieving all customers
  it('should return all customers', async () => {
    const mockCustomers = [
      { id: '1', name: 'John Doe', email: 'john@example.com', phone: '123456789' },
    ];
    repository.find.mockResolvedValue(mockCustomers);
    expect(await service.findAll()).toEqual(mockCustomers);
  });

  // Test case for finding a single customer by ID
  it('should find one customer', async () => {
    const mockCustomer = { id: '1', name: 'Jane Doe', email: 'jane@example.com', phone: '987654321' };
    repository.findOne.mockResolvedValue(mockCustomer);
    expect(await service.findOne('1')).toEqual(mockCustomer);
  });

  // Test case for handling non-existent customer retrieval
  it('should throw NotFoundException when customer not found', async () => {
    repository.findOne.mockResolvedValue(null);
    await expect(service.findOne('non-existent-id')).rejects.toThrow(NotFoundException);
  });

  // Test case for creating a new customer
  it('should create a customer', async () => {
    const dto = { name: 'Alice', email: 'alice@example.com', phone: '111222333' };
    const mockCustomer = { id: '2', ...dto };
    repository.create.mockReturnValue(dto);
    repository.save.mockResolvedValue(mockCustomer);
    expect(await service.create(dto)).toEqual(mockCustomer);
    expect(repository.create).toHaveBeenCalledWith(dto);
    expect(repository.save).toHaveBeenCalledWith(dto);
  });

  // Test case for updating an existing customer
  it('should update a customer', async () => {
    const dto = { name: 'Alice Updated' };
    const existingCustomer = { id: '1', name: 'Alice', email: 'alice@example.com', phone: '111222333' };
    const updatedCustomer = { ...existingCustomer, ...dto };
    repository.findOne.mockResolvedValue(existingCustomer);
    repository.save.mockResolvedValue(updatedCustomer);
    expect(await service.update('1', dto)).toEqual(updatedCustomer);
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    expect(repository.save).toHaveBeenCalledWith(updatedCustomer);
  });
});
