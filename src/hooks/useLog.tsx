import { useEffect, useState } from "react";

enum LogLevel {
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR'
}

const LogLevelValue = {
    [ LogLevel.INFO ]: 0,
    [ LogLevel.WARN ]: 1,
    [ LogLevel.ERROR ]: 2
};

const DEFAULT_LOG_LEVEL: Readonly<LogLevel> = LogLevel.INFO;

/**
 * Hook which logs a message if it meets the logging threshold
 * @param message
 * @param level
 */
function useLog(message: string, level: LogLevel = LogLevel.INFO) {
    const [ logLevelThreshold, setLogLevelThreshold ] = useState<LogLevel>(DEFAULT_LOG_LEVEL);

    useEffect(() => {
        if (shouldLogMessage(level, logLevelThreshold)) {
            console.log(`${ level } | ${ new Date().toLocaleString() } | ${ message }`);
        }
    });

    return setLogLevelThreshold;
}

function shouldLogMessage(messageLogLevel: LogLevel, logLevelThreshold: LogLevel) {
    return LogLevelValue[messageLogLevel] <= LogLevelValue[logLevelThreshold];
}

function useWarningLog(message: string) {
    useLog(message, LogLevel.ERROR);
}

function useErrorLog(message: string) {
    useLog(message, LogLevel.ERROR);
}

export default useLog;
