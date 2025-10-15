import { convexAuth, getAuthUserId } from "@convex-dev/auth/server";
import { Anonymous } from "@convex-dev/auth/providers/Anonymous";
import { query } from "./_generated/server";
import GitHub from "@auth/core/providers/github";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Anonymous, GitHub],
});

export const getCurrentUser = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) {
      return null;
    }

    const user = await ctx.db.get(userId);

    if (!user) {
      return null;
    }

    return user;
  },
});
