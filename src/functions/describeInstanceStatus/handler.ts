import "source-map-support/register";
import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { InstanceStatus } from "@aws-sdk/client-ec2";
import schema from "./schema";
import { describeInstanceStatus } from "@libs/awsEc2";

const describeInstance: ValidatedEventAPIGatewayProxyEvent<typeof schema> =
  async (event) => {
    const response = await describeInstanceStatus(event.body.instanceId);

    return formatJSONResponse({
      instances: response.InstanceStatuses.map(
        (instance: InstanceStatus) =>
          `${instance.InstanceId}: ${instance.InstanceState.Name}`
      ),
    });
  };

export const main = middyfy(describeInstance);
