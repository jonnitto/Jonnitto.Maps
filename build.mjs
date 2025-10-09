import esbuild from "esbuild";

const production = process.argv.includes("--production");

const baseOptions = {
    logLevel: "info",
    bundle: true,
    minify: true,
    sourcemap: !production,
    target: "es2020",
    legalComments: "linked",
    entryPoints: ["Resources/Private/Assets/*.js"],
};

const scriptOptions = { ...baseOptions, outdir: "Resources/Public/Scripts", format: "iife" };

const moduleOptions = { ...baseOptions, outdir: "Resources/Public/Modules", format: "esm", splitting: true };

async function watch(options) {
    const context = await esbuild.context(options);
    await context.watch();
}

if (process.argv.includes("--watch")) {
    watch(scriptOptions);
    watch(moduleOptions);
} else {
    esbuild.build(scriptOptions);
    esbuild.build(moduleOptions);
}
