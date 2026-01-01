import { APP_SCHEME } from "@/constants/const";

const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";

export async function GET(request: Request) {
  if (!process.env.GOOGLE_CLIENT_ID) {
    return Response.json(
      { error: "Missing GOOGLE_CLIENT_ID environment variable" },
      { status: 500 }
    );
  }

  const url = new URL(request.url);
  let idpClientId: string;

  const internalClient = url.searchParams.get("client_id");

  const redirectUri = url.searchParams.get("redirect_uri");

  if (redirectUri !== APP_SCHEME) {
    return Response.json({ error: "Invalid redirect_uri" }, { status: 400 });
  }

  // use state to drive redirect back to platform
  const platform = "mobile";

  let state = platform + "|" + url.searchParams.get("state");

  if (internalClient === "google") {
    idpClientId = process.env.GOOGLE_CLIENT_ID;
  } else {
    return Response.json({ error: "Invalid client" }, { status: 400 });
  }

  // additional enforcement
  if (!state) {
    return Response.json({ error: "Invalid state" }, { status: 400 });
  }

  const params = new URLSearchParams({
    client_id: idpClientId,
    redirect_uri: process.env.EXPO_PUBLIC_BASE_URL + "/api/auth/callback",
    response_type: "code",
    scope: url.searchParams.get("scope") || "identity",
    state: state,
    prompt: "select_account",
  });

  return Response.redirect(GOOGLE_AUTH_URL + "?" + params.toString());
}
