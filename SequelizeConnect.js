const {Op, Sequelize} = require("sequelize");

class SequelizeConnect {
    constructor(config) {
        try {
            this.log = config.log();
        } catch(e){

        }
        this.model = {};
        const self = this;
        this.Op = {};
        // eslint-disable-next-line global-require
        const {Op} = require('sequelize');
        // eslint-disable-next-line global-require
        const {Sequelize} = require('sequelize');
        this.Op = Op;
        // eslint-disable-next-line global-require
        self.sequelize = new Sequelize('banco_regalo', 'root', 'Lapl1ton', {host: 'localhost', logging:false, dialect: 'mysql',
            dialectOptions: { decimalNumbers: true }});
        self.sequelize.authenticate().then((success) => {
            console.log('Made it through the sequelize connection');
        }).catch((error) => {
            console.log('Some problem occurred with the Sequelize connection...check your credentials or setup');
        });
    }
}
module.exports = SequelizeConnect;
