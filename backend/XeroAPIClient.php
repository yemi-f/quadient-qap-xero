<?php

namespace XeroAPI;

use GuzzleHttp\Client;
use GuzzleHttp\Exception\RequestException;
use League\OAuth2\Client\Provider\GenericProvider;

class XeroAPIClient
{
    private $client;
    private $provider;
    private $storage;
    private $baseUrl = 'https://api.xero.com/api.xro/2.0/';

    public function __construct($storage)
    {
        $this->client = new Client();
        $this->storage = $storage;
        $this->provider = new GenericProvider([
            'clientId'                => $_ENV['CLIENT_ID'],
            'clientSecret'            => $_ENV['CLIENT_SECRET'],
            'redirectUri'             => $_ENV['REDIRECT_URI'],
            'urlAuthorize'            => 'https://login.xero.com/identity/connect/authorize',
            'urlAccessToken'          => 'https://identity.xero.com/connect/token',
            'urlResourceOwnerDetails' => 'https://api.xero.com/api.xro/2.0/Organisation'
        ]);

        if ($this->storage->getHasExpired()) {
            $this->refreshAccessToken();
        }
    }

    private function refreshAccessToken()
    {
        $newAccessToken = $this->provider->getAccessToken('refresh_token', [
            'refresh_token' => $this->storage->getRefreshToken()
        ]);

        $this->storage->setToken(
            $newAccessToken->getToken(),
            $this->storage->getXeroTenantId(),
            $newAccessToken->getRefreshToken(),
            $newAccessToken->getValues()["id_token"],
            $newAccessToken->getExpires()
        );
    }
    public function fetchData($endpoint, $params = [])
    {
        // If the token is expired, refresh it
        if ($this->storage->getHasExpired()) {
            $this->refreshAccessToken();
        }

        // Set the base URL and client headers
        $client = $this->client;
        $url = $this->baseUrl . "/$endpoint";
        $headers = [
            'Authorization' => 'Bearer ' . $this->storage->getAccessToken(),
            'Accept'        => 'application/json',
            'Xero-Tenant-Id' => $this->storage->getXeroTenantId()
        ];

        try {
            // Merge the query parameters if provided (e.g., for filtering invoices)
            $options = ['headers' => $headers];
            if (!empty($params)) {
                $options['query'] = $params;
            }

            // Make the GET request to the API
            $response = $client->request('GET', $url, $options);

            // Check if the response is successful
            if ($response->getStatusCode() == 200) {
                // Return the response body as an array
                return json_decode($response->getBody(), true);
            } else {
                echo "Request failed with status code: " . $response->getStatusCode();
                return null;
            }
        } catch (RequestException $e) {
            // Handle request exceptions (errors from API or network issues)
            if ($e->hasResponse()) {
                $response = $e->getResponse();
                echo "Error: " . $response->getStatusCode() . " - " . $response->getBody();
            } else {
                echo "Network error or timeout: " . $e->getMessage();
            }
            return null;
        }
    }

    public function saveDataToFile($data, $filename)
    {
        if (file_put_contents($filename, json_encode($data, JSON_PRETTY_PRINT))) {
            echo "Data saved to $filename <br>";
        } else {
            echo "Failed to save data to $filename <br>";
        }
    }
}
