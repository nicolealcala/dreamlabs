import mongoose from "mongoose";

const connection = {};

export const connectToDb = async () => {
    try {
        if (connection.isConnected) {
            console.log("Using existing connection");
            return;
        }
        const db = await mongoose.connect(process.env.MONGO);
        connection.isConnected = db.connections[0].readyState;
    } catch (error) {
        console.log(`Error: ${error}`);
        throw new Error(error);
    }
};

export const createMarkup = (content) => {
    return { __html: content };
}

export const options = { month: "long", day: "numeric", year: "numeric" };