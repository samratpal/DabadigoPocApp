
This is a Cordova Ionic Project targeting Android Platform to work on the Proof of Concept on Various Functionality.

Steps to configure:

Clone the repo: git clone https://github.com/samratpal/Ionic4PocApp.git

cd to Ionic4PocApp

run command: npm install

// run 'ionic serve' to launch the project on browser
// add cordova android platform
run command: ionic cordova platform add android@8.1.0

//build and deploy the app in a USB connected Android device. Accept the installation popup on the device
run command: ionic cordova run android

// Add cordova paytm plugin
// Cordova Paytm Plugin documentation for Ionic Projects says value of WEBSITE should be APPSTAGING

ionic cordova plugin add cordova-plugin-paytm --variable MERCHANT_ID=xxxxxxxxxx --variable INDUSTRY_TYPE_ID=Retail --variable WEBSITE=APPSTAGING --save

