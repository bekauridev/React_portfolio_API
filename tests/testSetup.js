import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongo;

export const setupTestDB = () => {
  return {
    beforeAll: async () => {
      // Minimal env needed for auth flows
      process.env.NODE_ENV = "test";
      process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret";
      process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1d";
      process.env.JWT_COOKIE_EXPIRES_IN_DAYS =
        process.env.JWT_COOKIE_EXPIRES_IN_DAYS || "1";

      mongo = await MongoMemoryServer.create();
      const uri = mongo.getUri();
      await mongoose.connect(uri, { dbName: "testdb" });
    },
    afterEach: async () => {
      if (mongoose.connection.db) {
        await mongoose.connection.db.dropDatabase();
      }
    },
    afterAll: async () => {
      await mongoose.connection.close();
      if (mongo) await mongo.stop();
    },
  };
};
