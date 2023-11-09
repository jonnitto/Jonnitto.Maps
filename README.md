[![Latest stable version]][packagist] [![Total downloads]][packagist] [![License]][packagist] [![GitHub forks]][fork] [![GitHub stars]][stargazers] [![GitHub watchers]][subscription]

# Integration of Protomaps, Stadiamaps, OpenstreetMaps anf GoogleMaps into Neos

One package to rule them all. With this plugin you integrate one of these services into you Neos installation. This
package relies primarily on the settings in [`Settings.yaml`]. Because of this, only one type of card can be used per
installation. Every map can hold multiple marker, with configurable popup.

## Installation

You will have to make adjustments to this package in your own Settings.yaml.
Because of that, it is important to add the corresponding package to the composer from your theme package.

```bash
composer require jonnitto/maps --no-update
```

The --no-update command prevent the automatic update of the dependencies. After the package was added to your theme composer.json, go back to the root of the Neos installation and run composer update. Et voilà! Your desired package is now installed correctly.

## What can be configured on the map

On a map element you could change the aspect ratio with `aspectRatio`.
[Please use the official CSS syntax for that](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio)

If you want to make it configurable, you can add your own property and let the user decide.

## What can be altered on the address element

Beside the given properties in the inspector, you can also alter `enableRouteLink`. This enables a link to google maps
for routing. With `renderContentAfterAddress` (default `true`) you can choose if the text is shown before or after the
address.

## The main configuration

If you read the [`Settings.yaml`] carefully, you should understand how to configure the plugin.

```yaml
Jonnitto:
  Maps:
    # Import the Javascript with type="module" or not
    # Modules are only supported by modern browsers
    useJavaScriptModules: true

    # Can be MapLibre or Leaflet. No effect for GoogleMaps
    mapLibrary: 'Leaflet'

    # Can be Stadiamaps, GoogleMaps, OpenStreetMap or Protomaps
    mapService: 'OpenStreetMap'

    aspectRatio: '16 / 9' # Please use the official CSS syntax: https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio

    pinColor: '#009fe3'

    # Enable a link to Google Maps for Routes
    enableRouteLink: false

    # Can be default/null (no effect), grayscale, dark, black or invert
    effect: null
    # If you want enable dynamic dark/light mode based on the media or class
    # You have to set effect to an object
    # effect:
    #   light: default
    #   dark: dark
    #   # media or class (class uses the CSS class 'dark' on the HTML element)
    #   basedOn: media

    GoogleMaps:
      # If you want to use Google Maps, you have to set the api key
      apiKey: null
      # If the user point between marker, the route gets shown
      enableDirections: false
      mapOptions:
        # zoomControl: true
        # mapTypeControl: true
        # scaleControl: true
        # streetViewControl: true
        # rotateControl: true
        # fullscreenControl: true
        zoom: 14
        # https://developers.google.com/maps/documentation/get-map-id
        mapId: null
        # https://developers.google.com/maps/documentation/javascript/maptypes
        mapTypeId: null

    MapLibre:
      setRTLTextPlugin: false
      mapOptions:
        scrollZoom: false
        zoom: 14

    Leaflet:
      mapOptions:
        scrollWheelZoom: false
        zoom: 14

    Protomaps:
      # To enable Protomaps, you have to set the url
      url:
        Leaflet: null # example: 'https://api.protomaps.com/tiles/v3/{z}/{x}/{y}.mvt?key=YOUR_API_KEY'
        MapLibre: null # example 'https://api.protomaps.com/tiles/v3.json?key=YOUR_API_KEY'
      glyphs: 'https://protomaps.github.io/basemaps-assets/fonts/{fontstack}/{range}.pbf'
      attribution: '<a href="https://github.com/protomaps/basemaps" target="_blank" rel="noopener noreferrer nofollow">Protomaps</a> © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer nofollow">OpenStreetMap</a>'

      # Can be light, dark, grayscale, white or black
      style: 'light'

      # If you want enable dynamic dark/light mode based on the media or class
      # You have to set style to an object
      # style:
      #   light: light
      #   dark: dark
      #   # media or class (class uses the CSS class 'dark' on the HTML element)
      #   basedOn: media

    # If you want a dark mode for openstreetmap, you can use the effect setting
    OpenStreetMap:
      maxZoom: 20
      attribution: '© <a href="https://openmaptiles.org/" target="_blank" rel="noopener noreferrer nofollow">OpenMapTiles</a> © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer nofollow">OpenStreetMap</a>'
      style: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'

    Stadiamaps:
      attribution: '© <a href="https://stadiamaps.com/" target="_blank" rel="noopener noreferrer nofollow">Stadia Maps</a> © <a href="https://openmaptiles.org/" target="_blank" rel="noopener noreferrer nofollow">OpenMapTiles</a> © <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer nofollow">OpenStreetMap</a>'
      maxZoom: 20
      styleTemplate:
        # {{STYLE}} get replaced with the style setting
        Leaflet: 'https://tiles.stadiamaps.com/tiles/{{STYLE}}/{z}/{x}/{y}{r}.png'
        MapLibre: 'https://tiles.stadiamaps.com/styles/{{STYLE}}.json'

      # Can be alidade_smooth, alidade_smooth_dark, osm_bright or outdoors
      style: 'osm_bright'
      # If you want enable dynamic dark/light mode based on the media or class
      # You have to set style to an object
      # style:
      #   light: alidade_smooth
      #   dark: alidade_smooth_dark
      #   # media or class (class uses the CSS class 'dark' on the HTML element)
      #   basedOn: media
```

[packagist]: https://packagist.org/packages/jonnitto/maps
[latest stable version]: https://poser.pugx.org/jonnitto/maps/v/stable
[total downloads]: https://poser.pugx.org/jonnitto/maps/downloads
[license]: https://poser.pugx.org/jonnitto/maps/license
[github forks]: https://img.shields.io/github/forks/Jonnitto/Jonnitto.Maps.svg?style=social&label=Fork
[github stars]: https://img.shields.io/github/stars/Jonnitto/Jonnitto.Maps.svg?style=social&label=Stars
[github watchers]: https://img.shields.io/github/watchers/Jonnitto/Jonnitto.Maps.svg?style=social&label=Watch
[fork]: https://github.com/Jonnitto/Jonnitto.Maps/fork
[stargazers]: https://github.com/Jonnitto/Jonnitto.Maps/stargazers
[subscription]: https://github.com/Jonnitto/Jonnitto.Maps/subscription
[`Settings.yaml`]: Configuration/Settings.yaml
