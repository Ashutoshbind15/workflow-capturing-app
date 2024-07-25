"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
const JWT_SECRET = process.env.JWT_SECRET || "sec";

import bcrypt from "bcryptjs";
import connectDB from "./db";
import { User } from "@/models/User";

export async function signToken(payload) {
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  return token;
}

export async function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
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

  const token = await signToken({
    user: {
      sub: user._id,
      email: user.email,
    },
  });

  cookies().set("token", token, { httpOnly: true });
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
  console.log("gt", token);
  if (!token) return null;
  return verifyToken(token);
}
