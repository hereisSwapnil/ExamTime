const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const DB_NAME = require("../constants.js");

dotenv.config({
  path: ".env",
});

class SessionManager {
  constructor() {
    this.client = null;
  }

  async connect() {
    try {
      const url = process.env.MONGODB_URI;
      
      if (!url) {
        throw new Error("MONGODB_URI is not defined in environment variables");
      }

      // Create MongoClient instance
      this.client = new MongoClient(url);

      // Connect the client
      await this.client.connect();

      // Start session and store in global variable
      global.session = this.client.startSession();
      
      // Attach client to session for easy access (as per user's suggestion)
      global.session.client = this.client;

      console.log("MongoDB Session created and stored in global.session");
      
      return this.client;
    } catch (error) {
      console.error("MongoDB Session Manager Connection Error:", error);
      throw error;
    }
  }

  getSession() {
    if (!global.session) {
      throw new Error("Session not initialized. Call connect() first.");
    }
    return global.session;
  }

  getClient() {
    if (!this.client) {
      throw new Error("Client not initialized. Call connect() first.");
    }
    return this.client;
  }

  // Helper method to query using the global session
  async query(dbName, collectionName, operation, ...args) {
    try {
      const session = this.getSession();
      const client = this.getClient();
      
      const db = client.db(dbName);
      const collection = db.collection(collectionName);
      
      // Execute operation with session
      return await operation(collection, session, ...args);
    } catch (error) {
      console.error("Query error:", error);
      throw error;
    }
  }

  async close() {
    try {
      if (global.session) {
        await global.session.endSession();
        global.session = null;
      }
      if (this.client) {
        await this.client.close();
        this.client = null;
      }
      console.log("MongoDB Session and Client closed");
    } catch (error) {
      console.error("Error closing MongoDB connection:", error);
      throw error;
    }
  }
}

// Create singleton instance
const sessionManager = new SessionManager();

module.exports = sessionManager;

