import "source-map-support/register";
import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { InstanceStateChange } from "@aws-sdk/client-ec2";
import schema from "./schema";
import { stopInstance } from "@libs/awsEc2";

const stop: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  // todo: validate instanceIds
  // what happens if the instances don't exist or are already stopped?
  const response = await stopInstance(event.body.instanceId);

  return formatJSONResponse({
    instances: response.StoppingInstances.map(
      (state: InstanceStateChange) => state.InstanceId
    ),
  });
};

export const main = middyfy(stop);
