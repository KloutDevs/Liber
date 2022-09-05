const winston = require('winston');
const a_colors = require('ansi-colors');

const date = new Date().toLocaleString('es-ES', { timeZone: 'America/Argentina/Buenos_Aires' });
const logName = date.substring(0, date.length - 3).replace(/:/gi, "-").replace(/\//g, "-").replace(/(, )/g, "-")+"PM"

const error = winston.createLogger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.printf(log => a_colors.gray('[') + a_colors.bgBlack(logName) + a_colors.gray(']') + a_colors.red('[')+a_colors.bgRed('ERROR')+a_colors.red(']')+` ${log.message}`)
});

const info = winston.createLogger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.printf(log => a_colors.gray('[') + a_colors.bgBlack(logName) + a_colors.gray(']') + a_colors.green("[") + a_colors.bgGreen('INFO') + a_colors.green("]")+ log.message)
});

const warn = winston.createLogger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.printf(log => a_colors.gray('[') + a_colors.bgBlack(logName) + a_colors.gray(']') + a_colors.yellow('[')+a_colors.bgYellow('WARNING')+a_colors.yellow(']')+` ${log.message}`)
});

const debug = winston.createLogger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.printf(log => a_colors.gray('[') + a_colors.bgBlack(logName) + a_colors.gray(']') + a_colors.cyan("[") + a_colors.bgCyan('DEBUG') + a_colors.cyan("]")+ log.message)
});

const database = winston.createLogger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.printf(log => a_colors.gray('[') + a_colors.bgBlack(logName) + a_colors.gray(']') + a_colors.magenta("[") + a_colors.bgMagenta('DATABASE') + a_colors.magenta("]")+ log.message)
});

const custom = winston.createLogger({
  transports: [
    new winston.transports.Console()
  ],
  format: winston.format.printf(log => a_colors.gray('[') + a_colors.bgBlack(logName) + a_colors.gray(']') + log.message)
});

module.exports = {
	logger: async function (level, argument){
        if(level == 'info'){
            try{
                info.log('info', argument);
                return true;
            }catch(e){
                console.error(e);
            }
        }else if(level == 'warn'){
            try{
                warn.log('info', argument);
                return true;
            }catch(e){
                console.error(e);
            }
        }else if(level == 'debug'){
            try{
                debug.log('info', argument);
                return true;
            }catch(e){
                console.error(e);
            }
        }else if(level == 'error'){
            try{
                error.log('info', argument);
                return true;
            }catch(e){
                console.error(e);
            }
        }else if(level == 'database'){
            try{
                database.log('info', argument);
                return true;
            }catch(e){
                console.error(e);
            }
        }else if(level == 'custom'){
          try{
              custom.log('info', argument);
              return true;
          }catch(e){
              console.error(e);
          }
      }
    }
};