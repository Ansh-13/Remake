import { DefaultSchemaOptions } from "mongoose";
import { DefaultSession } from "next-auth";
import { DefaultDeserializer } from "v8";

declare module "next-auth" {
  interface Session {
    user: {
      id: String;
    } & DefaultSession["user"];
  }
}
