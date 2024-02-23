const dbConnect = () => {
  const { MongoClient } = require("mongodb");
  const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_ADDRESS}`;

  const client = new MongoClient(uri);
  const dbname = process.env.DB_NAME;

  const connectToDatabase = async () => {
    try {
      await client.connect();
      console.log(`Connected to ${dbname} database`);
    } catch (error) {
      console.error(`Error connecting to database: ${error}`);
    }
  };

  const mainTest = async () => {
    try {
      await connectToDatabase();
    } catch (error) {
      console.error(`Error connecting to database: ${error}`);
    } finally {
      await client.close();
    }
  };
  mainTest();
};

export default dbConnect;
