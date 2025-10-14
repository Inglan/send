import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createWithCode = mutation({
  args: {
    content: v.string(),
  },
  handler: async (ctx, args) => {
    // Create session
    const sessionId = await ctx.db.insert("sessions", {
      content: args.content,
    });

    // Initialise blank session code
    let sessionCode = "";

    // Generate code
    async function generateSessionCode() {
      sessionCode = Math.random().toString(36).substring(2, 7).toUpperCase();

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
    return { sessionId, sessionCode };
  },
});

export const retrieveSessionByCode = mutation({
  args: {
    code: v.string(),
  },
  handler: async (ctx, args) => {
    // Get session ID
    const sessionId = (
      await ctx.db
        .query("sessionCodes")
        .withIndex("by_code", (q) => q.eq("code", args.code))
        .first()
    )?.session;
    if (!sessionId) {
      throw new Error("Session not found");
    }

    // Get session information
    const session = await ctx.db.get(sessionId);

    ctx.db.delete(sessionId);

    return session;
  },
});
