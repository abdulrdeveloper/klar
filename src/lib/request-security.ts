const PRODUCTION_APP_URL = "https://klar.abdulrdeveloper.me";

export function getRequestIdentifier(req: Request): string {
  const realIp = req.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;

  const forwardedFor = req.headers.get("x-forwarded-for")?.split(",")[0].trim();
  return forwardedFor || "unknown";
}

export function getAppUrl(): string {
  return PRODUCTION_APP_URL;
}