import { MongoClient, Db } from 'mongodb';
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://ganeshshende1862003_db_user:4lm91zcGxuStn80C@cluster0.2nt6cvp.mongodb.net/sgwwsp_ecommerce?retryWrites=true&w=majority&appName=Cluster0';
const MONGODB_DB = process.env.MONGODB_DB || 'sgwwsp_ecommerce';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

// Native MongoDB Client Connection
export async function connectToDatabase(): Promise<{ client: MongoClient; db: Db }> {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db(MONGODB_DB);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

// Mongoose Connection for Schemas & Models
let isMongooseConnected = false;

export async function connectMongoose(): Promise<typeof mongoose> {
  if (isMongooseConnected) {
    return mongoose;
  }

  const opts = {
    bufferCommands: false,
    dbName: MONGODB_DB,
  };

  const conn = await mongoose.connect(MONGODB_URI, opts);
  isMongooseConnected = !!conn.connections[0].readyState;
  return conn;
}

export default connectToDatabase;
