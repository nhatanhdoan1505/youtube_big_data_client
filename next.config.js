/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  env: {
    STRIPE_PUBLIC:
      "pk_test_51LDPUsJ8XE3hrjLvVJKpRe0BlfyX6gtzmLhNjyMdE4GPnTHRnNppjzd7IlP62VSFk8rBXqlp3fdgsamw1eMOywPD00fp2DswNO",
  },
};
