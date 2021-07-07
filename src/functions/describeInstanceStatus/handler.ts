import "source-map-support/register";
import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import {
  EC2Client,
  DescribeInstanceStatusCommand,
  InstanceStatus,
} from "@aws-sdk/client-ec2";
import schema from "./schema";

const startInstance: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const client = new EC2Client({});
  const command = new DescribeInstanceStatusCommand({
    InstanceIds: [event.body.instanceId],
  });
  const response = await client.send(command);

  return formatJSONResponse({
    instances: response.InstanceStatuses.map(
      (instance: InstanceStatus) =>
        `${instance.InstanceId}: ${instance.InstanceState.Name}`
    ),
  });
};

export const main = middyfy(startInstance);
