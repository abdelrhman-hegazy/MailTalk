import axios from "axios";
import {
  AuthProvider,
  OAuthProfile,
  OAuthProvider,
} from "../../../domain/services/oauth-provider.service";
import { config } from "../../../../../config";

export class GoogleOauthProvider implements OAuthProvider {
  async getProfile(idToken: string): Promise<OAuthProfile> {
    const { data } = await axios.get(
      "https://oauth2.googleapis.com/tokeninfo",
      {
        params: { id_token: idToken },
      },
    );
    if (data.aud !== config.oauth.GOOGLE_CLIENT_ID) {
      throw new Error("Invalid Google audience");
    }

    return {
      provider: AuthProvider.GOOGLE,
      providerId: data.sub,
      email: data.email,
      name: data.name,
      avatar: data.picture,
    };
  }
}
