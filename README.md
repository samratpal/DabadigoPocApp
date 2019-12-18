# DabadigoPocApp
A Cordova Ionic Project targeting Android Platform

ionic start DabadigoPocApp sidemenu --type=angular --cordova --package-id=com.dabadigopoc.app
cd DabadigoPocApp 
ionic cordova platform add android@8.1.0

--------------------------------------------
•	Test Merchant ID xxxxxxxxxx
•	Test Merchant Key xxxxxxx
•	Website WEBSTAGING
•	Industry Type Retail
•	Channel ID (For Website) WEB
•	Channel ID (For Mobile Apps) WAP
--------------------------------------------

/*----------Cordova Paytm Plugin documentation for Ionic Projects says value of WEBSITE should be APPSTAGING-----------*/

ionic cordova plugin add cordova-plugin-paytm --variable MERCHANT_ID=xxxxxxxxxx --variable INDUSTRY_TYPE_ID=Retail --variable WEBSITE=APPSTAGING --save
