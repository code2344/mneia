import argon2 from "argon2";
import { prisma } from "../db.js";
import { createHash, randomBytes } from "node:crypto";
function normaliseEmail(email) {
    return email.trim().toLowerCase();
}
function normaliseFirstName(firstName) {
    return firstName.trim();
}
function createSessionToken() {
    return randomBytes(32).toString("base64url");
}
function hashSessionToken(token) {
    return createHash("sha256").update(token).digest("hex");
}
export async function getCurrentUser(sessionToken) {
    const tokenHash = hashSessionToken(sessionToken);
    const session = await prisma.sessions.findUnique({
        where: {
            token_hash: tokenHash,
        },
        include: {
            users: true,
        },
    });
    if (!session) {
        return null;
    }
    if (session.expires_at <= new Date()) {
        await prisma.sessions.delete({
            where: {
                id: session.id,
            },
        });
        return null;
    }
    return {
        id: session.users.id,
        firstName: session.users.first_name,
        email: session.users.email,
    };
}
export async function registerUser(input) {
    const normalisedEmail = normaliseEmail(input.email);
    const normalisedFirstName = normaliseFirstName(input.firstName);
    const existingUser = await prisma.users.findFirst({
        where: {
            email: normalisedEmail,
        },
    });
    if (existingUser) {
        throw new Error("Email is already in use");
    }
    const passwordHash = await argon2.hash(input.password);
    const user = await prisma.users.create({
        data: {
            first_name: normalisedFirstName,
            email: normalisedEmail,
            password_hash: passwordHash,
        },
        select: {
            id: true,
            first_name: true,
            email: true,
        },
    });
    const sessionToken = await createSession(user.id);
    return {
        user: {
            id: user.id,
            firstName: user.first_name,
            email: user.email,
        },
        sessionToken,
    };
    // Continue from here
}
;
async function createSession(userId) {
    const sessionToken = createSessionToken();
    const tokenHash = hashSessionToken(sessionToken);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);
    await prisma.sessions.create({
        data: {
            user_id: userId,
            token_hash: tokenHash,
            expires_at: expiresAt,
        },
    });
    return sessionToken;
}
export async function login(input) {
    const normalisedEmail = normaliseEmail(input.email);
    const user = await prisma.users.findFirst({
        where: {
            email: normalisedEmail,
        },
    });
    if (!user || !(await argon2.verify(user.password_hash, input.password))) {
        throw new Error("Invalid email or password");
    }
    const sessionToken = await createSession(user.id);
    return {
        user: {
            id: user.id,
            firstName: user.first_name,
            email: user.email,
        },
        sessionToken,
    };
}
