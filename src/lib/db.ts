import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  console.warn(
    "MONGODB_URI is not set. Add it to .env.local before running the app."
  );
}

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Reuse the connection across hot reloads / serverless invocations.
const globalWithMongoose = global as typeof global & { _mongoose?: MongooseCache };

const cached: MongooseCache = globalWithMongoose._mongoose || { conn: null, promise: null };
globalWithMongoose._mongoose = cached;

export async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
