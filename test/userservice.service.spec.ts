import { Test, TestingModule } from '@nestjs/testing';
import { userservice } from '../src/user/user.service';

describe('UserserviceService', () => {
  let service: userservice;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [userservice],
    }).compile();

    service = module.get<userservice>(userservice);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
