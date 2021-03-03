# kaholo-trigger-monday
Kaholo Trigger for Monday

## How to use:
After installing the trigger on Kaholo, follow the steps described [here](https://monday.com/integrations/webhooks) to link the webhook to your monday board.

## Method: Board Change
This triggers whenever there is a change in a board.

### Webhook URL:
**{KAHOLO_URL}/webhook/monday/board**

### Parameters:
1) Board ID - If specified, only trigger when the event came from a board with the same board ID the board ID provided. If not
    specified, accept events coming from any board. You can see your board ID in the URL of your board.