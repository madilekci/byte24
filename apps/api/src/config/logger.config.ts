import * as dotenv from 'dotenv';
import * as winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import * as SlackHook from 'winston-slack-webhook-transport';
dotenv.config();

const dailyFileTransport: DailyRotateFile = new DailyRotateFile({
  filename: 'logs/byte24-%DATE%.log',
  datePattern: 'DD-MM-YYYY-HH',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  frequency: '1d',
});

const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    // Add a timestamp to the console logs
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.printf(({ timestamp, level, message, context, trace, application }) => {
      return `${timestamp} [${application}] ${level}: ${message}${trace ? `\n${trace}` : ''}`;
    })
  ),
});

const slackTransport = new SlackHook.default({
  webhookUrl: process.env.SLACK_WEBHOOK_URL,
  channel: process.env.SLACK_CHANNEL,
  username: process.env.SLACK_USERNAME,
  level: 'error',
  formatter: (info) => {
    return {
      text: `[${info.application}] New ${info.level} log message: ${info.message}`,
    };
  },
});

export const loggerConfig = {
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { application: process.env.APP_NAME || 'byte24-api' },
  transports: [dailyFileTransport, consoleTransport, slackTransport],
};
