import { ENV } from '@/config/env';
import * as Sentry from '@sentry/react-native';

export enum LogLevel {
    DEBUG = 'debug',
    INFO = 'info',
    WARN = 'warn',
    ERROR = 'error',
}

interface LogMetadata {
    [key: string]: any;
}

class Logger {
    private isDev = ENV.IS_DEV;
    private isProduction = ENV.IS_PRODUCTION;

    constructor() {
        // Initialize Sentry in production
        if (this.isProduction && ENV.SENTRY_DSN) {
            Sentry.init({
                dsn: ENV.SENTRY_DSN,
                enableAutoSessionTracking: true,
                sessionTrackingIntervalMillis: 30000,
                tracesSampleRate: 0.2,
            });
        }
    }

    private formatMessage(level: LogLevel, message: string, metadata?: LogMetadata): string {
        const timestamp = new Date().toISOString();
        const meta = metadata ? `\n${JSON.stringify(metadata, null, 2)}` : '';
        return `[${timestamp}] [${level.toUpperCase()}] ${message}${meta}`;
    }

    debug(message: string, metadata?: LogMetadata) {
        if (this.isDev) {
            console.log(this.formatMessage(LogLevel.DEBUG, message, metadata));
        }
    }

    info(message: string, metadata?: LogMetadata) {
        const formattedMessage = this.formatMessage(LogLevel.INFO, message, metadata);
        console.log(formattedMessage);

        if (this.isProduction) {
            Sentry.addBreadcrumb({
                message,
                level: 'info',
                data: metadata,
            });
        }
    }

    warn(message: string, metadata?: LogMetadata) {
        const formattedMessage = this.formatMessage(LogLevel.WARN, message, metadata);
        console.warn(formattedMessage);

        if (this.isProduction) {
            Sentry.captureMessage(message, {
                level: 'warning',
                extra: metadata,
            });
        }
    }

    error(message: string, error: Error, metadata?: LogMetadata) {
        const formattedMessage = this.formatMessage(LogLevel.ERROR, message, metadata);
        console.error(formattedMessage, error);

        if (this.isProduction) {
            Sentry.captureException(error, {
                extra: {
                    message,
                    ...metadata,
                },
            });
        }
    }

    setUser(userId: string, email?: string, username?: string) {
        if (this.isProduction) {
            Sentry.setUser({
                id: userId,
                email,
                username,
            });
        }
    }

    clearUser() {
        if (this.isProduction) {
            Sentry.setUser(null);
        }
    }
}

export const logger = new Logger();