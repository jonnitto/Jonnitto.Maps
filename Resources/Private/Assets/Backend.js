const elementClassName = "jonnitto-maps";
const nodes = [...document.querySelectorAll(".neos-contentcollection")];
const config = { childList: true };

const callback = (mutationList) => {
    let fireEvent = false;
    for (const mutation of mutationList) {
        const { type, addedNodes } = mutation;
        if (type !== "childList") {
            continue;
        }
        [...addedNodes].forEach((node) => {
            const isElement = node.classList.contains(elementClassName);
            const element = isElement ? node : node.querySelector(`.${elementClassName}`);
            if (element || !element.classList.contains(`${elementClassName}--done`)) {
                fireEvent = true;
            }
        });
    }
    if (fireEvent) {
        window.dispatchEvent(new Event("jonnitto-maps:init"));
    }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
nodes.forEach((node) => observer.observe(node, config));
