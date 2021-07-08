import "source-map-support/register";
import { formatJSONResponse } from "@libs/apiGateway";
import { Instance } from "@aws-sdk/client-ec2";
import { runInstance } from "@libs/awsEc2";

export const main = async () => {
  const response = await runInstance();

  return formatJSONResponse({
    response: response.Instances.map(
      (instance: Instance) => `${instance.InstanceId}: ${instance.State.Name}`
    ),
  });
};
