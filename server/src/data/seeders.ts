import { createConnection } from 'typeorm';
import ormconfig from '../config/orm-config';
import UserSeeder from './seeders/user.seeder';
import TaskSeeder from './seeders/task.seeder';
import { logger } from '../common/utils/logger.util';

const seeders = async (): Promise<void> => {
  await createConnection(ormconfig);
  logger.info('Connection created');
  logger.info('Seeding users');
  await UserSeeder.execute();
  logger.info('Seeding tasks');
  await TaskSeeder.execute();
  logger.info('Seeding finished');
};

seeders().then(() => process.exit());
