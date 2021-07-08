import {
  DescribeInstancesCommand,
  DescribeInstancesCommandOutput,
  DescribeInstanceStatusCommand,
  DescribeInstanceStatusCommandOutput,
  EC2Client,
  RunInstancesCommand,
  RunInstancesCommandOutput,
  StartInstancesCommand,
  StartInstancesCommandOutput,
  StopInstancesCommand,
  StopInstancesCommandOutput,
  TerminateInstancesCommand,
  TerminateInstancesCommandOutput,
} from "@aws-sdk/client-ec2";

const client = new EC2Client({});

export function describeInstanceStatus(
  instanceId: string
): Promise<DescribeInstanceStatusCommandOutput> {
  const command = new DescribeInstanceStatusCommand({
    InstanceIds: [instanceId],
  });
  return client.send(command);
}

export function listInstances(): Promise<DescribeInstancesCommandOutput> {
  const command = new DescribeInstancesCommand({
    // todo: Add filters, max results, pagination
  });
  return client.send(command);
}

export function runInstance(): Promise<RunInstancesCommandOutput> {
  // todo: Should we limit how many instances can be created overall?!
  const command = new RunInstancesCommand({
    MaxCount: 1,
    MinCount: 1,
    ImageId: process.env.AMI_ID,
    InstanceType: "t2.micro",
    // todo set security groups, network interfaces etc.
  });
  return client.send(command);
}

export function startInstance(
  instanceId: string
): Promise<StartInstancesCommandOutput> {
  const command = new StartInstancesCommand({
    InstanceIds: [instanceId],
  });
  return client.send(command);
}

export function stopInstance(
  instanceId: string
): Promise<StopInstancesCommandOutput> {
  const command = new StopInstancesCommand({
    InstanceIds: [instanceId],
  });
  return client.send(command);
}

export function terminateInstance(
  instanceId: string
): Promise<TerminateInstancesCommandOutput> {
  const command = new TerminateInstancesCommand({
    InstanceIds: [instanceId],
  });
  return client.send(command);
}
