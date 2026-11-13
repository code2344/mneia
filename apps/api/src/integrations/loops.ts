import { LoopsClient } from "loops";

const apiKey = process.env.LOOPS_API_KEY;

if (!apiKey && process.env.NODE_ENV === "production") {
  throw new Error("Missing LOOPS_API_KEY");
}

const loops = apiKey ? new LoopsClient(apiKey) : null;

export async function syncUserContact(input: {
  id: string;
  email: string;
  firstName: string;
}) {
  if (!loops) return;

  return loops.updateContact({
    userId: input.id,
    email: input.email,
    properties: {
      firstName: input.firstName,
      source: "mneia_app",
    },
  });
}

export async function addWaitlistContact(email: string) {
  if (!loops) return;

  return loops.createContact({
    email,
  });
}