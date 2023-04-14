# mobile-auth-cognito

Project for quick start React Native mobile authentication using AWS Cognito and Amplify with Social Sign-in and Login with e-mail options

## Table of contents

- [General info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)
- [Getting started](#getting-started)

## General info

This project is a quick start for React Native mobile authentication using AWS Cognito and Amplify with Social Sign-in and Login with e-mail options. It uses AWS Amplify to create a user pool, identity pool, and user pool client. *Required AWS account*.

## Technologies

Project is created with:

- React Native
- Expo CLI
- Expo
- AWS Amplify

## Prerequisites

- Node.js v14.x or later
- npm v6.14.4 or later
- git v2.14.1 or later

## Setup

Follow the [AWS Guide](https://docs.amplify.aws/lib/project-setup/prereq/q/platform/react-native/) for the project setup until the end.

Once you have finished, it's time to create your backend resources using Amplify CLI.

```
$ npm install
$ amplify init
```

When you initialize Amplify you'll be prompted for some information about the app, follow the guided options completing with these values:

Project information
- Name:  mobile-auth-cognito
- Environment: dev
- Default editor: "Replace with your Code Editor"
- App type: javascript
- Javascript framework: react-native
- Source Directory Path: /
- Distribution Directory Path: /
- Build Command: npm run-script build
- Start Command: npm run-script start

Now, you should create authentication backend resource:

// TODO: Guide with images

For last, install the Expo CLI command line utility:

```
$ npm install -g expo-cli
```

## Getting started

To run this project, install it locally using npm:

```
$ npx expo start --clear
```

*Hint: use Expo Go to run in your Android or iOS device*
