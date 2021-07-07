import "source-map-support/register";
import { formatJSONResponse } from "@libs/apiGateway";
import {
  EC2Client,
  DescribeInstancesCommand,
  Reservation,
  Instance,
} from "@aws-sdk/client-ec2";

const listInstances = async () => {
  const client = new EC2Client({});
  const command = new DescribeInstancesCommand({
    // todo: Add filters, max results, pagination
  });
  const response = await client.send(command);

  const instances = response.Reservations.flatMap((reservation: Reservation) =>
    reservation.Instances.map(
      (instance: Instance) => `${instance.InstanceId}: ${instance.State.Name}`
    )
  );
  return formatJSONResponse({ instances });
};

export const main = listInstances;
