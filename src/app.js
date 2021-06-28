function statusUpdateWebhook(req, res, settings, triggerControllers) {
    try {
        const body = req.body;
        if (body.hasOwnProperty("challenge")){ 
            return res.send(body); // send challenge back to monday
        }
        const reqBoardId = body.event.boardId; // Get board ID
        const eventType = body.event.type; // Get event type
        if (!eventType || !reqBoardId){
            return res.status(400).send("bad monday update format");
        }
        triggerControllers.forEach(trigger => {
            const boardId = trigger.params.BOARD_ID || settings.boardId;
            if (boardId && reqBoardId.toString() !== boardId) return;
            trigger.execute(`Monday ${eventType} Event - ${reqBoardId}`, body);
        });
        res.status(200).send("OK");
      }
    catch (err){
        res.status(422).send(err.message);
    }
}

module.exports = {
    STATUS_UPDATE_WEBHOOK: statusUpdateWebhook
}
