import { cookies } from "next/headers";

const ADMIN_PASSWORD = (process.env.ADMIN_PASSWORD || "").trim();
const ADMIN_COOKIE_NAME = "admin_authenticated";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export async function verifyAdminPassword(password: string): Promise<boolean> {
  return password.trim() === ADMIN_PASSWORD;
}

export async function setAdminAuth(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/"
  });
}

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const authCookie = cookieStore.get(ADMIN_COOKIE_NAME);
  return authCookie?.value === "true";
}

export async function clearAdminAuth(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}
