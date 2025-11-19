export type BuildMode = 'production' | 'development'; // тип для свойста мода 2 значения
export interface BuildPaths {
    entry: string; // путь до энтрипойнт
    build:string; // путь до папки со сборкой
    html: string; // путь до файла html
    src: string;

}
export interface BuildEnv {
    mode: BuildMode;
    port: number;
    apiUrl: string;
}
export interface BuildOptions {
    mode: BuildMode;
    paths: BuildPaths; // св-во пути
    isDev: boolean;
    port: number;
    apiUrl: string;
    project: 'storybook' | 'frontend' | 'jest';
}
