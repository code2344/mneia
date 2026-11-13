import { prisma } from "../db.js";
import { loops } from "../integrations/loops.js";
function normaliseEmail(email) {
    return email.trim().toLowerCase();
}
export async function createWaitlistSignup(input) {
    const email = normaliseEmail(input.email);
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new Error("Enter a valid email address");
    }
    const existingSignup = await prisma.waitlist_signups.findUnique({
        where: { email },
    });
    if (existingSignup) {
        throw new Error("Email is already on the waitlist");
    }
    const signup = await prisma.waitlist_signups.create({
        data: { email },
    });
    if (!loops) {
        throw new Error("Loops is not configured");
    }
    const listId = process.env.LOOPS_WAITLIST_LIST_ID;
    if (!loops || !listId) {
        throw new Error("Loops waitlist integration is not configured");
    }
    await loops.createContact({
        email,
        mailingLists: {
            [listId]: true,
        },
    });
    return {
        id: signup.id,
        message: "You're on the waitlist",
    };
}
