import { init, getOptions } from "./Modules/Leaflet.mjs";
import { leafletLayer } from "../../../node_modules/protomaps-leaflet/src/frontends/leaflet";
import { paintRules, labelRules } from "../../../node_modules/protomaps-leaflet/src/default_style/style";
import { themes } from "../../../node_modules/protomaps-leaflet/src/default_style/themes";

function setLayerStyle(layer, style) {
    const theme = themes[style];
    if (!theme) {
        return;
    }
    layer.options.theme = style;
    layer.paintRules = paintRules(theme);
    layer.labelRules = labelRules(theme);
    layer.backgroundColor = theme.background;
    layer.clearLayout();
    layer.rerenderTiles();
}

async function setOptions() {
    const options = await getOptions();
    const layerOptions = {
        url: options.service.options.url,
        attribution: options.service.options.attribution,
    };
    init({ layerFunction: leafletLayer, layerOptions, options, setLayerStyle });
}

setOptions();
