/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    loader: "custom",
    loaderFile: "./utils/supabase/loader.ts",
  },
};

module.exports = nextConfig;
