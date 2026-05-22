export const runtime = "edge";

export async function POST(request) {
  const { token } = await request.json();

  if (!token) {
    return Response.json({ success: false, error: "Missing token" }, { status: 400 });
  }

  const secret = process.env.TURNSTILE_SECRET_KEY;
  const formData = new FormData();
  formData.append("secret", secret);
  formData.append("response", token);

  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  if (data.success) {
    return Response.json({ success: true });
  }

  return Response.json({ success: false, error: "Invalid token" }, { status: 400 });
}
