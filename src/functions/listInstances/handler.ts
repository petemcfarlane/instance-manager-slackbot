import "source-map-support/register";
import { formatJSONResponse } from "@libs/apiGateway";

const listInstances = async () => {
  return formatJSONResponse({ instances: "🟢 123abc\n🟠456def" });
};

export const main = listInstances;
