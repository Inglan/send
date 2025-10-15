import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { rateLimiter } from "./ratelimit";
import { CODE_LENGTH } from "../lib/constants";

export const createWithCode = mutation({
  args: {
    content: v.string(),
  },
  handler: async (ctx, args) => {
    await rateLimiter.limit(ctx, "createSession", {
      throws: true,
    });
    // Create session
    const sessionId = await ctx.db.insert("sessions", {
      content: args.content,
    });

    // Initialise blank session code
    let sessionCode = "";

    // Generate code
    async function generateSessionCode() {
      sessionCode = Math.random()
        .toString(36)
        .substring(2, CODE_LENGTH + 2)
        .toUpperCase();

      // Check if code already exists
      const existingCode = await ctx.db
        .query("sessionCodes")
        .withIndex("by_code", (q) => q.eq("code", sessionCode))
        .collect();
      if (existingCode.length > 0) {
        // Retry generating a new code
        await generateSessionCode();
      }
    }
    await generateSessionCode();

    // Add session code to database
    await ctx.db.insert("sessionCodes", {
      code: sessionCode,
      session: sessionId,
    });

    // Return session information
    return { sessionId };
  },
});

export const retrieveSessionByCode = mutation({
  args: {
    code: v.string(),
  },
  handler: async (ctx, args) => {
    // Get session ID
    const sessionCodeObject = await ctx.db
      .query("sessionCodes")
      .withIndex("by_code", (q) => q.eq("code", args.code))
      .first();
    if (!sessionCodeObject) {
      throw new Error("Session not found: " + args.code);
    }

    // Get session information
    const session = await ctx.db.get(sessionCodeObject.session);
    if (!session) {
      throw new Error("Session not found");
    }

    ctx.db.delete(sessionCodeObject._id);

    return { sessionId: session._id };
  },
});

export const getContent = query({
  args: {
    id: v.id("sessions"),
  },
  handler: async (ctx, args) => {
    const session = await ctx.db.get(args.id);
    if (!session) {
      throw new Error("Session not found");
    }

    return session.content;
  },
});
