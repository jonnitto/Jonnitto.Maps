import layers from "protomaps-themes-base";
import { init, getOptions, getStyleType } from "./Modules/MapLibre.mjs";

async function setOptions() {
    const options = await getOptions();
    const { glyphs, url, attribution, style, sprite } = options.service.options;

    const styleFunction = () => {
        const theme = getStyleType(style);
        return {
            version: 8,
            glyphs,
            sprite: sprite.replaceAll("{{STYLE}}", theme),
            sources: {
                protomaps: {
                    type: "vector",
                    url,
                    attribution,
                },
            },
            layers: layers("protomaps", theme),
        };
    };
    init({ styleFunction, options });
}

setOptions();
