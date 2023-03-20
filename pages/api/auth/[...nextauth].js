import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import CryptoJS from "crypto-js";

let prisma = new PrismaClient();

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "email-password-credential",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "e@mail.com" },
        password: { label: "Password", type: "password", placeholder: "password" },
      },
      //인증
      async authorize(credentials) {
        const user = await prisma.user_table.findUnique({
          where: {
            email: credentials.email,
          },
          select: {
            email: true,
            password: true,
          },
        });
        //status로 상태 관리가 되고 main에서 로그인 확인
        if (!user) {
          throw new Error("No user found!");
        }
        // const bb = JSON.parse(CryptoJS.AES.decrypt(user.password, process.env.NEXT_PUBLIC_SECRET_KEY).toString(CryptoJS.enc.Utf8));
        const bb = CryptoJS.AES.decrypt(user.password, process.env.NEXT_PUBLIC_SECRET_KEY).toString(CryptoJS.enc.Utf8);
        if (bb.toString() === credentials.password) {
          return user;
        } else {
          throw new Error("Could not log you in");
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token }) {
      return token;
    },
    // 세션에 로그인한 유저 데이터 입력
    async session({ session }) {
      const exUser = await prisma.user_table.findUnique({
        where: {
          email: session.user.email,
        },
        select: {
          id: true,
        },
      });

      // 로그인한 유저 데이터 재정의
      // 단, 기존에 "user"의 형태가 정해져있기 때문에 변경하기 위해서는 타입 재정의가 필요함
      session.user = exUser;

      // 여기서 반환한 session값이 "useSession()"의 "data"값이 됨
      return session;
    },
  },
});
