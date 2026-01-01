import { BASE_URL } from "@/constants/const";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/auth.store";
import {
  AuthError,
  makeRedirectUri,
  useAuthRequest,
  type AuthRequestConfig,
  type DiscoveryDocument,
} from "expo-auth-session";
import { useEffect, useState } from "react";

const config: AuthRequestConfig = {
  clientId: "google",
  scopes: ["openid", "profile", "email"],
  redirectUri: makeRedirectUri(),
};

const discovery: DiscoveryDocument = {
  authorizationEndpoint: `${process.env.EXPO_PUBLIC_BASE_URL}/api/auth/authorize`,
  tokenEndpoint: `${process.env.EXPO_PUBLIC_BASE_URL}/api/auth/token`,
};

export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const setUser = useAuthStore((s) => s.setUser);

  const [request, response, promptAsync] = useAuthRequest(config, discovery);

  const [error, setError] = useState<any>();

  useEffect(() => {
    handleResponse();
  }, [response]);

  async function handleResponse() {
    if (user) return;

    if (response?.type === "success") {
      const { code } = response.params;

      const formData = new FormData();
      formData.append("code", code);

      if (request?.codeVerifier) {
        formData.append("code_verifier", request.codeVerifier);
      } else {
        console.warn("No code verifier found in request object");
      }

      const tokenResponse = await fetch(`${BASE_URL}/api/auth/token`, {
        method: "POST",
        body: formData,
        credentials: "same-origin",
      });

      const dataToken = await tokenResponse.json();

      const res = await supabase.auth.signInWithIdToken({
        provider: "google",
        token: dataToken.token,
        access_token: dataToken.access_token,
      });

      setUser(res.data.user);
    } else if (response?.type === "cancel") {
      alert("Sign in cancelled");
    } else if (response?.type === "error") {
      setError(response?.error as AuthError);
    }
  }

  async function signIn() {
    try {
      if (!request) {
        return;
      }
      await promptAsync();
    } catch (e) {
      console.log(e);
    }
  }

  async function signOut() {
    supabase.auth.signOut();
    setUser(undefined);
  }

  return {
    user,
    signIn,
    signOut,
  };
}
