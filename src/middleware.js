import { updateToken } from "./utils/auth";

export async function middleware(request) {
  return await updateToken(request);
}
