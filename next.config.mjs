/** @type {import('next').NextConfig} */
const nextConfig = {
        env: {
          userName: process.env.NEXT_PUBLIC_DBUSERNAME,
          password: process.env.NEXT_PUBLIC_DBPASSWORD,
        },
};

export default nextConfig;
