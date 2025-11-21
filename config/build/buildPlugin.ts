import HtmlWebpackPlugin from 'html-webpack-plugin';
import webpack from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { BuildOptions } from './types/config';

export function buildPlugins({
    paths, isDev, apiUrl, project,
}: BuildOptions): webpack.WebpackPluginInstance[] {
    const plugins = [
        new HtmlWebpackPlugin({
            template: paths.html, // html файл наш как шаблон
        }), // динамическое добавлпние скрипта в html bundle
        new webpack.ProgressPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }),
        new webpack.DefinePlugin({
            IS_DEV: JSON.stringify(isDev),
            MY_API: JSON.stringify(apiUrl),
            PROJECT: JSON.stringify(project),
        }),
    ];

    if (isDev) {
        plugins.push(new webpack.HotModuleReplacementPlugin());
    }
    return plugins;
}
