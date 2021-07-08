import "source-map-support/register";
import { App, AwsLambdaReceiver } from "@slack/bolt";
import {
  runInstance,
  startInstance,
  stopInstance,
  terminateInstance,
} from "@libs/awsEc2";
import {
  AwsCallback,
  AwsEvent,
  AwsHandler,
  AwsResponse,
} from "@slack/bolt/dist/receivers/AwsLambdaReceiver";
import { generateView } from "@libs/slackHelpers";

const awsLambdaReceiver = new AwsLambdaReceiver({
  signingSecret: process.env.SLACK_SIGNING_SECRET,
});

// Initializes your app with your bot token and signing secret
const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  receiver: awsLambdaReceiver,
  // The `processBeforeResponse` option is required for all FaaS environments.
  // It allows Bolt methods (e.g. `app.message`) to handle a Slack request
  // before the Bolt framework responds to the request (e.g. `ack()`). This is
  // important because FaaS immediately terminate handlers after the response.
  processBeforeResponse: true,
});

app.shortcut("listInstances", async ({ shortcut, ack, client }) => {
  try {
    await ack();

    const view = await generateView();
    await client.views.open({
      trigger_id: shortcut.trigger_id,
      view,
    });
  } catch (error) {
    console.error(error);
  }
});

app.action("refreshView", async ({ ack, body, client }: any) => {
  try {
    await ack();
    const view = await generateView();
    client.views.update({
      view_id: body.view.id,
      view,
    });
  } catch (error) {
    console.error(error);
  }
});

//SlackActionMiddlewareArgs<BlockStaticSelectAction>
app.action("instance-action", async ({ ack, body, client, payload }: any) => {
  try {
    await ack();
    const command = payload.selected_option.value;
    let matches;
    if ((matches = command.match(/terminate_(i-[\w]+)/))) {
      await terminateInstance(matches[1]);
    }
    if ((matches = command.match(/start_(i-[\w]+)/))) {
      await startInstance(matches[1]);
    }
    if ((matches = command.match(/stop_(i-[\w]+)/))) {
      await stopInstance(matches[1]);
    }
    const view = await generateView();
    client.views.update({
      view_id: body.view.id,
      view,
    });
  } catch (error) {
    console.error(error);
  }
});

app.action("createInstance", async ({ ack, client, body }: any) => {
  try {
    await ack();
    await runInstance();
    const newView = await generateView();
    client.views.update({
      view_id: body.view.id,
      // hash: body.view.hash,
      view: newView,
    });
  } catch (error) {
    console.error(error);
  }
});

export const main = async (
  event: AwsEvent,
  context: any,
  callback: AwsCallback
): Promise<AwsResponse> => {
  // todo the library docs note that the start() should be made generic, see if I can get around to making a PR for this...
  const handler: AwsHandler | any = await app.start();

  return handler(event, context, callback);
};
