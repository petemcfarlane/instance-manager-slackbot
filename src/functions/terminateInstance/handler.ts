import "source-map-support/register";
import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import {
  EC2Client,
  InstanceStateChange,
  TerminateInstancesCommand,
} from "@aws-sdk/client-ec2";
import schema from "./schema";

const terminateInstance: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async (event) => {
    // todo: validate the instanceId is the correct format
    // what happens if the instance id doesn't exist?
    // should we allow people to terminate running instances?
    const client = new EC2Client({});
    const command = new TerminateInstancesCommand({
      InstanceIds: [event.body.instanceId],
    });
    const response = await client.send(command);

    return formatJSONResponse({
      instances: response.TerminatingInstances.map(
        (state: InstanceStateChange) => state.InstanceId
      ),
    });
  };

export const main = middyfy(terminateInstance);
