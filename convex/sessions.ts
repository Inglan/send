import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createWithCode = mutation({
  args: {
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const sessionId = await ctx.db.insert("sessions", {
      content: args.content,
    });
    let sessionCode = "";
    async function generateSessionCode() {
      sessionCode = Math.random().toString(36).substring(2, 7).toUpperCase();
      const existingCode = await ctx.db
        .query("sessionCodes")
        .withIndex("by_code", (q) => q.eq("code", sessionCode))
        .collect();
      if (existingCode.length > 0) {
        await generateSessionCode();
      }
    }
    await generateSessionCode();
    await ctx.db.insert("sessionCodes", {
      code: sessionCode,
      session: sessionId,
    });
    return { sessionId, sessionCode };
  },
});
