import * as logging from './logging';
import * as api from './api';
import * as database from './database';

async function stop(error?: Error | string): Promise<void> {
    try {
        await logging.log(2, 'process.log.shuttingDown');

        await database.disconnect();
        await api.stop();

        await logging.logLine(2, 'process.log.done');

        if (!error || typeof error === 'string') {
            process.exit(0);
        } else {
            await logging.error(error);
            process.exit(1);
        }
    } catch (newError) {
        await logging.error(newError as Error);
        process.exit(1);
    }
}

process.on('SIGINT', stop);
process.on('SIGTERM', stop);
process.on('SIGHUP', stop);
process.on('SIGBREAK', stop);
process.on('uncaughtException', stop);

await logging.log(2, 'process.log.initializing');

await database.connect();
await api.listen();

await logging.logLine(2, 'process.log.done');
