import {
    inBackend,
    getAddresses,
    getMapCanvas,
    initFrontend,
    darkLightModeEffect,
    getOptions,
    filterObject,
    runCallbackAndRegisterEventListener,
} from "./Global.mjs";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { nanoid } from "nanoid";

// Global store for maps
const maps = [];

// Global store for maps object
let googleMaps = null;

function initMap({ element, service }) {
    if (!googleMaps) {
        googleMaps = window.google.maps;
    }
    const canvas = getMapCanvas(element);
    const markerCollection = [];
    const addresses = getAddresses(element);
    const numberOfAddresses = addresses.length;
    const center = JSON.parse(element.dataset?.center || null);

    const enableDirections = service.options?.enableDirections || false;
    const mapOptions = filterObject(service.options?.mapOptions || {});
    const zoom = parseInt(element.dataset?.zoom) || mapOptions.zoom || 14;
    mapOptions.center = center ?? { lat: 0, lng: 0 };
    mapOptions.zoom = zoom;
    mapOptions.mapId = mapOptions.mapId || `map-${nanoid(10)}`;

    const map = new googleMaps.Map(canvas, mapOptions);
    const infowindow = new googleMaps.InfoWindow({ maxWidth: 500 });
    const directionsService = enableDirections ? new googleMaps.DirectionsService() : null;
    const directionsDisplay = enableDirections
        ? new googleMaps.DirectionsRenderer({ map, suppressMarkers: true })
        : null;
    let route = 0;
    let posSource = 0;
    let posDestination = 0;

    if (directionsDisplay) {
        directionsDisplay.setMap(map);
    }

    addresses.forEach((address) => {
        const pin = new googleMaps.marker.PinElement({
            background: address.pinColor,
            glyphColor: "#fff",
            borderColor: "rgb(0 0 0 / 50%)",
        });

        const marker = new googleMaps.marker.AdvancedMarkerElement({
            position: { lat: address.lat, lng: address.lng },
            map,
            draggable: false,
            content: pin.element,
            zIndex: -20,
        });

        if (directionsDisplay && !inBackend) {
            marker.addListener("click", () => {
                route++;
                if (route == 1) {
                    posSource = marker.position;
                    return;
                }
                if (route == 3) {
                    directionsDisplay.set("directions", null);
                    posSource = posDestination;
                    route = 2;
                }

                posDestination = marker.position;

                calculateAndDisplayRoute(directionsService, directionsDisplay, posSource, posDestination);
            });
        }

        if (address.html) {
            marker.addListener("click", () => {
                infowindow.setContent(address.html);
                infowindow.open({
                    anchor: marker,
                    map,
                });
            });
        }
        if (inBackend) {
            // this select the node in the backend
            marker.addListener("click", () => {
                window.addressElement = address.element;
                ["mousedown", "mouseup"].forEach((event) =>
                    address.element.dispatchEvent(new Event(event, { bubbles: true })),
                );
            });
        }
        markerCollection.push(marker);
    });

    if (numberOfAddresses > 1) {
        const bounds = new googleMaps.LatLngBounds();
        markerCollection.forEach((marker) => {
            bounds.extend(marker.getPosition());
        });
        map.fitBounds(bounds);

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
                map,
                markers: markerCollection,
            },
        }),
    );

    maps.push(map);
}

async function init() {
    const { service, effect } = await getOptions();
    const key = service.options.apiKey;
    if (!key) {
        console.error("No API key found");
        return;
    }

    const libraries = ["maps", "marker"];
    if (service?.options?.enableDirections) {
        libraries.push("places");
    }

    setOptions({
        key,
        v: "weekly",
        libraries,
    });

    // load all required libraries in parallel
    const librariesPromise = Promise.all(libraries.map((library) => importLibrary(library)));

    await librariesPromise;

    runCallbackAndRegisterEventListener(() => {
        darkLightModeEffect(effect);
        initFrontend(service.name, (element) => {
            initMap({ element, service });
        });
    });
}

export default init;

function calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB) {
    directionsService.route(
        {
            origin: pointA,
            destination: pointB,
            travelMode: googleMaps.TravelMode.DRIVING,
        },
        function (response, status) {
            if (status == googleMaps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        },
    );
}
