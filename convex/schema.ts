import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  sessionCodes: defineTable({
    code: v.string(),
    session: v.id("sessions"),
  }).index("by_code", ["code"]),
  sessions: defineTable({
    content: v.string(),
  }),
  ...authTables,
});
