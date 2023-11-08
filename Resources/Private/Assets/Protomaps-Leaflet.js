import { init, getOptions } from "./Leaflet";
import { leafletLayer } from "protomaps-leaflet";

function setLayerStyle(layer, style) {
    switch (style) {
        case "dark":
            layer.setDefaultStyle(true);
            break;
        case "grayscale":
        case "white":
            layer.setDefaultStyle(false, "white");
            break;
        case "black":
            layer.setDefaultStyle(true, "black");
            break;
        default:
            layer.setDefaultStyle();
            break;
    }
    layer.clearLayout();
    layer.rerenderTiles();
}

async function setOptions() {
    const options = await getOptions();
    const layerOptions = {
        url: options.service.options.url,
        attribution: options.service.options.attribution,
        //dark,
    };
    init({ layerFunction: leafletLayer, layerOptions, options, setLayerStyle });
}

setOptions();
