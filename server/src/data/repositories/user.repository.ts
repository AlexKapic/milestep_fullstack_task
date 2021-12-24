import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user';

@EntityRepository(User)
class UserRepository extends Repository<User> {
  public findByEmail(email: string): Promise<User> {
    return this.createQueryBuilder('user')
      .select(['user.username', 'user.id', 'user.password'])
      .where('user.email = :email', { email })
      .leftJoin('user.tasks', 'tasks')
      .addSelect(['tasks.title', 'tasks.id', 'tasks.isDone'])
      .getOne();
  }

  public findById(id: string): Promise<User> {
    return this.createQueryBuilder('user')
      .select(['user.username', 'user.id'])
      .where('user.id = :id', { id })
      .leftJoin('user.tasks', 'tasks')
      .addSelect(['tasks.title', 'tasks.id', 'tasks.isDone'])
      .getOne();
  }

  public confirmEmail(id: string): Promise<User> {
    return this.save({ id, confirmedAt: new Date() });
  }
}

export default UserRepository;
