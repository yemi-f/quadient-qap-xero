<?php
ini_set('display_errors', 'On');
require __DIR__ . '/vendor/autoload.php';
require_once('Storage.php');
require_once('XeroAPIClient.php');

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Instantiate storage class
$storage = new StorageClass();

// Instantiate the Xero API client
$xeroClient = new XeroAPI\XeroAPIClient($storage);

// Fetch accounts data
$accountsData = $xeroClient->fetchData('Accounts');

// Fetch vendors data (assuming vendors are stored in 'Contacts')
$vendorsData = $xeroClient->fetchData('Invoices', ['where' => 'Type="ACCPAY"']);

// Save accounts data to file if available
if ($accountsData !== null) {
    $accountsFile = "../frontend/public/data/accounts.json";
    $xeroClient->saveDataToFile($accountsData, $accountsFile);
}

// Save vendors data to file if available
if ($vendorsData !== null) {
    $vendorsFile = "../frontend/public/data/vendors.json";
    $xeroClient->saveDataToFile($vendorsData, $vendorsFile);
}
