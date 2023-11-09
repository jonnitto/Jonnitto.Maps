import layers from "protomaps-themes-base";
import { init, getOptions, getStyleType } from "./Modules/MapLibre.mjs";

async function setOptions() {
    const options = await getOptions();
    const { glyphs, url, attribution, style } = options.service.options;

    const styleFunction = () => {
        return {
            version: 8,
            glyphs,
            sources: {
                protomaps: {
                    type: "vector",
                    url,
                    attribution,
                },
            },
            layers: layers("protomaps", getStyleType(style)),
        };
    };
    init({ styleFunction, options });
}

setOptions();
