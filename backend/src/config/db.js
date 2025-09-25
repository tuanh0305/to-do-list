import mongoose from 'mongoose';
export const connectDB = async () => {
    try {
        await mongoose.connect(
            process.env.MONGODB_CONNECTIONSTRING
        );
        console.log("lien ket csdl thanh cong");
    } catch (error) {
        console.error("loi khi ket noi CSDL:", error);
        process.exit(1);// exit with error
    }
}