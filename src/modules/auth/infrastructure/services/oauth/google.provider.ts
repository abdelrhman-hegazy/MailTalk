import axios from "axios";
import {
  OAuthProvider,
  OAuthProfile,
  AuthProvider,
} from "../../../domain/services/oauth-provider.service";

export class GoogleOauthProvider implements OAuthProvider {
  async getProfile(accessToken: string): Promise<OAuthProfile> {
    const { data } = await axios.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return {
      provider: AuthProvider.GOOGLE,
      providerId: data.id,
      email: data.email,
      name: data.name,
      avatar: data.picture,
    };
  }
}
