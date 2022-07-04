import { Global, Module } from '@nestjs/common';

import { PaginateService } from '@shared/services/Paginate.service';
import { PrismaService } from '@shared/services/Prisma.service';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: 'PaginateService',
      useClass: PaginateService,
    },
  ],
  exports: [
    PrismaService,
    {
      provide: 'PaginateService',
      useClass: PaginateService,
    },
  ],
})
class Container {}

export default Container;
