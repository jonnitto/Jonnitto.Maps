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
    getOptions,
    filterObject,
    runCallbackAndRegisterTurbo,
} from "./Global.mjs";
import { Map, NavigationControl, Marker, Popup, LngLatBounds, setRTLTextPlugin } from "maplibre-gl";

// Global store for maps
const maps = [];

function initMap({ element, service, library, styleURL }) {
    const canvas = getMapCanvas(element);
    const markerCollection = [];
    const addresses = getAddresses(element);
    const numberOfAddresses = addresses.length;
    const center = JSON.parse(element.dataset?.center || null);

    const mapOptions = filterObject(library.options?.mapOptions || {});
    const zoom = parseInt(element.dataset?.zoom) || mapOptions.zoom || 14;

    if (library?.options?.setRTLTextPlugin) {
        setRTLTextPlugin(
            "https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js",
            null,
            true, // Lazy load the plugin
        );
    }

    mapOptions.center = center ? [center.lng, center.lat] : [0, 0];
    mapOptions.zoom = zoom;
    mapOptions.style = styleURL;
    mapOptions.container = canvas;
    mapOptions.maxZoom = service?.options?.maxZoom || 20;

    const map = new Map(mapOptions);
    map.addControl(new NavigationControl());

    addresses.forEach((address) => {
        // Construct a marker and set it's coordinates

        const marker = new Marker({ color: address.pinColor });
        marker.setLngLat([address.lng, address.lat]);

        if (address.popup) {
            const popup = new Popup({ closeButton: false, maxWidth: null });
            popup.setHTML(address.html);

            // Set the marker's popup.
            marker.setPopup(popup);
        }

        // Finally, we add the marker to the map.
        marker.addTo(map);

        markerCollection.push(marker);

        if (inBackend) {
            // this select the node in the backend
            marker.getElement().addEventListener("click", () => {
                ["mousedown", "mouseup"].forEach((event) =>
                    address.element.dispatchEvent(new Event(event, { bubbles: true })),
                );
            });
        }
    });

    if (numberOfAddresses > 1) {
        const coord = markerCollection.map((marker) => marker.getLngLat());
        const coordinates = coord;
        const bounds = coordinates.reduce(
            (bounds, coord) => bounds.extend(coord),
            new LngLatBounds(coordinates[0], coordinates[0]),
        );
        map.fitBounds(bounds, { padding: 80, linear: true, maxZoom: mapOptions.maxZoom });

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
                map,
                markers: markerCollection,
            },
        }),
    );

    maps.push(map);
}

async function init({ styleFunction = null, options = null } = {}) {
    const { service, library, effect } = options ?? (await getOptions());
    const { style, styleTemplate } = service.options;
    const hasDarkAndLightStyle = checkIfDarkAndLight(style);
    const styleBasedOnClass = hasDarkAndLightStyle ? checkIfBasedOnClass(style) : false;

    const getStyleFunction = styleFunction ?? getStyleUrl;
    const styleURL = getStyleFunction(styleTemplate, style);

    runCallbackAndRegisterTurbo(() => {
        darkLightModeEffect(effect);

        if (styleTemplate || styleFunction) {
            listenToDarkModeChange(
                () => {
                    const newStyle = getStyleFunction(styleTemplate, style);
                    maps.forEach((map) => {
                        if (!map || typeof map.setStyle != "function") {
                            return;
                        }
                        map.setStyle(newStyle);
                    });
                },
                styleBasedOnClass,
                hasDarkAndLightStyle,
            );
        }

        initFrontend(service.name, (element) => {
            initMap({ element, service, library, styleURL });
        });
    });
}

export default init;
export { init, getOptions, getStyleType };
