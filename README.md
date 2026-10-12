My name is IGIRANEZA Alain Providence.

- **Registration number:** 25/28075
- **App name:** AlainPortfolio
- **Verification code:** MOB-A2-8075
- **Android package:** rw.ac.ines.ug2528075.alainportfolio

## Purpose
A small offline Android portfolio app that lets a recruiter understand my profile in two minutes.

## Features
Home introduction, skills and education, two projects with a detail screen, profile editor with validation,
camera/gallery profile photo (preview, replace, remove), local persistence with AsyncStorage, and an About screen.

## Setup and run (PowerShell)
```powershell
npm install
npx expo install --fix
npx expo start -c
```
Use Expo Go only for quick development checks. The submitted build is a standalone APK.

## Build the APK (EAS)
```powershell
npm install -g eas-cli
eas login
eas build -p android --profile preview
```
Download the APK from the link EAS prints and rename it `MOB_A2_2528075.apk`.

## Release details (fill in before submitting)
- Tested device: ______
- Android version: ______
- Final commit hash: ______
- Release link: ______
- APK link: ______

## Known limitations
- Android only; no online features.
- Profile photo is stored inside AsyncStorage as a compressed image (low-risk class data only).
