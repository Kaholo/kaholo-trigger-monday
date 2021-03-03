const { findTriggers } = require('./helpers')

function statusUpdateWebhook(req,res) {
    const body = req.body;
    // Monday sends a 'challenge' post request when connecting a new webhook
    if (body.hasOwnProperty("challenge")){ 
        res.send(body); // send challenge back to monday
        return;
    }

    const boardID = body.event.boardId; // Get board ID
    const eventType = body.event.type; // Get event type
    if (!eventType || !boardID){
        throw "bad monday update format";
    }

    findTriggers(
        validateTrigger, { boardID },
        res, req,
        "STATUS_UPDATE_WEBHOOK",
        eventType // event description for kaholo
    );
    
}

async function validateTrigger(trigger, { boardID }) {
    const triggerBoardID = (trigger.params.find((o) => o.name === "BOARD_ID").value || "").trim();
    /**
     * if board ID was provided check it matches board ID in post request
     */
    if (triggerBoardID && triggerBoardID != boardID) {
      throw "Not same board ID";
    }
    return true;
}

module.exports = {
    STATUS_UPDATE_WEBHOOK: statusUpdateWebhook
}
