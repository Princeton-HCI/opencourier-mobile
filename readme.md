# Opendeli

# 1. Enviroment setup

Follow React Native enviroment setup:
https://reactnative.dev/docs/set-up-your-environment

# 2. Build packaging steps:

## ios building
make sure the branch is main (production branch)
run `yarn install` in the home directory (try `yarn install --frozen-lockfile` if you wanna keep the local development consistent) 
go to the ios directory `cd ios/` and run `pod install`  
run `yarn start` command   
or open the OpenDeli.xcworkspace file in the ios/ folder in xcode and click the run button on the left column.  

# 3. Licences

[https://github.com/Princeton-HCI/opendeli-courier-mobile/blob/main/licenses.json] Licences used by all dependencies



archive with xcode command line:

xcodebuild -workspace ios/OpenCourier.xcworkspace \
           -scheme OpenCourier \
           -configuration Release \
           -sdk iphoneos \
           -archivePath ios/build/OpenCourier.xcarchive \
           clean archive


create exportOptions.plist and generate .ipa file with the command:

xcodebuild -exportArchive \
           -archivePath ios/build/OpenCourier.xcarchive \
           -exportOptionsPlist ios/exportOptions.plist \
           -exportPath ios/build/OpenCourierExport \
           -allowProvisioningUpdates
