import { GOOGLE_REDIRECT_URI } from "@/constants/const";

export async function POST(request: Request) {
  const body = await request.formData();
  const code = body.getAll("code")[0] as string;

  if (!code) {
    return Response.json(
      { error: "Missing authorization code" },
      { status: 400 }
    );
  }

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_SECRET!,
      redirect_uri: GOOGLE_REDIRECT_URI,
      grant_type: "authorization_code",
      code: code,
    }),
  });

  const data = await response.json();

  if (!data.id_token) {
    return Response.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }

  if (data.error) {
    return Response.json(
      {
        error: data.error,
        error_description: data.error_description,
        message:
          "OAuth validation error - please ensure the app complies with Google's OAuth 2.0 policy",
      },
      {
        status: 400,
      }
    );
  }

  // For native platforms, return both tokens in the response body
  return Response.json({
    token: data.id_token,
    accessToken: data.access_token,
  });
}
