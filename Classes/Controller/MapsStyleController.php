<?php

declare(strict_types=1);

namespace Jonnitto\Maps\Controller;

use Neos\Flow\Annotations as Flow;
use Neos\Flow\Log\Utility\LogEnvironment;
use Neos\Cache\Frontend\StringFrontend;
use Neos\Flow\Mvc\Controller\ActionController;
use Psr\Log\LoggerInterface;
use Neos\Flow\ResourceManagement\EelHelper\StaticResourceHelper;

/**
 * @Flow\Scope("singleton")
 */
class MapsStyleController extends ActionController
{
    /**
     * @var StringFrontend
     * @Flow\Inject
     */
    protected $cache;

    /**
     * @var string
     *  @Flow\InjectConfiguration()
     */
    protected $settings;

    /**
     * @Flow\Inject
     * @var LoggerInterface
     */
    protected $logger;

    /**
     * @Flow\Inject
     * @var StaticResourceHelper
     */
    protected $staticResource;

    /**
     * @var array
     */
    protected $supportedMediaTypes = ["text/html", "application/json"];

    public function settingsAction(): string
    {
        $mapLibrary = $this->settings["mapLibrary"];
        $mapService = $this->settings["mapService"];
        $cacheIdentifier = implode("_", [
            "Maps",
            "Settings",
            $mapLibrary,
            $mapService,
        ]);

        $this->setHeader();
        $cachedOutput = $this->getCache($cacheIdentifier);
        if ($cachedOutput) {
            return $cachedOutput;
        }

        $serviceOptions = $this->settings[$mapService] ?? null;
        if (
            isset($serviceOptions["url"]) &&
            !is_string($serviceOptions["url"])
        ) {
            $serviceOptions["url"] = $serviceOptions["url"][$mapLibrary];
        }

        if (
            isset($serviceOptions["styleTemplate"]) &&
            !is_string($serviceOptions["styleTemplate"])
        ) {
            $serviceOptions["styleTemplate"] =
                $serviceOptions["styleTemplate"][$mapLibrary];
        }

        $output = [
            "effect" => $this->settings["effect"] ?? null,
            "service" => [
                "name" => $mapService,
                "options" => $serviceOptions,
            ],
        ];
        if ($mapService != "GoogleMaps") {
            $output["library"] = [
                "name" => $mapLibrary,
                "options" => $this->settings[$mapLibrary] ?? null,
            ];
        }
        $output = json_encode($output);
        $this->saveCache($cacheIdentifier, $output);
        return $output;
    }

    private function getCache($cacheIdentifier): ?string
    {
        if ($this->cache->has($cacheIdentifier)) {
            $output = $this->cache->get($cacheIdentifier);
            if (isset($output)) {
                $this->logger->debug(
                    sprintf('Use cache "%s"', $cacheIdentifier),
                    LogEnvironment::fromMethodName(__METHOD__)
                );
                return $output;
            }
            $this->logger->warning(
                sprintf(
                    'Cache identifier "%s" has no output',
                    $cacheIdentifier
                ),
                LogEnvironment::fromMethodName(__METHOD__)
            );
        }
        return null;
    }

    private function saveCache(string $cacheIdentifier, string $output): void
    {
        $this->cache->set(
            $cacheIdentifier,
            $output,
            ["Neos_Fusion_Content"],
            31536000
        );
        $this->logger->debug(
            sprintf('Cached "%s"', $cacheIdentifier),
            LogEnvironment::fromMethodName(__METHOD__)
        );
    }

    private function setHeader(): void
    {
        $this->response->setStatusCode(200);
        $this->response->setContentType("application/json");
        $this->response->addHttpHeader("Access-Control-Allow-Credentials", "*");
        $this->response->addHttpHeader("Access-Control-Allow-Headers", "*");
        $this->response->addHttpHeader("Access-Control-Allow-Methods", "*");
        $this->response->addHttpHeader("Access-Control-Allow-Origin", "*");
        $this->response->addHttpHeader(
            "Cache-Control",
            "public, max-age=31536000"
        );
    }
}
