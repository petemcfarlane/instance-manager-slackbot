import "source-map-support/register";
import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import {
  EC2Client,
  InstanceStateChange,
  StopInstancesCommand,
} from "@aws-sdk/client-ec2";
import schema from "./schema";

const stopInstance: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const client = new EC2Client({});
  const command = new StopInstancesCommand({
    InstanceIds: [event.body.instanceId],
  });
  const response = await client.send(command);

  return formatJSONResponse({
    instances: response.StoppingInstances.map(
      (state: InstanceStateChange) => state.InstanceId
    ),
  });
};

export const main = middyfy(stopInstance);
