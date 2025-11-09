import mongoose from "mongoose";

const dbConnect = async () => {
    const MONGODB_URI = process.env.MONGO_URI || "localhost:27017/simplebox";
    try{
    console.log("connecting to DB...");
    console.debug("connection string: "+ MONGODB_URI)
    const dbConnection = await mongoose.connect(MONGODB_URI);
    console.log("Successfully connected to MongoDB");
    console.debug("successful connection to the host: "+ dbConnection.connection.host)
    } catch(err) {
    console.log("Error connecting to MongoDB" + err);
    process.exit(1);
    }
   
   
}

export default dbConnect;