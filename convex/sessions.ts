import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createWithCode = mutation({
  args: {
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const sessionId = await ctx.db.insert("sessions", { content: args.content });
    const sessionCode = await ctx.db.insert("sessionCodes", { session: sessionId, code: Math.random().toString(36).substring(2, 15) });
    return { sessionId, sessionCode };
  },
});
