// import { MongoClient, MongoClientOptions } from "mongodb";
// import bcrypt from "bcrypt";

// const mongoUrl = "mongodb+srv://kyle:kyl3@kyle-test-db.oe66wcy.mongodb.net/";

// export async function connectToMongo(): Promise<MongoClient> {
//   try {
//     const client = new MongoClient(mongoUrl);
//     await client.connect();
//     console.log("Connected to MongoDB");
//     return client;
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//     throw error;
//   }
// }

// export async function loginUser(
//   username: string,
//   password: string
// ): Promise<boolean> {
//   const client = await connectToMongo();
//   const userCollection = client.db().collection("user");

//   const user = await userCollection.findOne({ username });
//   if (!user) {
//     // User not found
//     await client.close();
//     return false;
//   }

//   const passwordMatch = user.password === password;

//   return passwordMatch;
// }
