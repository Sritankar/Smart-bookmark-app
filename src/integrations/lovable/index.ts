import { supabase } from "../supabase/client";

type SignInOptions = {
  redirect_uri?: string;
};

export const lovable = {
  auth: {
    signInWithOAuth: async (provider: "google", opts?: SignInOptions) => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: opts?.redirect_uri || window.location.origin,
        },
      });

      if (error) {
        return { error };
      }

      return data;
    },
  },
};