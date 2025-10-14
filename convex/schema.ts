import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  sessionCodes: defineTable({
    code: v.string(),
    session: v.id("sessions"),
  }),
  sessions: defineTable({
    content: v.string(),
  }),
});
