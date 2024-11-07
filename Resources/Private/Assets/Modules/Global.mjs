const inBackend = window.name == "neos-content-main";
const DOCUMENT = document;
const HTML = DOCUMENT.documentElement;
const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)");

function getAddresses(element) {
    return [...element.querySelectorAll(".carbon-geomap-coordinate")]
        .map((element) => {
            const dataset = element.dataset;
            const coordinate = JSON.parse(dataset?.coordinate || null);
            if (!coordinate) {
                return null;
            }
            return {
                element,
                html: element.outerHTML,
                popup: !!element.innerHTML,
                lat: coordinate.lat,
                lng: coordinate.lng,
                pinColor: dataset?.pinColor || "red",
            };
        })
        .filter((element) => element !== null);
}

function createIcon(color) {
    return {
        html: `<svg version="1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 149 178"><path fill="${color}" stroke="#FFF" stroke-width="6" stroke-miterlimit="10" d="M126 23l-6-6A69 69 0 0 0 74 1a69 69 0 0 0-51 22A70 70 0 0 0 1 74c0 21 7 38 22 52l43 47c6 6 11 6 16 0l48-51c12-13 18-29 18-48 0-20-8-37-22-51z"/><circle fill="${color}" cx="74" cy="75" r="61"/><circle fill="#FFF" cx="74" cy="75" r="30"/></svg>`,
        iconAnchor: [12, 32],
        iconSize: [25, 30],
        popupAnchor: [0, -28],
    };
}

function getMapCanvas(element) {
    return element.querySelector(".carbon-geomap__canvas");
}

function initFrontend(name, callback) {
    [...DOCUMENT.querySelectorAll(`.carbon-geomap.jonnitto-maps--${name.toLowerCase()}`)].forEach((element) => {
        element.querySelector(".carbon-geomap__reload-button")?.remove();
        if (element.classList.contains("jonnitto-maps--done")) {
            return;
        }
        element.classList.add("jonnitto-maps--done");
        callback(element);
    });
}

function getStyleType(style) {
    if (typeof style === "string") {
        return style;
    }
    if (!checkIfDarkAndLight(style)) {
        return style?.light || style?.dark;
    }
    const basedOnClass = checkIfBasedOnClass(style);
    return checkIfDark(basedOnClass) ? style.dark : style.light;
}

function getStyleUrl(styleTemplate, style) {
    if (styleTemplate) {
        return styleTemplate.replaceAll("{{STYLE}}", getStyleType(style));
    }
    return getStyleType(style);
}

function listenToDarkModeChange(callback, basedOnClass, check = true) {
    if (!check || typeof callback !== "function") {
        return;
    }

    if (basedOnClass) {
        const observer = new MutationObserver((mutationList) => {
            mutationList.forEach(function (mutation) {
                if (mutation.type === "attributes" && mutation.attributeName === "class") {
                    callback();
                }
            });
        });

        observer.observe(HTML, {
            attributes: true,
        });
        return;
    }

    darkModePreference.addEventListener("change", callback);
}

function checkIfDark(basedOnClass) {
    return !!((!basedOnClass && darkModePreference.matches) || (basedOnClass && HTML.classList.contains("dark")));
}

function checkIfBasedOnClass(object) {
    return object?.basedOn === "class";
}
function checkIfDarkAndLight(object) {
    return !!(typeof object === "object" && object?.light && object?.dark);
}

function darkLightModeEffect(effect) {
    if (!checkIfDarkAndLight(effect)) {
        return;
    }

    const activateEffect = () => {
        const style = checkIfDark(basedOnClass) ? effect.dark : effect.light;
        [...document.querySelectorAll(".jonnitto-maps .carbon-geomap__canvas")].forEach((element) => {
            element.dataset.effect = style;
        });
    };
    // Change the effect on dark / light mode
    const basedOnClass = checkIfBasedOnClass(effect);
    listenToDarkModeChange(activateEffect, basedOnClass);
    activateEffect();
}

async function getOptions() {
    return await fetch("/maps-settings.json").then((response) => response.json());
}

function filterObject(object) {
    return Object.fromEntries(Object.entries(object).filter(([_, value]) => value != null));
}

function runCallbackAndRegisterEventListener(callback) {
    callback();

    window.addEventListener("jonnitto-maps:init", callback, true);
}

export {
    inBackend,
    getAddresses,
    createIcon,
    getMapCanvas,
    initFrontend,
    getStyleUrl,
    listenToDarkModeChange,
    checkIfDark,
    checkIfBasedOnClass,
    checkIfDarkAndLight,
    darkLightModeEffect,
    getStyleType,
    getOptions,
    filterObject,
    runCallbackAndRegisterEventListener,
};
