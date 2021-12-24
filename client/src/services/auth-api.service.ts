import { IUserWithTokens } from '../common/interfaces/user';
import { HttpMethod, ContentType } from '../common/enums';
import { ISignUp, ISignIn } from 'common/interfaces/auth';
import { http } from 'services/http.service';

class AuthApi {
  private http = http;
  private BASE = '/api/auth';

  public async signIn(loginPayload: ISignIn): Promise<IUserWithTokens> {
    return this.http.load(`${this.BASE}/sign-in`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(loginPayload),
      contentType: ContentType.JSON,
    });
  }

  public async signUp(registerPayload: ISignUp): Promise<IUserWithTokens> {
    return this.http.load(`${this.BASE}/sign-up`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(registerPayload),
      contentType: ContentType.JSON,
    });
  }

  public async signOut(payload: { refreshToken: string }): Promise<void> {
    return this.http.load(`${this.BASE}/sign-out`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }

  public async confirmEmail(payload: { token: string }): Promise<void> {
    return this.http.load(`${this.BASE}/confirm-email`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }
}

export const authApi = new AuthApi();
