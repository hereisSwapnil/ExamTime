const DB_NAME = require("../constants.js");

/**
 * Helper function to query MongoDB using the global session
 *
 * Usage example:
 * const result = await queryWithSession(DB_NAME, 'users', async (collection, session) => {
 *   return await collection.findOne({ email: 'user@example.com' }, { session });
 * });
 */
const queryWithSession = async (dbName, collectionName, operation) => {
  try {
    if (!global.session) {
      throw new Error(
        "Global session not initialized. Make sure sessionManager.connect() was called."
      );
    }

    if (!global.session.client) {
      throw new Error(
        "Session client not available. Session may have been closed."
      );
    }

    const db = global.session.client.db(dbName);
    const collection = db.collection(collectionName);

    // Execute the operation with the session
    return await operation(collection, global.session);
  } catch (error) {
    console.error("Error in queryWithSession:", error);
    throw error;
  }
};

/**
 * Direct query helper using the pattern suggested:
 * await global.session.client.db(db).collection(collection).findOne()
 *
 * Usage example:
 * const collection = getCollection(DB_NAME, 'users');
 * const user = await collection.findOne({ email: 'user@example.com' }, { session: global.session });
 */
const getCollection = (dbName, collectionName) => {
  if (!global.session) {
    throw new Error(
      "Global session not initialized. Make sure sessionManager.connect() was called."
    );
  }

  if (!global.session.client) {
    throw new Error(
      "Session client not available. Session may have been closed."
    );
  }

  const db = global.session.client.db(dbName);
  return db.collection(collectionName);
};

module.exports = {
  queryWithSession,
  getCollection,
  DB_NAME,
};
