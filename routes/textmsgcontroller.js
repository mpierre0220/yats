let express = require('express');
let router = express.Router();
const TextMsgLogic = require("../businesslogic/textmsglogic")

require("console-stamp")(console)

router.post('/ajoutertexte',  async function(req, res, next) {

  const log = req.app.get('config').log();
  let resp='';
  let code=200;

  let tdata                       = {};
  tdata                           = req.body;

  let textMsgLogic                = new TextMsgLogic();

  console.log(`Ajouter Texte ${JSON.stringify(req.body)}`)

  await textMsgLogic.saveTextMsg(tdata).then((response)=>{
    resp=response;
    if (response===''){
      code=400;
      resp='text msg has not been added';
    }
  });
  res.status(code).json(resp);
});

router.post('/modifiertexte',  async function(req, res, next) {

  const log = req.app.get('config').log();
  let resp='';
  let code=200;

  let tdata                       = {};
  tdata                           = req.body;

  let textMsgLogic                = new TextMsgLogic();

  console.log(`Modifier Texte ${JSON.stringify(req.body)}`)

  await textMsgLogic.updateTextMsg(tdata).then((response)=>{
    resp=response;
    if (response===''){
      code=400;
      resp='text msg has not been modified';
    }
  });
  res.status(code).json(resp);
});

router.post('/liretexte', async function(req, res, next) {

  const log = req.app.get('config').log();
  let resp='';
  let code=200;

  let tdata                       = {};
  tdata                           = req.body;

  let textMsgLogic                = new TextMsgLogic();

  console.log(`Lister Texte ${JSON.stringify(req.body)}`)

  await textMsgLogic.getTextMsg(tdata).then((response)=>{
    resp=response;
    if (response===''){
      code=400;
      resp='text msg not found';
    }
  });
  res.status(code).json(resp);
});

router.post('/listeridtextes', async function(req, res, next) {

  const log = req.app.get('config').log();
  let resp='';
  let code=200;

  let tdata                       = {};
  tdata                           = req.body;

  let textMsgLogic                = new TextMsgLogic();

  console.log(`Lister identifiant Textes ${JSON.stringify(req.body)}`)

  await textMsgLogic.listTextMsgs(tdata).then((response)=>{
    resp=response;
    if (response===''){
      code=400;
      resp='text msg not found';
    }
  });
  res.status(code).json(resp);
});

router.post('/listertextes', async function(req, res, next) {

  const log = req.app.get('config').log();
  let resp='';
  let code=200;

  let tdata                       = {};
  tdata                           = req.body;

  let textMsgLogic                = new TextMsgLogic();

  console.log(`Listerr Textes ${JSON.stringify(req.body)}`)

  await textMsgLogic.getTextMsgs(tdata).then((response)=>{
    resp=response;
    if (response===''){
      code=400;
      resp='text msg not found';
    }
  });
  res.status(code).json(resp);
});



router.post('/nouveauidentifiant', async function(req, res, next) {

  const log = req.app.get('config').log();
  let resp='';
  let code=200;

  let tdata                       = {};
  tdata                           = req.body;

  let textMsgLogic                = new TextMsgLogic();

  await textMsgLogic.newuser(tdata).then((response)=>{
    resp=response;
    if (response===''){
      code=400;
      resp='text msg has not been added';
    }
  });
  res.status(code).json(resp);
});

router.post('/nouveaumotdepasse',  async function(req, res, next) {

  const log = req.app.get('config').log();
  let resp='';
  let code=200;

  let tdata                       = {};
  tdata                           = req.body;

  let textMsgLogic                = new TextMsgLogic();

  await textMsgLogic.newPassword(tdata).then((response)=>{
    resp=response;
    if (response===''){
      code=400;
      resp='password has not been changed';
    }
  });
  res.status(code).json(resp);
});

router.delete('/supprimertexte',  async function(req, res, next) {

  const log = req.app.get('config').log();
  let resp='';
  let code=200;

  let tdata                       = {};
  tdata                           = req.body;

  let textMsgLogic                = new TextMsgLogic();

  await textMsgLogic.deleteTextMsg(tdata).then((response)=>{
    resp=response;
    if (response===''){
      code=400;
      resp={"status":"Text Msg has not been deleted"};
    }
  });
  if (resp===1){
    resp={"status":"Deleted"}
  } else {
    code=400;
    resp={"status":"Text Msg has not been deleted"};
  }
  res.status(code).json(resp);
});

router.post('/supprimertexte', async function(req, res, next) {

  const log = req.app.get('config').log();
  let resp='';
  let code=200;

  let tdata                       = {};
  tdata                           = req.body;

  let textMsgLogic                = new TextMsgLogic();

  await textMsgLogic.deleteTextMsg(tdata).then((response)=>{
    resp=response;
    if (response===''){
      code=400;
      resp={"status":"Text Msg has not been deleted"};
    }
  });
  if (resp===1){
    resp={"status":"Deleted"}
  } else {
    code=400;
    resp={"status":"Text Msg has not been deleted"};
  }
  res.status(code).json(resp);
});


function parseBool(val) {
  let bool;
  if (val === "" || val === "false") {
    bool = false;
  } else bool = val === "true";
  return bool;
}

module.exports = router;

