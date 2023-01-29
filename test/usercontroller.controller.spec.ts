import { Test, TestingModule } from '@nestjs/testing';
import { UsercontrollerController } from '../src/user/user.controller';

describe('UsercontrollerController', () => {
  let controller: UsercontrollerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsercontrollerController],
    }).compile();

    controller = module.get<UsercontrollerController>(UsercontrollerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
