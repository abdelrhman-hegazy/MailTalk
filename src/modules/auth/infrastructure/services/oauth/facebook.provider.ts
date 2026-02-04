// auth/infrastructure/services/oauth/facebook.provider.ts
import axios from "axios";
import {
  AuthProvider,
  OAuthProfile,
  OAuthProvider,
} from "../../../domain/services/oauth-provider.service";

export class FacebookOAuthProvider implements OAuthProvider {
  async getProfile(accessToken: string): Promise<OAuthProfile> {
    // 1️⃣ Validate token
    const debugRes = await axios.get(`https://graph.facebook.com/debug_token`, {
      params: {
        input_token: accessToken,
        access_token: `${process.env.FACEBOOK_APP_ID}|${process.env.FACEBOOK_APP_SECRET}`,
      },
    });

    const data = debugRes.data.data;

    if (!data.is_valid) {
      throw new Error("Invalid Facebook token");
    }

    if (data.app_id !== process.env.FACEBOOK_APP_ID) {
      throw new Error("Invalid Facebook app");
    }

    // 2️⃣ Get profile
    const profileRes = await axios.get("https://graph.facebook.com/me", {
      params: {
        fields: "id,name,email,picture",
        access_token: accessToken,
      },
    });

    const profile = profileRes.data;

    return {
      provider: AuthProvider.FACEBOOK,
      providerId: profile.id,
      email: profile.email,
      name: profile.name,
      avatar: profile.picture?.data?.url,
    };
  }
}
