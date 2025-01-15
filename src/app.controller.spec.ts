import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let controller: AppController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    controller = module.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should be defined', () => {
      expect(controller).toBeDefined();
    });

    it('should return undefined (for redirect)', () => {
      expect(controller.root()).toBeUndefined();
    });

    it('should have Redirect decorator with correct path', () => {
      // Get metadata for the root method
      const metadata = Reflect.getMetadata(
        'redirect',
        AppController.prototype.root,
      );

      expect(metadata).toBeDefined();
      expect(metadata.url).toBe('/health');
    });

    it('should have ApiExcludeEndpoint decorator', () => {
      const metadata = Reflect.getMetadata(
        'swagger/apiExcludeEndpoint',
        AppController.prototype.root,
      );

      expect(metadata).toBe(true);
    });

    it('should have ApiOperation decorator with correct summary', () => {
      const metadata = Reflect.getMetadata(
        'swagger/apiOperation',
        AppController.prototype.root,
      );

      expect(metadata).toBeDefined();
      expect(metadata.summary).toBe('Root path redirect to health check');
    });
  });
});
