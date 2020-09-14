const config = require("./config");
const mapExecutionService = require("../../../api/services/map-execution.service");
const Trigger = require("../../../api/models/map-trigger.model");

function statusUpdateWebhook(req,res) {
    let body = req.body
    if (req.body.challenge) {
        res.json(req.body)
    }
    else {
        Trigger.find({ plugin: config.name }).then((triggers) => {
            console.log(`Found ${triggers.length} triggers`);
            res.send('OK');
            triggers.forEach(trigger=>execTrigger(trigger,body,req.io))
        }).catch((error) => res.send(error))
    }
}

function execTrigger (trigger, body, io) {
    new Promise ((resolve,reject) => {
        const boardId = body.event.boardId;
        const triggerBoardId = trigger.params.find(o => o.name === 'BOARD_ID');
        if (triggerBoardId.value != boardId) {
            console.log(borderId);
            return reject("Not matching border ID");
        } else {
            return resolve()
        }
    }).then(() => {
        console.log(trigger.map);
        let message = trigger.name + ' started by Monday trigger'
        console.log(`********** Monday: executing map ${trigger.map} **********`);
        mapExecutionService.execute(trigger.map,null,io,{config: trigger.configuration},message,body);
    }).catch(err=>{
        console.error(err);
    })
}
module.exports = {
    STATUS_UPDATE_WEBHOOK: statusUpdateWebhook
}
