import CopyPlugin = require("copy-webpack-plugin");
export let mode: string;
export let entry: string;
export let devtool: string;
export namespace module {
    let rules: ({
        test: RegExp;
        use: string;
        exclude: RegExp[];
        type?: undefined;
    } | {
        test: RegExp;
        use: {
            loader: string;
        };
        exclude?: undefined;
        type?: undefined;
    } | {
        test: RegExp;
        type: string;
        use?: undefined;
        exclude?: undefined;
    })[];
}
export namespace resolve {
    let extensions: string[];
    namespace fallback {
        let fs: boolean;
        let path: boolean;
        let crypto: boolean;
    }
}
export namespace output {
    export let publicPath: string;
    export let filename: string;
    let path_1: string;
    export { path_1 as path };
}
export let plugins: CopyPlugin[];
