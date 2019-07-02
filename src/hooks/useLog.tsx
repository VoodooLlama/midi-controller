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
 * Hook which logs a message if it meets the logging threshold
 * @param message
 * @param level
 */
export function useLogger(level: LogLevel = LogLevel.INFO) {
    const [logLevelThreshold, setLogLevelThreshold] = useState<LogLevel>(
        DEFAULT_LOG_LEVEL
    );

    function logMessage(message: string) {
        useEffect(() => {
            if (shouldLogMessage(level, logLevelThreshold)) {
                console.log(
                    `${level} | ${new Date().toLocaleString()} | ${message}`
                );
            }
        }, []);
    }

    return logMessage;
}

function shouldLogMessage(
    messageLogLevel: LogLevel,
    logLevelThreshold: LogLevel
) {
    return LogLevelValue[messageLogLevel] <= LogLevelValue[logLevelThreshold];
}

export function useInfoLog(message: string) {
    return useLogger(LogLevel.INFO);
}

export function useWarningLog(message: string) {
    return useLogger(LogLevel.WARN);
}

export function useErrorLog(message: string) {
    return useLogger(LogLevel.ERROR);
}

export default useLogger;
