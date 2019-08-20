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

const DELIMITER_BASE_CHAR = '|';
const DELIMITER_PADDING =  ' ';
const DELIMITER = `${ DELIMITER_PADDING }${ DELIMITER_BASE_CHAR }${ DELIMITER_PADDING }`;

const DEFAULT_LOG_LEVEL: Readonly<LogLevel> = LogLevel.INFO;

/**
 * Provides a consistently formatted logging mechanism
 */
function useLog(level: LogLevel = LogLevel.INFO, ...messages: string[]) {
    let combinedMessage = messages.join(DELIMITER);

    if (shouldLogMessage(level)) {
        console.log(
            `${level} ${ DELIMITER } ${new Date().toLocaleString()} | ${combinedMessage}`
        );
    }
};

/**
 * Determines whether to log a message based on comparing the value to
 * @param messageLogLevel
 * @param logLevelThreshold
 */
function shouldLogMessage(
    messageLogLevel: LogLevel,
    logLevelThreshold: LogLevel = DEFAULT_LOG_LEVEL
) {
    return LogLevelValue[messageLogLevel] <= LogLevelValue[logLevelThreshold];
}

export const useInfoLog = useLog.bind(null, LogLevel.INFO);
export const useWarningLog = useLog.bind(null, LogLevel.WARN);
export const useErrorLog = useLog.bind(null, LogLevel.ERROR);
