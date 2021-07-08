import { Instance, InstanceStateName, Reservation } from "@aws-sdk/client-ec2";
import { listInstances } from "@libs/awsEc2";
import { SectionBlock, View } from "@slack/bolt";

export async function generateView(): Promise<View> {
  const instances = await listInstances();
  const instanceBlocks = instances.Reservations.flatMap(
    (reservation: Reservation) => reservation.Instances.map(renderInstanceBlock)
  );
  if (instanceBlocks.length === 0) {
    instanceBlocks.push({
      type: "section",
      text: {
        type: "plain_text",
        text: "There are no EC2 instances. Click the button below to start one.",
        emoji: true,
      },
    });
  }

  return {
    type: "modal",
    title: {
      type: "plain_text",
      text: "Instances",
    },
    close: {
      type: "plain_text",
      text: "Close",
    },
    blocks: [...instanceBlocks, launchNewInstanceBlock, legendBlock],
  };
}

const launchNewInstanceBlock = {
  type: "actions",
  elements: [
    {
      type: "button",
      text: {
        type: "plain_text",
        text: ":rocket: Launch New Instance",
        emoji: true,
      },
      value: "createInstance",
      action_id: "createInstance",
    },
    {
      type: "button",
      text: {
        type: "plain_text",
        text: ":arrows_counterclockwise: Refresh",
        emoji: true,
      },
      value: "refreshView",
      action_id: "refreshView",
    },
  ],
};

const legendBlock = {
  type: "context",
  elements: [
    {
      type: "mrkdwn",
      text: "*Legend:*\n🟢 Running, 🔵 Pending, 🟠 Stopping, 🔴 Stopped, 🟤 Terminating, ⚫️ Terminated",
    },
  ],
};

function renderInstanceBlock(instance: Instance): SectionBlock {
  const options = [];
  if (instance.State.Name === "stopped") {
    options.push({
      text: {
        type: "plain_text",
        text: "Start",
      },
      value: `start_${instance.InstanceId}`,
    });
    options.push({
      text: {
        type: "plain_text",
        text: "Terminate",
      },
      value: `terminate_${instance.InstanceId}`,
    });
  }
  if (instance.State.Name === "running") {
    options.push({
      text: {
        type: "plain_text",
        text: "Stop",
      },
      value: `stop_${instance.InstanceId}`,
    });
    options.push({
      text: {
        type: "plain_text",
        text: "Terminate",
      },
      value: `terminate_${instance.InstanceId}`,
    });
  }

  const instanceBlock = <SectionBlock>{
    type: "section",
    text: {
      type: "mrkdwn",
      text: `${stateIcon(instance.State.Name)} ${instance.InstanceId}`,
    },
  };
  return options.length === 0
    ? instanceBlock
    : {
        ...instanceBlock,
        accessory: {
          type: "static_select",
          placeholder: {
            type: "plain_text",
            text: "Choose action",
            emoji: true,
          },
          action_id: "instance-action",
          options,
        },
      };
}

function stateIcon(state: InstanceStateName | string): string {
  switch (state) {
    case "running":
      return "🟢";
    case "pending":
      return "🔵";
    case "stopping":
      return "🟠";
    case "stopped":
      return "🔴";
    case "shutting-down":
      return "🟤";
    case "terminated":
      return "⚫️";
  }
}
