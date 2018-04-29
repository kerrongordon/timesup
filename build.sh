 #!/bin/bash

rm -v -r -f platforms/android/app/build/outputs/apk/*
rm -v -r -f apk

ionic cordova build android --prod --release --aot

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore timesup.keystore platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk alias_name

zipalign -v 4 platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk platforms/android/app/build/outputs/apk/release/timesup.apk

apksigner verify platforms/android/app/build/outputs/apk/release/timesup.apk

mkdir apk

mv -v platforms/android/app/build/outputs/apk/release/timesup.apk apk/timesup.apk
