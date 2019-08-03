import { useEffect, useState } from 'react';

enum LogLevel {
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR'
}

const LogLevelValue = {
    [LogLevel.INFO]: 0,
    [LogLevel.WARN]: 1,
    [LogLevel.ERROR]: 2
};

const DEFAULT_LOG_LEVEL: Readonly<LogLevel> = LogLevel.INFO;

/**
 * Hook which returns a logging instance adhering to the current log level
 * threshold
 */
export function useLogger(level: LogLevel = LogLevel.INFO) {
    return function(message: string, ...messages: string[]) {
        let combinedMessage = message;

        if (messages && messages.length) {
            combinedMessage = `${message} ${messages.join('|')}`;
        }

        if (shouldLogMessage(level, DEFAULT_LOG_LEVEL)) {
            console.log(
                `${level} | ${new Date().toLocaleString()} | ${combinedMessage}`
            );
        }
    }
};

function shouldLogMessage(
    messageLogLevel: LogLevel,
    logLevelThreshold: LogLevel
) {
    return LogLevelValue[messageLogLevel] <= LogLevelValue[logLevelThreshold];
}

export function useInfoLog()  {
    return useLogger(LogLevel.INFO);
}

export function useWarningLog() {
    return useLogger(LogLevel.WARN);
}

export function useErrorLog() {
    return useLogger(LogLevel.ERROR);
}

export default useLogger;
