"use server";

import { getUserbyEmail } from "@/data/user";
import { getVerificationTokenbyToken } from "@/data/verificationToken";
import { db } from "@/lib/db";

export const newVerification = async (token: string) => {
  const result = await db.$transaction(async (prisma) => {
    const existingToken = await prisma.verificationToken.findUnique({
      where: { token },
    });

    if (!existingToken) {
      return { error: "Token does not exist" };
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if (hasExpired) {
      return { error: "Token has expired!" };
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: existingToken.email },
    });

    if (!existingUser) {
      return { error: "Email does not exist!" };
    }

    await prisma.user.update({
      where: { id: existingUser.id },
      data: {
        emailVerified: new Date(),
        email: existingToken.email,
      },
    });

    await prisma.verificationToken.delete({
      where: { id: existingToken.id },
    });

    return { success: "Email verified!" };
  });

  return result;
};
