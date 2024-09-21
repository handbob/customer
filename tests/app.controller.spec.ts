import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from '../src/app.controller'
import { DataService } from '../src/data/data.service'
import { NotFoundException } from '@nestjs/common'

describe('AppController', () => {
  let appController: AppController;
  let dataService: DataService;

  const mockDataService = {
    findAll: jest.fn().mockResolvedValue([
      { id: '1', name: 'Test User', email: 'test@example.com', phone: '123456789' },
    ]),
    findOne: jest.fn((id: string) => {
      if (id === '1') {
        return Promise.resolve({ id: '1', name: 'Test User', email: 'test@example.com', phone: '123456789' });
      }
      return Promise.reject(new NotFoundException('Customer not found'));
    }),
    create: jest.fn((dto) => Promise.resolve({ id: '2', ...dto })),
    update: jest.fn((id, dto) =>
      id === '1' ? Promise.resolve({ id, ...dto }) : Promise.reject(new NotFoundException('Customer not found')),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: DataService, useValue: mockDataService }],
    }).compile();

    appController = module.get<AppController>(AppController);
    dataService = module.get<DataService>(DataService);
  });

  it('should return all customers', async () => {
    expect(await appController.getAllCustomers()).toEqual([
      { id: '1', name: 'Test User', email: 'test@example.com', phone: '123456789' },
    ]);
    expect(mockDataService.findAll).toHaveBeenCalled();
  });

  it('should return a single customer', async () => {
    expect(await appController.getCustomerById('1')).toEqual({
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      phone: '123456789',
    });
    expect(mockDataService.findOne).toHaveBeenCalledWith('1');
  });

  it('should throw NotFoundException when customer not found', async () => {
    await expect(appController.getCustomerById('non-existent-id')).rejects.toThrow(NotFoundException);
    expect(mockDataService.findOne).toHaveBeenCalledWith('non-existent-id');
  });

  it('should create a customer', async () => {
    const dto = { name: 'New User', email: 'new@example.com', phone: '555555555' };
    expect(await appController.createCustomer(dto)).toEqual({ id: '2', ...dto });
    expect(mockDataService.create).toHaveBeenCalledWith(dto);
  });

  it('should update a customer', async () => {
    const dto = { name: 'Updated User' };
    expect(await appController.updateCustomer('1', dto)).toEqual({ id: '1', ...dto });
    expect(mockDataService.update).toHaveBeenCalledWith('1', dto);
  });

  it('should throw NotFoundException when updating non-existent customer', async () => {
    const dto = { name: 'Updated User' };
    await expect(appController.updateCustomer('non-existent-id', dto)).rejects.toThrow(NotFoundException);
    expect(mockDataService.update).toHaveBeenCalledWith('non-existent-id', dto);
  });
});
