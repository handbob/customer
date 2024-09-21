import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataService } from './data.service'
import { Customer } from './entities/customer.entity'

// DataModule handles data-related operations and providers
@Module({
  imports: [
    // Register the Customer entity with TypeORM
    TypeOrmModule.forFeature([Customer]),
  ],
  providers: [DataService], // Register DataService as a provider
  exports: [DataService], // Export DataService for use in other modules
})
export class DataModule {}
