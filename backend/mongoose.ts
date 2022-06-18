import mongoose from "mongoose";

export default async function connectDb() {
    try {
        await mongoose.connect(process.env.MONGO_DB_KEY!);
    } catch (error) {
        console.log("Error connecting db: ", error);
        
    }
}