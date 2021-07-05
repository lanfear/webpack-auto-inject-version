import chalk from 'chalk';

import config from '../config';
import { isArgv } from '../core/utils';

const endOfLine = require('os').EOL;

class Log {

  logLevel = 3; // default 1

  constructor() {
    this.getLogLevel();
  }

  getLogLevel() {

    // support npm log levels
    if (process.env.npm_config_loglevel === 'silent') {
      this.logLevel = 0;
    } else if (isArgv('aiv-log-full')) {
      this.logLevel = 3;
    } else if (isArgv('aiv-log-none')) {
      this.logLevel = 0;
    }
  }

  /**
   * Get console log head
   * @return {string}
   */
  getHead() {
    return endOfLine + chalk.bgYellow.black('[AIV] : ');
  }

  /**
   * Get log text by ID from config file
   * @param id
   */
  getText(id) {
    return config.LOGS_TEXT[id];
  }

  /**
   * Call any type
   * @param type
   * @param msgId
   */
  call(type, msgId) {
    if (typeof this[type] === 'function') {
      this[type](this.getText(msgId));
    }
  }

  error(msg) {
    if (config.SILENT) return;
    if (this.logLevel < 3) return;
    console.log(`${this.getHead()} ${chalk.red('error')} : ${msg}`);
  }

  info(msg) {
    if (config.SILENT) return;
    if (!this.logLevel) return;
    console.log(`${this.getHead()} ${chalk.blue('info')} : ${msg}`);
  }

  warn(msg) {
    if (config.SILENT) return;
    if (!this.logLevel) return;
    console.log(`${this.getHead()} ${chalk.yellow('warn')} : ${msg}`);
  }
}

export default new Log();
