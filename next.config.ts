import { withNextVideo } from 'next-video/process';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  webpack(config) {
    const imagesRuleIndex = config.module.rules.findIndex(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (rule: any) => rule.loader === 'next-image-loader',
    );
    const [imagesRule] = config.module.rules.splice(imagesRuleIndex, 1);

    imagesRule.resourceQuery.not.push(/inline/);

    config.module.rules.push({
      oneOf: [
        imagesRule,
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          resourceQuery: /inline/,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                svgoConfig: {
                  plugins: [
                    {
                      name: 'preset-default',
                      params: {
                        overrides: {
                          removeViewBox: false,
                        },
                      },
                    },
                    {
                      name: 'removeAttrs',
                      params: {
                        attrs: ['xmlns', 'xmlns:xlink'],
                      },
                    },
                    'prefixIds',
                  ],
                },
              },
            },
          ],
        },
      ],
    });

    return config;
  },
  rewrites() {
    return Promise.resolve(
      process.env.LOCAL_BASE_API_URL
        ? [
            {
              source: '/graphql',
              destination: `${process.env.LOCAL_BASE_API_URL}/graphql`,
            },
          ]
        : [],
    );
  },
};

export default withNextVideo(nextConfig, { folder: 'src/assets/motions' });
