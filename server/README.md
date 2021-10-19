<p align="center">
        <img src="../src/assets/images/Logo.png" height="100">
</p>

## Table of contents

- [Introduction](#intro)
- [Technologies](#technologies)
- [Setup](#setup)
- [Features](#features)
- [Screenshots](#screenshots)
- [Contributors](#contributors)
- [Community](#Community)

## Introduction

Care4Animal is a unique crowd funding platform to help animals. You can start a campaign and raise a funds to support your campaign and help the animals.

-Live demo [_here_](https://upbeat-wilson-0d8b2a.netlify.app/).

Frontend and Backend are hosted on Netlify.

## Technologies used to build this project

![Node.js **v14.15.0**](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)\
![React JS](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)\
![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white)\
![Parse Platform and Cloud Functions](https://img.shields.io/badge/Parse--Platform--and--Cloud--Functions-0081AA?style=for-the-badge&logo=Formik&logoColor=white)\
![Mongo](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)

## Other Libraries Used

![Material UI](https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white)\
![Formik](https://img.shields.io/badge/Formik-0081CB?style=for-the-badge&logo=Formik&logoColor=white)

## Setup

Sign up on <a href="https://www.back4app.com/">back4app</a>\
Create a new app.\
Create the following classes,

- User

  - lastName(string)
  - emailVerified(Boolean)
  - displayPic(file)
  - phone (string)
  - state(string)
  - status (string)
  - username (string)
  - country (string)
  - firstName (string)
  - password (string)
  - email (string)
  - totalDonations ( number)
  - totalCampaigns (number)

- CampaignCategory

  - name (string)
  - status (string)

- CampaignInfo

  - startTs (date)
  - campaignStatus (string)
  - noOfDonors (number)
  - userRef (pointer to user)
  - endDate (date)
  - goalAmount (number)
  - campaignImage (string)
  - name (string)
  - raisedAmount (number)
  - categoryRef (Pointer to campaign Category)
  - endTs (date)
  - image(file)
  - description (string)
  - publishDate (date)

- CampaignUpdates

  - text (string)
  - image (file)
  - title (string)
  - campaignInfoId (string)

- Document

  - campaignRef (pointer)
  - name (string)
  - document (file)

- FundRaiserInfo
  - paymentId(string)
  - paymentMethod (string)
  - orderId (string)
  - donorsUserId (string)
  - currency (string)
  - status (string)
  - campaignInfRef (pointer to campaignInfo)
  - amount (number)
  - paymentDetails (object)

Go to Cloud Code and select the cloud folder\
Upload the main.js and package.json and then click on deploy
Now goto app settings and goto ecurity and keys section\
Copy app id and rest api key and then assign those values to appropriate variables in .evv file.

After deploying frontend and doing the above steps, Verify by navigating to below address in your preferred browser.

```sh
localhost:[3000] or running port
```

You should be able to see the landing page.

## Features

- PWA developed using React, React-hooks, Redux, Material-Ui and other useful resources mentioned above.
- Fully responsive
- Secured using parse authentication
- Unit test coverage(React Testing Library)
- End-to-End testing using Cypress

## Screenshots

![Example screenshot](./src/readme_assets/home_page.PNG)

## Resources

<a href="https://drive.google.com/file/d/1Ab8ORPkrZJZ_in82XbpN8cbiblNGpSy3/view?usp=sharing">High Level Design</a>\
<a href="https://drive.google.com/file/d/1wMIJxOPeJjoOq6po2TqHuTcalEfV9ZBT/view?usp=sharing"> PRD </a>\
<a href="https://drive.google.com/file/d/1u_vg7Khu_3Vhy2XMWvcBQwjrSkml8ZFJ/view?usp=sharing"> Wireframes</a>

## Contributors ✨

<a href="https://github.com/iamkishorp"><img src="" width="100px;" alt=""/>Kishor Patil</a>

## Community

Thanks to the people who directly and indirectly supported me to accomplish this project.
