import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: process.env.PORT || 4000,
  MONGODB_URI: process.env.MONGODB_URI as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  ADMIN_SECRET: process.env.ADMIN_SECRET as string,  // ✅ Add this line
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:4200"
};



if (!env.MONGODB_URI) throw new Error("MONGODB_URI not set");
if (!env.JWT_SECRET) throw new Error("JWT_SECRET not set");
if (!env.ADMIN_SECRET) throw new Error("ADMIN_SECRET not set");  // ✅ Add this line
