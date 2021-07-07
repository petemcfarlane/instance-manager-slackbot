export default {
  type: "object",
  properties: {
    instanceId: { type: "string" },
  },
  required: ["instanceId"],
} as const;
