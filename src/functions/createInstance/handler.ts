import "source-map-support/register";
import { formatJSONResponse } from "@libs/apiGateway";
import { EC2Client, Instance, RunInstancesCommand } from "@aws-sdk/client-ec2";

const createInstance = async () => {
  const client = new EC2Client({});
  const command = new RunInstancesCommand({
    MaxCount: 1,
    MinCount: 1,
    ImageId: process.env.AMI_ID,
    // todo set security groups, network interfaces etc.
  });
  const response = await client.send(command);

  return formatJSONResponse({
    response: response.Instances.map(
      (instance: Instance) => `${instance.InstanceId}: ${instance.State.Name}`
    ),
  });
};

export const main = createInstance;
