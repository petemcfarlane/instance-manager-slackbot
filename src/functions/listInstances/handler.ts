import "source-map-support/register";
import { formatJSONResponse } from "@libs/apiGateway";
import { Reservation, Instance } from "@aws-sdk/client-ec2";
import { listInstances } from "@libs/awsEc2";

export const main = async () => {
  const response = await listInstances();

  const instances = response.Reservations.flatMap((reservation: Reservation) =>
    reservation.Instances.map(
      (instance: Instance) => `${instance.InstanceId}: ${instance.State.Name}`
    )
  );
  return formatJSONResponse({ instances });
};
