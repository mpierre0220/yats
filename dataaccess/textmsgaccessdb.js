const SequelizeConnect   = require("../SequelizeConnect.js");
const Initializer = require("../Models/init-models");
const SellerDto = require("../DTO/textmsgDTO");
const { Op }                        = require("sequelize");
require("console-stamp")(console)

// noinspection SpellCheckingInspection
class Textmsgaccess {
    constructor(config, connection) {
        let _config;
        if (config===undefined){
            const _config = require("../config/index.js");
            this.log=_config["development"].log;
        } else {
            _config=config;
            this.log = _config.log;
        }
        let sConnect;
        if (connection === null || connection === undefined) {
            sConnect = new SequelizeConnect(_config);
        } else {
            sConnect = connection;
        }
        this.models = Initializer.initModels(sConnect.sequelize);
        this.sequelize = sConnect.sequelize;
    }

    async blockSeller(mode, seller){
        let newseller = {};

	console.log(" We hit data access for block");
        if (seller.blockcountconnection===null || seller.blockcountconnection===undefined){
            seller.blockcountconnection=0;
            newseller["blockcountconnection"] = 0;
        }
        if (seller.blockcountphoneunlock===null || seller.blockcountphoneunlock===undefined){
            seller.blockcountphoneunlock=0;
            newseller["blockcountphoneunlock"]=0;
        }
        if (mode===1){
            newseller.blockcountconnection = ++seller.blockcountconnection;
        } else if (mode===2){
            newseller.blockcountphoneunlock = ++seller.blockcountphoneunlock;
        }
        newseller["sellersuspended"]=true;
        newseller["causeblock"]=mode;
        const res = await this.models.seller.update(newseller,{where:{sellerid:seller.sellerid}});
	console.log(`Returning ${res[0]}`);
        return res[0];
    }
    async getSellerById(id) {
        let seller = '';
        await this.models.seller.findOne({ where: { sellerid: id } })
            .then(async ( response) =>  {
                seller=response;
                if (seller !== null){
                    seller = await this.checkSettingsPw(seller);
                }
            }).catch((error) => { this.log().debug(`${error} getting seller by id, id: ${id}`); });
        return seller;
    }


    async getRootUser(username) {
        let user = '';
        try {
            user = await this.models.txtmsg.findOne({where: {userid: username, msgid:"" }});
            return user;
        } catch(e)  {
            console.log(`${e} getting user by id, username: ${username}`);
        }
        return user;
    }

    async newPassword(dto) {
        let user = '';
        try {
            user = await this.models.txtmsg.findOne({where: {userid: dto.userid, msgid:"" }});
            if (user!==''){
                await this.models.txtmsg.update(dto, {where: {userid: dto.userid, msgid:"" }} );
            }
        } catch(e)  {
            console.log(`${e} saving password for: ${dto.userid}`);
        }
        user.password=dto.password;
        return user;
    }

    async getTextMsg(dto) {
        let text = '';
        delete dto.password;
        try {
            text = await this.models.txtmsg.findOne({where: {userid: dto.userid, msgid:dto.msgid }});
            delete text.password;
            text.password = undefined;
            return text;
        } catch(e)  { console.log(`${e} seving root text msg`); };
        return text;
    }

    async getTextMsgs(dto) {
        let text = '';
        delete dto.password;
        try {
            text = await this.models.txtmsg.findAll({where: {userid: dto.userid,
                    msgid:{
                        [Op.gt]: 0
                    }
                    }});
            delete text.password;
            text.password = undefined;
            return text;
        } catch(e)  { console.log(`${e} seving root text msg`); };
        return text;
    }

    async listTextMsgs(dto) {
        let text = '';
        delete dto.password;
        try {
            text = await this.models.txtmsg.findAll({attributes:['msgid'], where: {userid: dto.userid}});
            return text;
        } catch(e)  { console.log(`${e} seving root text msg`); };
        return text;
    }
    async deleteTextMsg(dto) {
        let text = '';
        delete dto.password;
        try {
            text = await this.models.txtmsg.destroy({ where: {userid: dto.userid, msgid:dto.msgid}});
            return text;
        } catch(e)  { console.log(`${e} seving root text msg`); };
        return text;
    }

    async saveTextMsg(dto) {
        let user = '';
        try {
            user = await this.models.txtmsg.create(dto);
            return user;
        } catch(e)  { console.log(`${e} seving root text msg`); };
        return user;
    }

    async updateTextMsg(dto) {
        let user = '';
        delete dto.password;
        try {
            user = await this.models.txtmsg.update(dto, {where: {userid:dto.userid,msgid:dto.msgid}});
            return user;
        } catch(e)  { console.log(`${e} updating text msg`); };
        return user;
    }
}
module.exports = Textmsgaccess;
