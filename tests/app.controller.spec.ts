import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from '../src/app.controller'
import { DataService } from '../src/data/data.service'
import { NotFoundException } from '@nestjs/common'

// Describe block for AppController unit tests
describe('AppController', () => {
  let appController: AppController;
  let dataService: DataService;

  // Mock implementation of DataService
  const mockDataService = {
    // Mock for finding all customers
    findAll: jest.fn().mockResolvedValue([
      { id: '1', name: 'Test User', email: 'test@example.com', phone: '123456789' },
    ]),
    // Mock for finding a single customer by ID
    findOne: jest.fn((id: string) => {
      if (id === '1') {
        return Promise.resolve({ id: '1', name: 'Test User', email: 'test@example.com', phone: '123456789' });
      }
      return Promise.reject(new NotFoundException('Customer not found'));
    }),
    // Mock for creating a new customer
    create: jest.fn((dto) => Promise.resolve({ id: '2', ...dto })),
    // Mock for updating an existing customer
    update: jest.fn((id, dto) =>
      id === '1' ? Promise.resolve({ id, ...dto }) : Promise.reject(new NotFoundException('Customer not found')),
    ),
  };

  // Setup before each test
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: DataService, useValue: mockDataService }],
    }).compile();

    // Retrieve instances of AppController and DataService from the testing module
    appController = module.get<AppController>(AppController);
    dataService = module.get<DataService>(DataService);
  });

  // Test case for retrieving all customers
  it('should return all customers', async () => {
    expect(await appController.getAllCustomers()).toEqual([
      { id: '1', name: 'Test User', email: 'test@example.com', phone: '123456789' },
    ]);
    expect(mockDataService.findAll).toHaveBeenCalled();
  });

  // Test case for retrieving a single customer by ID
  it('should return a single customer', async () => {
    expect(await appController.getCustomerById('1')).toEqual({
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      phone: '123456789',
    });
    expect(mockDataService.findOne).toHaveBeenCalledWith('1');
  });

  // Test case for handling non-existent customer retrieval
  it('should throw NotFoundException when customer not found', async () => {
    await expect(appController.getCustomerById('non-existent-id')).rejects.toThrow(NotFoundException);
    expect(mockDataService.findOne).toHaveBeenCalledWith('non-existent-id');
  });

  // Test case for creating a new customer
  it('should create a customer', async () => {
    const dto = { name: 'New User', email: 'new@example.com', phone: '555555555' };
    expect(await appController.createCustomer(dto)).toEqual({ id: '2', ...dto });
    expect(mockDataService.create).toHaveBeenCalledWith(dto);
  });

  // Test case for updating an existing customer
  it('should update a customer', async () => {
    const dto = { name: 'Updated User' };
    expect(await appController.updateCustomer('1', dto)).toEqual({ id: '1', ...dto });
    expect(mockDataService.update).toHaveBeenCalledWith('1', dto);
  });

  // Test case for handling update on a non-existent customer
  it('should throw NotFoundException when updating non-existent customer', async () => {
    const dto = { name: 'Updated User' };
    await expect(appController.updateCustomer('non-existent-id', dto)).rejects.toThrow(NotFoundException);
    expect(mockDataService.update).toHaveBeenCalledWith('non-existent-id', dto);
  });
});
