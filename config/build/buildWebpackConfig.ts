import webpack from 'webpack';
import { BuildOptions } from './types/config';
import { buildPlugins } from './buildPlugin';
import { buildLoaders } from './buildLoaders';
import { buildResolves } from './buildResolves';
import { buildDevServer } from './buildDevServer';

export function buildWebpackConfig(options: BuildOptions) : webpack.Configuration {
    const { mode, paths, isDev } = options;
    return {
        mode, // если дев режим разработки, то все с коментариями и подробно.
        entry: paths.entry, // резолф для склейки учатков пути   //стартовая точка нашего прложения
        output: {
            filename: '[name].[contenthash].js', // название файла сборки [динамическое название], для кеширования в браузере, без перезагрузки с сервера,чтобы с изменениями не выкатил старую весию приложения
            path: paths.build, // куда и как пойдет сборка нашего приложения
            clean: true, // очищаем файлы после сборки ненужные
            publicPath: '/',
        },
        plugins: buildPlugins(options), // вызов функции с плагинами из билдплагинс
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolves(options),
        devtool: isDev ? 'inline-source-map' : undefined,
        devServer: isDev ? buildDevServer(options) : undefined,
    };
}
