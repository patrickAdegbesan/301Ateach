import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
if (!uri) throw new Error('MONGODB_URI not defined');

async function test() {
  console.log('Testing connection to MongoDB...');
  try {
    // Mask password for logs
    const masked = uri.replace(/(mongodb\+srv:\/\/[^:]+:)([^@]+)@/, (m, p1) => `${p1}***@`);
    console.log('Using URI:', masked);

    const client = new MongoClient(uri, { serverSelectionTimeoutMS: 10000 });
    await client.connect();
    console.log('Connected to MongoDB server(s):', client.topology?.description.servers);
    await client.db('admin').command({ ping: 1 });
    console.log('Ping OK');
    await client.close();
    process.exit(0);
  } catch (e: any) {
    console.error('Connection test failed:', e);
    // If there's an error response with details, print it
    if (e?.errorLabels) console.error('errorLabels:', e.errorLabels);
    if (e?.errmsg) console.error('errmsg:', e.errmsg);
    process.exit(1);
  }
}

test();
