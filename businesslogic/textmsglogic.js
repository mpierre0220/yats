const SequelizeConnect          = require("../SequelizeConnect.js");
const TextMsgAccess             = require("../dataaccess/textmsgaccess");
require("console-stamp")(console)
class TextMsgLogic {

    constructor(config) {
        try {
            this.TextMsgDTO                = require("../DTO/textmsgDTO");
            this.textmsgAccess = new TextMsgAccess(config);
        } catch (e){
        }
    }

    async newPassword(textdata) {
        let textdto             = new this.TextMsgDTO();
        textdto.userid          = textdata.identifiant;
        if (textdto.userid === undefined || textdto.userid === ''){
            return '';
        }
        textdto.password        = textdata.nouveaupasse;
        if (textdto.password === undefined){
            return '';
        }
        let user                = await this.textmsgAccess.getRootUser(textdto.userid);

        if (user=='') {
            return '';
        }

        if (user.password === textdata.passe){
            return this.textmsgAccess.newPassword(textdto);
        } else {
            return '';
        }
    }

    async getTextMsg(textdata) {
        let textdto             = new this.TextMsgDTO();
        textdto.userid          = textdata.identifiant;
        if (textdto.userid === undefined || textdto.userid === ''){
            return '';
        }
        textdto.password        = textdata.passe;
        textdto.msgid           = textdata.id;
        if (textdto.password === undefined){
            return '';
        }
        let user                = await this.textmsgAccess.getRootUser(textdto.userid);

        if (user=='') {
            return '';
        }

        if (user.password === textdata.passe){
            let msg = await this.textmsgAccess.getTextMsg(textdto);
            delete msg.password;
            return msg;
        } else {
            return '';
        }
    }

    async getTextMsgs(textdata) {
        let textdto             = new this.TextMsgDTO();
        textdto.userid          = textdata.identifiant;
        if (textdto.userid === undefined || textdto.userid === ''){
            return '';
        }
        textdto.password        = textdata.passe;
        textdto.msgid           = textdata.id;
        if (textdto.password === undefined){
            return '';
        }
        let user                = await this.textmsgAccess.getRootUser(textdto.userid);

        if (user=='') {
            return '';
        }

        if (user.password === textdata.passe){
            let msgs = await this.textmsgAccess.getTextMsgs(textdto);
            return msgs;
        } else {
            return '';
        }
    }

    async listTextMsgs(textdata) {
        let textdto             = new this.TextMsgDTO();
        textdto.userid          = textdata.identifiant;
        if (textdto.userid === undefined || textdto.userid === ''){
            return '';
        }
        textdto.password        = textdata.passe;
        textdto.msgid           = textdata.id;
        if (textdto.password === undefined){
            return '';
        }
        let user                = await this.textmsgAccess.getRootUser(textdto.userid);

        if (user=='') {
            return '';
        }

        if (user.password === textdata.passe){
            let msgids = await this.textmsgAccess.listTextMsgs(textdto);
            if (msgids !== "" ) {
                msgids = msgids.filter(msg => msg.msgid !== "");
            }
            return msgids;
        } else {
            return '';
        }
    }

    async deleteTextMsg(textdata) {
        let textdto             = new this.TextMsgDTO();
        textdto.userid          = textdata.identifiant;
        if (textdto.userid === undefined || textdto.userid === ''){
            return '';
        }
        textdto.msgid = textdata.id;

        if (textdto.msgid === undefined || textdto.msgid === ''){
            return '';
        }

        textdto.password        = textdata.passe;
        textdto.msgid           = textdata.id;
        if (textdto.password === undefined){
            return '';
        }
        let user                = await this.textmsgAccess.getRootUser(textdto.userid);

        if (user=='') {
            return '';
        }

        if (user.password === textdata.passe){
            let status = await this.textmsgAccess.deleteTextMsg(textdto);
            return status;
        } else {
            return '';
        }
    }

    async saveTextMsg(textdata) {
        let textdto             = new this.TextMsgDTO();
        textdto.msgid           = textdata.id;
        if (textdto.msgid === '' || textdto.msgid === undefined){
            return '';
        }
        textdto.userid          = textdata.identifiant;
        if (textdto.userid === undefined || textdto.userid === ''){
            return '';
        }
        textdto.message          = textdata.texte;
        let password            = textdata.passe;
        let user                = await this.textmsgAccess.getRootUser(textdto.userid);

        if (user=='') {
            return '';
        }

        if (user.password === password){
            return this.textmsgAccess.saveTextMsg(textdto);
        } else {
            return '';
        }
    }

    async updateTextMsg(textdata) {
        let textdto             = new this.TextMsgDTO();
        textdto.msgid           = textdata.id;
        if (textdto.msgid === '' || textdto.msgid === undefined){
            return '';
        }
        textdto.userid          = textdata.identifiant;
        if (textdto.userid === undefined || textdto.userid === ''){
            return '';
        }
        textdto.message          = textdata.texte;
        let password             = textdata.passe;
        textdto.msgid            = textdata.id;
        let user                 = await this.textmsgAccess.getRootUser(textdto.userid);

        if (user=='') {
            return '';
        }

        if (user.password === password){
            return this.textmsgAccess.updateTextMsg(textdto);
        } else {
            return '';
        }
    }

    async newuser(textdata) {
        let textdto             = new this.TextMsgDTO();
        textdto.msgid           = "";
        textdto.userid          = textdata.identifiant;
        if (textdto.userid === undefined || textdto.userid === ''){
            return '';
        }
        textdto.password        = textdata.passe;
        if (textdto.password === undefined || textdto.password === ''){
            return '';
        }

        return this.textmsgAccess.saveTextMsg(textdto);
    }
}
module.exports = TextMsgLogic;
