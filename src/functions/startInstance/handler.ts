import "source-map-support/register";
import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { InstanceStateChange } from "@aws-sdk/client-ec2";
import schema from "./schema";
import { startInstance } from "@libs/awsEc2";

const start: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  const response = await startInstance(event.body.instanceId);

  return formatJSONResponse({
    instances: response.StartingInstances.map(
      (state: InstanceStateChange) => state.InstanceId
    ),
  });
};

export const main = middyfy(start);
