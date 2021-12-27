import { http } from 'services/http.service';
import { IUser } from 'common/interfaces/user';

class UserApi {
  private http = http;
  private BASE = '/api/users';

  public async getUser(): Promise<IUser> {
    return await this.http.load(`${this.BASE}/me`);
  }
}

export const userApi = new UserApi();
