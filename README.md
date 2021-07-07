# Challenge 1: Cloud Slack Bot
Create a slack bot to manage cloud instances. You can choose whatever cloud provider you want (e.g. Openstack, AWS, GCP, Azure).

The bot should be able to support:
- Creating new instances
- Removing existing instances
- Starting an instance
- Stopping an instance
- Displaying the status of an instance
- List all available instances

The bot should also be able to show a help message.

## Tools
For the components that make up this application please use a tool/language you’re comfortable with from this list.

API Back End: Node or PHP

Database: MySQL or MongoDB

## Deliverables
When you reach a stage you’re happy with, you should provide:

- Instructions on how to use it
- A .zip file of your project, including any & all source files, a readme file (which also documents any assumptions made during the implementation), config, tests etc..
- A running slack bot account or a deployment script so we can test it

---

## Initial plan
Create MySQL database with table `instances`

| instanceId | status  |
|------------|---------|
| abc123     | running |
| def456     | stopped |
| hij789     | pending |

- /list-instances
🟢 abc123
🟠 hij789
🔴 def456

- /create-instance
🔴 def456
(should it also start it?)

- /remove-instance def456
(should we allow removing only stopped instances?)

- /start-instance def456
(doesn't do anything to pending/running instances)

- /stop-instance abc123
(doesn't do anything to stopped instances)

- /instance-status abc123
🟢 abc123

