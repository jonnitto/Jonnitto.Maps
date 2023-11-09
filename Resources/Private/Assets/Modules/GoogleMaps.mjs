import {
    inBackend,
    getAddresses,
    createIcon,
    getMapCanvas,
    initFrontend,
    darkLightModeEffect,
    getOptions,
    filterObject,
} from "./Global.mjs";
import { Loader } from "@googlemaps/js-api-loader";

// Global store for maps
const maps = [];

function initMap({ element, service }) {
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

    const map = new google.maps.Map(canvas, mapOptions);
    const infowindow = new google.maps.InfoWindow({ maxWidth: 500 });
    const directionsService = enableDirections ? new google.maps.DirectionsService() : null;
    const directionsDisplay = enableDirections
        ? new google.maps.DirectionsRenderer({ map, suppressMarkers: true })
        : null;
    let route = 0;
    let posSource = 0;
    let posDestination = 0;

    if (directionsDisplay) {
        directionsDisplay.setMap(map);
    }

    addresses.forEach((address) => {
        const iconSettings = createIcon(address.pinColor);
        const icon = {
            url: `data:image/svg+xml;charset=UTF-8;base64,${btoa(iconSettings.html)}`,
            anchor: new google.maps.Point(iconSettings.iconAnchor[0], iconSettings.iconAnchor[1]),
            scaledSize: new google.maps.Size(iconSettings.iconSize[0], iconSettings.iconSize[1]),
        };

        const marker = new google.maps.Marker({
            position: { lat: address.lat, lng: address.lng },
            map,
            draggable: false,
            icon,
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
        const bounds = new google.maps.LatLngBounds();
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
    const apiKey = service.options.apiKey;
    if (!apiKey) {
        console.error("No API key found");
        return;
    }

    darkLightModeEffect(effect);

    const libraries = [];
    if (service?.options?.enableDirections) {
        libraries.push("places");
    }

    const loader = new Loader({ apiKey, libraries });
    await loader.load();

    initFrontend(service.name, (element) => {
        initMap({ element, service });
    });
}

export default init;

function calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB) {
    directionsService.route(
        {
            origin: pointA,
            destination: pointB,
            travelMode: google.maps.TravelMode.DRIVING,
        },
        function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        },
    );
}
