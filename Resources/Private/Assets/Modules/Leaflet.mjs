import {
    inBackend,
    getAddresses,
    getMapCanvas,
    initFrontend,
    getStyleUrl,
    listenToDarkModeChange,
    checkIfBasedOnClass,
    checkIfDarkAndLight,
    darkLightModeEffect,
    getStyleType,
    createIcon,
    getOptions,
    filterObject,
    runCallbackAndRegisterTurbo,
} from "./Global.mjs";
import L from "leaflet";

// Global store for maps, tile layers
const maps = [];
const tileLayers = [];

function initMap({ element, service, library, layer, styleURL }) {
    const canvas = getMapCanvas(element);
    const markerCollection = [];
    const addresses = getAddresses(element);
    const numberOfAddresses = addresses.length;
    const center = JSON.parse(element.dataset?.center || null);

    const serviceSettings = service?.options || {};
    const mapOptions = filterObject(library.options?.mapOptions || {});
    const zoom = parseInt(element.dataset?.zoom) || mapOptions.zoom || 14;
    mapOptions.center = center ? [center.lat, center.lng] : [0, 0];
    mapOptions.zoom = zoom;

    const map = L.map(canvas, mapOptions);
    L.control
        .scale({
            imperial: false,
        })
        .addTo(map);

    if (layer) {
        layer.addTo(map);
    } else {
        const options = {
            detectRetina: true,
            maxZoom: serviceSettings?.maxZoom || 20,
        };
        if (serviceSettings?.attribution) {
            options.attribution = serviceSettings.attribution;
        }
        if (serviceSettings?.subdomains) {
            options.subdomains = serviceSettings.subdomains;
        }
        tileLayers.push(L.tileLayer(styleURL, options).addTo(map));
    }

    addresses.forEach((address) => {
        const icon = L.divIcon({ ...createIcon(address.pinColor), className: "leaflet-data-marker" });
        const marker = L.marker([address.lat, address.lng], { icon }).addTo(map);
        markerCollection.push(marker);
        if (address.html) {
            const popup = marker.bindPopup(address.html, {
                maxWidth: 500,
            });
        }
        if (inBackend) {
            // this select the node in the backend
            marker.addEventListener("click", () => {
                ["mousedown", "mouseup"].forEach((event) =>
                    address.element.dispatchEvent(new Event(event, { bubbles: true })),
                );
            });
        }
    });

    if (numberOfAddresses > 1) {
        map.fitBounds(new L.featureGroup(markerCollection).getBounds());

        setTimeout(() => {
            if (map.getZoom() > zoom) {
                map.setZoom(zoom);
            }
        }, 200);
    }

    document.dispatchEvent(
        new CustomEvent("initializedJonnittoMaps", {
            detail: {
                element,
                service,
                library,
                layer,
                map,
                markers: markerCollection,
            },
        }),
    );

    maps.push(map);
}

async function init({ layerFunction = null, layerOptions = null, options = null, setLayerStyle = null } = {}) {
    const { service, library, effect } = options ?? (await getOptions());
    const { style, styleTemplate } = service.options;
    const hasDarkAndLightStyle = checkIfDarkAndLight(style);
    const styleBasedOnClass = hasDarkAndLightStyle ? checkIfBasedOnClass(style) : false;

    const styleURL = styleTemplate ? getStyleUrl(styleTemplate, style) : style;

    runCallbackAndRegisterTurbo(() => {
        darkLightModeEffect(effect);

        let layer = null;
        if (layerFunction) {
            layer = layerFunction(layerOptions);
            if (setLayerStyle) {
                setLayerStyle(layer, getStyleType(style));
                listenToDarkModeChange(
                    () => {
                        setLayerStyle(layer, getStyleType(style));
                    },
                    styleBasedOnClass,
                    hasDarkAndLightStyle,
                );
            }
        } else {
            listenToDarkModeChange(
                () => {
                    const newUrl = getStyleUrl(styleTemplate, style);
                    tileLayers.forEach((layer) => layer.setUrl(newUrl));
                },
                styleBasedOnClass,
                hasDarkAndLightStyle,
            );
        }

        initFrontend(service.name, (element) => {
            initMap({ element, service, library, layer, styleURL });
        });
    });
}

export default init;
export { init, getOptions };
