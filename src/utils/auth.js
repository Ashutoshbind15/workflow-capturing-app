"use server";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { redirect } from "next/navigation";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "sec");

import bcrypt from "bcryptjs";
import connectDB from "./db";
import { User } from "@/models/User";
import { NextResponse } from "next/server";

export async function signToken(payload, expiresIn = "1h") {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(JWT_SECRET);
}

export async function verifyToken(token) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    return null;
  }
}

export async function loginAction(formData) {
  await connectDB();

  const email = formData.get("email");

  const user = await User.findOne({
    email,
  });

  if (!user) {
    return redirect("/auth/login");
  }

  const password = formData.get("password");
  const hashedPassword = await bcrypt.hash(password, user.salt);

  if (hashedPassword !== user.password) {
    return redirect("/auth/login");
  }

  const token = await signToken(
    {
      user: {
        sub: user._id,
        email: user.email,
      },
    },
    "1h"
  );

  const expiresIn = 30 * 1000;

  cookies().set("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + expiresIn),
  });
  redirect("/");
}

export async function signupAction(formData) {
  await connectDB();

  const email = formData.get("email");
  const password = formData.get("password");

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new User({
    email,
    password: hashedPassword,
    salt,
  });

  await user.save();

  redirect("/auth/login");
}

export async function logout() {
  cookies().set("token", "", { expires: new Date(0) });
}

export async function getToken() {
  const token = cookies().get("token")?.value;
  if (!token) return null;
  return verifyToken(token);
}

export async function updateToken(req) {
  const token = await getToken();

  if (!token) return;

  const newToken = await signToken(
    {
      user: {
        sub: token.user.sub,
        email: token.user.email,
      },
    },
    "1h"
  );

  const expiresIn = 60 * 60 * 60 * 1000;

  const res = NextResponse.next();

  res.cookies.set({
    name: "token",
    value: newToken,
    httpOnly: true,
    expires: new Date(Date.now() + expiresIn),
  });

  return res;
}
