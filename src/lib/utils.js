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

// export const getBase64 = async (imgUrl) => {
//     try {
//         const res = await fetch(imgUrl);

//         if (!res.ok) {
//             throw new Error("Failed to fetch image.");
//         }

//         const buffer = await res.arrayBuffer();

//         const { base64 } = await getPlaiceholder(Buffer.from(buffer));
//         console.log("base64: ", base64);
//         return base64;
//     } catch (err) {
//         if (err instanceof Error) console.log(err.stack);
//     }
// }

