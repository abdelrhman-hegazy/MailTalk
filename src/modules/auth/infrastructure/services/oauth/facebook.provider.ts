import axios from "axios";
import {
  OAuthProvider,
  OAuthProfile,
  AuthProvider,
} from "../../../domain/services/oauth-provider.service";

export class FacebookOauthProvider implements OAuthProvider {
  async getProfile(accessToken: string): Promise<OAuthProfile> {
    const { data } = await axios.get("https://graph.facebook.com/me", {
      params: {
        fields: "id,name,email,picture",
        access_token: accessToken,
      },
    });
    return {
      provider: AuthProvider.FACEBOOK,
      providerId: data.id,
      email: data.email,
      name: data.name,
      avatar: data.picture?.data?.url,
    };
  }
}
