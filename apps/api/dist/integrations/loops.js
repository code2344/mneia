import { LoopsClient } from "loops";
const apiKey = process.env.LOOPS_API_KEY;
if (!apiKey && process.env.NODE_ENV === "production") {
    throw new Error("Missing LOOPS_API_KEY");
}
export const loops = apiKey ? new LoopsClient(apiKey) : null;
export async function syncUserContact(input) {
    if (!loops)
        return;
    return loops.updateContact({
        userId: input.id,
        email: input.email,
        properties: {
            firstName: input.firstName,
            source: "mneia_app",
        },
    });
}
