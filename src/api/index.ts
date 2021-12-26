import http from 'http';
import express from 'express';
import cors from 'cors';
import router from './routes';

const expressApp = express();  // eslint-disable-line @typescript-eslint/typedef
const httpServer: http.Server = http.createServer(expressApp);
expressApp.use(express.json());
expressApp.use(express.urlencoded({extended: true}));
expressApp.use(cors());
expressApp.use('/', router);

export async function listen(port?: number): Promise<http.Server> {
    await new Promise<void>((res) => httpServer.listen(port ?? process.env.PORT ?? 8000, res));  // eslint-disable-line @typescript-eslint/typedef
    return httpServer;
}

export async function stop(): Promise<Error | undefined> {
    return new Promise<Error | undefined>((res) => httpServer.close(res));  // eslint-disable-line @typescript-eslint/typedef
}
