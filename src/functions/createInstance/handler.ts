import "source-map-support/register";
import { formatJSONResponse } from "@libs/apiGateway";

const createInstance = async () => {
  return formatJSONResponse({ instance: "🔴 ghi789" });
};

export const main = createInstance;
