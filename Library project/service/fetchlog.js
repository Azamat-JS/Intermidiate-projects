const { MongoClient } = require("mongodb");

const fetchLogs = async () => {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const database = client.db();
    const logsCollection = database.collection("log");

    const logs = await logsCollection
      .find()
      .sort({ timestamp: -1 })
      .limit(100)
      .toArray();

    return logs;
  } catch (error) {
    console.error("Error fetching logs:", error);
    return [];
  } finally {
    await client.close();
  }
};

module.exports = { fetchLogs };
