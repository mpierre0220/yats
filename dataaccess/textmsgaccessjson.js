
const base = require("./data.json")
require("console-stamp")(console)
const fs = require("fs");

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
    }


    //Cette méthode marche bien
    async getRootUser(username) {
        let user = '';
        let t;
        try {
            t = await fs.readdirSync("./");
            user =  base.records.filter(rec=>(rec.userid===username && rec.msgid===0));
            if (user.length > 0) {
                return user[0];
            }
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
            text = await base.filter(rec=>(rec.userid===dto.userid && rec.msgid===dto.msgid));
            if (text!=='') {
                delete text.password;
                text.password = undefined;
            }
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
        let t;
        delete dto.password;
        try {
            text = await base.records.filter(rec=>(rec.userid===dto.userid && rec.msgid > 0)).map(rec=>rec.msgid);
            if (text.length===0){
                return ''
            }
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
        let t;
        try {
            // nous utilisons la ligne qui suit pour simuler un appel asynchrône
            t = await fs.readdirSync("./");
            user = base.records.filter(rec=>(rec.userid===dto.userid&&rec.msgid===dto.msgid));
            if (user.length===0){
                base.records.push(dto)
                user = dto;
            } else {
                user = '';
            }
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
