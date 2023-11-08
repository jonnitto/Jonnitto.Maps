import { init, getOptions } from "./MapLibreGL";

async function setOptions() {
    const options = await getOptions();

    const serviceOptions = options.service.options;
    const styleFunction = () => {
        return {
            version: 8,
            sources: {
                osm: {
                    type: "raster",
                    tiles: [serviceOptions.style],
                    tileSize: 256,
                    attribution: serviceOptions.attribution,
                    maxzoom: serviceOptions.maxZoom,
                },
            },
            layers: [
                {
                    id: "osm",
                    type: "raster",
                    source: "osm", // This must match the source key above
                },
            ],
        };
    };

    const style = {
        version: 8,
        sources: {
            osm: {
                type: "raster",
                tiles: [serviceOptions.style],
                tileSize: 256,
                attribution: serviceOptions.attribution,
                maxzoom: serviceOptions.maxZoom,
            },
        },
        layers: [
            {
                id: "osm",
                type: "raster",
                source: "osm", // This must match the source key above
            },
        ],
    };

    init({ styleFunction, options });
}

setOptions();
