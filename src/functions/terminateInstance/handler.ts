import "source-map-support/register";
import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { InstanceStateChange } from "@aws-sdk/client-ec2";
import schema from "./schema";
import { terminateInstance } from "@libs/awsEc2";

const terminate: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (
  event
) => {
  // todo: validate the instanceId is the correct format
  // what happens if the instance id doesn't exist?
  // should we allow people to terminate running instances?
  const response = await terminateInstance(event.body.instanceId);

  return formatJSONResponse({
    instances: response.TerminatingInstances.map(
      (state: InstanceStateChange) => state.InstanceId
    ),
  });
};

export const main = middyfy(terminate);
