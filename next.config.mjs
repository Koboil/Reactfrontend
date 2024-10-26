/* eslint-disable @typescript-eslint/no-var-requires */
import 'reflect-metadata';
import {withSentryConfig} from '@sentry/nextjs';
import WebpackObfuscator from 'webpack-obfuscator';
import NextBundleAnalyzer from '@next/bundle-analyzer';
import webpack from 'webpack';

import withMDXClass from '@next/mdx';

const withMDX = withMDXClass();


const ANALYZE = process.env.ANALYZE === 'true';
const HAS_SENTRY = !!(process.env.SENTRY_DSN && process.env.SENTRY_PROJECT);

const withBundleAnalyzer = NextBundleAnalyzer({
    enabled: ANALYZE,
});

/** @type {import('next').NextConfig} */

const nextConfig = {
    // Compression should be done at the reverse-proxy level
    compress: false,
    // Configure `pageExtensions` to include MDX files
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    compiler: {
        styledComponents: true,
    },

    webpack(config, {buildId, dev}) {
        config.module.rules.push({

            test: /\.svg$/,
            use: ['@svgr/webpack'],
        });

        /*
                config.module.rules.push({
                    test: /\.ttf$/,
                    use: ['url-loader'],
                });
                */

        if (!dev) {
            config.plugins.push(
                new WebpackObfuscator(
                    {
                        identifierNamesGenerator: 'mangled-shuffled',
                        rotateStringArray: true,
                        sourceMap: true,
                        sourceMapBaseUrl: 'http://localhost:3000/_next/',
                    },
                    [],
                ),
            );

            if (HAS_SENTRY) {
                // Sentry SDK tree-shaking
                // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/tree-shaking/#tree-shaking-optional-code-with-nextjs)
                config.plugins.push(
                    new webpack.DefinePlugin({
                        __SENTRY_DEBUG__: false,
                    }),
                );
            }
        }

        if (ANALYZE) {
            const StatoscopeWebpackPlugin = require('@statoscope/webpack-plugin').default;
            config.plugins.push(new StatoscopeWebpackPlugin());
        }

        // load worker files as a urls with `file-loader`
        config.module.rules.unshift({
            test: /pdf\.worker\.(min\.)?js/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: '[contenthash].[ext]',
                        publicPath: '/_next/static/worker',
                        outputPath: 'static/worker',
                    },
                },
            ],
        });

        // Uncomment to enable profiling in production
        // config.resolve.alias = {
        //   ...config.resolve.alias,
        //   'react-dom$': 'react-dom/profiling',
        //   'scheduler/tracing': 'scheduler/tracing-profiling',
        // };

        return config;
    },
    productionBrowserSourceMaps: true,
    poweredByHeader: false,
    reactStrictMode: true,
    eslint: {ignoreDuringBuilds: true},
    typescript: {ignoreBuildErrors: true},
};

const SentryWebpackPluginOptions = {
    sentry: {
        hideSourceMaps: true,
        disableServerWebpackPlugin: !HAS_SENTRY,
        disableClientWebpackPlugin: !HAS_SENTRY,
    },
    silent: true,
    // urlPrefix: '~/_next',
    // This prefix is stripped from the `sources` array in the maps
    include: [
        {
            paths: ['.next'],
            stripPrefix: ['webpack://_N_E/'],
            ignore: ['node_modules', 'webpack.config.js', '_buildManifest.js'
            ],
        },
    ],
    urlPrefix: '~/_next/', // seems unused
    validate: true,
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins

// Sentry-sdk broke the build, this is needed because some packages apparently do not return the
// appropriate types
// From https://github.com/getsentry/sentry-javascript/issues/6447#issuecomment-1340671081
const config = (phase, defaultConfig) => {
    const plugins = [
        (config) => withSentryConfig(config, SentryWebpackPluginOptions),
        (config) => withBundleAnalyzer(config),
    ];

    return plugins.reduce(
        (acc, plugin) => {
            const pluginReturnValue = plugin(acc);

            let newConfig;
            if (typeof pluginReturnValue === 'function') {
                newConfig = pluginReturnValue(phase, defaultConfig);
            } else {
                newConfig = pluginReturnValue;
            }

            return newConfig;
        },
        {...nextConfig},
    );
};


export default withMDX(config());
