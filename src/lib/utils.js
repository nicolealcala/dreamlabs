import mongoose from "mongoose";

const connection = {};

export const connectToDb = async () => {
    try {
        if (connection.isConnected) {
            console.log("Using existing connection");
            return;
        }
        const db = await mongoose.connect(process.env.MONGODB);
        connection.isConnected = db.connections[0].readyState;
    } catch (error) {
        console.log(`Error: ${error}`);
        throw new Error(error);
    }
};

export const createMarkup = (content) => {
    if (!content.includes('<p>') && !content.includes('</p>')) {
        content = `<p>${content}</p>`;
    }
    const plainContent = content.replace(/\n/g, '<br>')
    return { __html: plainContent };
}

export const truncateContent = (content, maxLength) => {
    if (content.length > maxLength) {
        return content.slice(0, maxLength) + "...";
    }
    return content;
};



