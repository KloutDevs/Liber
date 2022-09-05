let uri = 'mongodb+srv://root-lunuel:_Vc0708e.@projecto1.ynrvx.mongodb.net/discordBot?retryWrites=true&w=majority'
let { logger } = require('./logger');
let mongoose = require('mongoose');
let a_colors = require('ansi-colors');
let Schematic_User = require('./models/users');
let Schematic_UserDetail = require('./models/users_details');

class Database {
    constructor(){
        if(global.dbSession == undefined || global.dbSession == null){
            this.dbSession = null
        } else {
            this.dbSession = global.dbSession;
        }
    }

    connect(){
        return new Promise((resolve, reject) => {
            mongoose.connect(uri, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }, async(err) => {
                logger('custom', a_colors.gray("#-------------------------------------------------------------#"));
                logger('debug', `Intentando conectar a la base de datos en ${a_colors.red('MongoDB')}`);
                if (err) {
                    logger('warn', 'No se ha logrado conectar a la base de datos en ' + a_colors.red('MongoDB') + '.');
                    logger('error', a_colors.red(err));
                } else logger('database', 'Se ha logrado conectar a la base de datos en ' + a_colors.red('MongoDB') + '.');
                logger('custom', a_colors.gray("#-------------------------------------------------------------#"));
            });
            this.dbSession = mongoose.connection;
            this.dbSession.on('close', () => {
                logger('custom', a_colors.gray("#-------------------------------------------------------------#"));
                logger('database', 'La conexión a la base de datos en ' + a_colors.red('MongoDB') + ' fue cerrada correctamente.');
                logger('custom', a_colors.gray("#-------------------------------------------------------------#"));
            });
            this.dbSession.on('disconnecting', () => {
                logger('custom', a_colors.gray("#-------------------------------------------------------------#"));
                logger('warn', 'Se está desconectando la aplicación de la base de datos en ' + a_colors.red('MongoDB') + '.');
                logger('custom', a_colors.gray("#-------------------------------------------------------------#"));
            });
            this.dbSession.on('disconnected', () => {
                logger('custom', a_colors.gray("#-------------------------------------------------------------#"));
                logger('warn', 'Se ha desconectado la aplicación de la base de datos en ' + a_colors.red('MongoDB') + '.');
                logger('custom', a_colors.gray("#-------------------------------------------------------------#"));
            });
            this.dbSession.on('reconnected', () => {
                logger('custom', a_colors.gray("#-------------------------------------------------------------#"));
                logger('database', 'La aplicación ha logrado reconectarse automáticamente a la base de datos en ' + a_colors.red('MongoDB') + '.');
                logger('custom', a_colors.gray("#-------------------------------------------------------------#"));
            });
            this.dbSession.on('error', (error) => {
                logger('custom', a_colors.gray("#-------------------------------------------------------------#"));
                logger('warn', 'Ha ocurrido un error dentro de la base de datos.');
                logger('error', error);
                logger('custom', a_colors.gray("#-------------------------------------------------------------#"));
            });
            global.dbSession = this.dbSession;
            resolve(this.dbSession);
        });
    }

    async users(method, ...args){
        let user, del;
        switch(method){
            case 'delete':
                let d = await Schematic_User.deleteMany();
                if (d.deletedCount >= 1) {
                    logger('custom', a_colors.gray("#-------------------------------------------------------------#"));
                    logger('info', `Se ha logrado borrar ${d.deletedCount} usuario(s) de la base de datos`);
                    logger('custom', a_colors.gray("#-------------------------------------------------------------#"));
                } else {
                    logger('custom', a_colors.gray("#-------------------------------------------------------------#"));
                    logger('warn', `No se ha logrado borrar el/los usuario(s) de la base de datos`);
                    logger('custom', a_colors.gray("#-------------------------------------------------------------#"));
                }
            case 'get':
                let allQuery = await Schematic_User.find({});
                return allQuery;
            case 'find':
                if(args[0] == "mail"){
                    user = await Schematic_User.find({mail: args[1]});
                    return user;
                }else if(args[0] == "user"){
                    user = await Schematic_User.find({user: args[1]});
                    return user;
                }else{
                    user = await Schematic_User.find({user: args[1]});
                    return user;
                }
            case 'deleteOne':
                if(args[0] == "mail"){
                    del = await Schematic_User.deleteOne({mail: args[1]});
                }else if(args[0] == "user"){
                    del = await Schematic_User.deleteOne({user: args[1]});
                }else{
                    del = await Schematic_User.deleteOne({user: args[1]});
                }
                if (del.deletedCount == 1) {
                    logger('custom', a_colors.gray("#-------------------------------------------------------------#"));
                    logger('info', `Se ha logrado borrar un usuario de la base de datos`);
                    logger('info', `El usuario es ${a_colors.yellow(args[1])}`);
                    logger('custom', a_colors.gray("#-------------------------------------------------------------#"));
                } else {
                    logger('custom', a_colors.gray("#-------------------------------------------------------------#"));
                    logger('warn', `No se ha logrado borrar un usuario de la base de datos`);
                    logger('warn', `El usuario es ${a_colors.yellow(args[1])}`);
                    logger('custom', a_colors.gray("#-------------------------------------------------------------#"));
                }
            default:
                logger('custom', a_colors.gray("#-------------------------------------------------------------#"));
                logger('error', `${a_colors.red("[")}${a_colors.yellow("ErrInfo")}${a_colors.red("]")} ${a_colors.gray("Es necesario definir el método que desea usar.")}`);
                logger('error', `${a_colors.red("[")}${a_colors.cyan("Database")}${a_colors.red("]")} ${a_colors.gray("USERS")}`);
                logger('custom', a_colors.gray("#-------------------------------------------------------------#"));
            break;
        }
    }

    async users_details(method, ...args){
        let user, del;
        switch(method){
            case 'delete':
                let d = await Schematic_UserDetail.deleteMany();
                if (d.deletedCount >= 1) {
                    logger('custom', a_colors.gray("#-------------------------------------------------------------#"));
                    logger('info', `Se ha logrado borrar ${d.deletedCount} detalle(s) de usuario(s) de la base de datos`);
                    logger('custom', a_colors.gray("#-------------------------------------------------------------#"));
                } else {
                    logger('custom', a_colors.gray("#-------------------------------------------------------------#"));
                    logger('warn', `No se ha logrado borrar el/los detalle(s) de usuario(s) de la base de datos`);
                    logger('custom', a_colors.gray("#-------------------------------------------------------------#"));
                }
            case 'get':
                let allQuery = await Schematic_UserDetail.find({});
                return allQuery;
            case 'find':
                user = await Schematic_UserDetail.find({id: args[0]});
                return user;
            case 'deleteOne':
                del = await Schematic_User.deleteOne({id: args[0]});
                if (del.deletedCount == 1) {
                    logger('custom', a_colors.gray("#-------------------------------------------------------------#"));
                    logger('info', `Se ha logrado borrar los detalles de un usuario de la base de datos`);
                    logger('info', `El usuario es ${a_colors.yellow(args[0])}`);
                    logger('custom', a_colors.gray("#-------------------------------------------------------------#"));
                } else {
                    logger('custom', a_colors.gray("#-------------------------------------------------------------#"));
                    logger('warn', `No se ha logrado borrar los detalles de un usuario de la base de datos`);
                    logger('warn', `El usuario es ${a_colors.yellow(args[0])}`);
                    logger('custom', a_colors.gray("#-------------------------------------------------------------#"));
                }
            default:
                logger('custom', a_colors.gray("#-------------------------------------------------------------#"));
                logger('error', `${a_colors.red("[")}${chalk.yellow("ErrInfo")}${chalk.red("]")} ${chalk.gray("Es necesario definir el método que desea usar.")}`);
                logger('error', `${chalk.red("[")}${chalk.cyan("Database")}${chalk.red("]")} ${chalk.gray("USERS")}`);
                logger('custom', chalk.gray("#-------------------------------------------------------------#"));
            break;
        }
    }

    getDB(){
        return this.dbSession;
    }
}

module.exports = Database;