import mongoose from 'mongoose';

export async function connect(): Promise<typeof mongoose> {
    const connectionUri: string = `mongodb://${encodeURIComponent(process.env.DB_USER as string)}:${encodeURIComponent(process.env.DB_PASS as string)}@${process.env.DB_HOST as string}:${process.env.DB_PORT as string}/${encodeURIComponent(process.env.DB_NAME as string)}`;
    return mongoose.connect(connectionUri);
}

export async function disconnect(): Promise<void> {
    return mongoose.connection.close();
}
