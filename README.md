# MonsterMonitor :japanese_ogre:

Monster Monitor is a public app that allows users to document and view monster sightings within their area. Any user
can post and update their own monster sightings. Users can browse all sightings and filter results. A map view is 
also available to see sightings posted near a user's location or their loved ones. The map displays markers of the 
sighting locations that can be clicked to open the sighting details. The details show crucial information such as 
threat level, location, images, post date and more. Each sighting has a comment section to keep open discussions while 
the monster is active. Monster Monitor was built using C#/.NET and the React.js library. SSMS is used to host the database. 
Firebase is used for user registration and authentiacation. Leaflet was used for the map.

## Technologies Used
* C#
* ASP.Net
* React
* Sass
* MVC
* SSMS
* Dapper
* Axios
* Reactstrap
* Leaflet
* Moment.js


## How to run this app
Note: To run this app you will need a firebase account and a new project.

### 1. Configure Firebase, and seed the data
1. Clone the repository to your local machine.
2. Run the following command in terminal to download the web dependencies: `npm install`
3. In the helpers folder, rename apiKeys.json.example to apiKeys.json.
4. In Firebase, create a new project.
5. Navigate to your config object, and copy the keys from Firebase into the apiKeys.json file.
6. Follow these instructions to generate your own Google API key for the geocoder: https://developers.google.com/maps/documentation/geolocation/get-api-key
8. Locate the data script file in the SeedData folder and run it in your preferred SQL management tool.

### 2. Serve up the app
#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.



## ERD
![ERD](https://firebasestorage.googleapis.com/v0/b/monster-monitor-5c7dc.appspot.com/o/MonsterMonitorERD.png?alt=media&token=e4fd4d36-47b0-416a-ba98-972523c48dff)


## Screenshots
### Login
![Login](https://firebasestorage.googleapis.com/v0/b/monster-monitor-5c7dc.appspot.com/o/MonMonLogin.png?alt=media&token=b676f566-faee-4b94-9230-2c6ee6d33198)

### Home
![Home screen](https://firebasestorage.googleapis.com/v0/b/monster-monitor-5c7dc.appspot.com/o/MonMonHome.png?alt=media&token=02b60fc3-111d-4982-b7ea-434be5e3220c)

### Profile
![Profile screen](https://firebasestorage.googleapis.com/v0/b/monster-monitor-5c7dc.appspot.com/o/MonMonProfile.png?alt=media&token=5793698c-40bf-4683-b909-6c09ca7444d9)

### Map
![Map screen](https://firebasestorage.googleapis.com/v0/b/monster-monitor-5c7dc.appspot.com/o/MonMonMap.png?alt=media&token=7c38755f-024e-4c57-b047-e6e1968ee85e)

### Browse
![Browse screen](https://firebasestorage.googleapis.com/v0/b/monster-monitor-5c7dc.appspot.com/o/MonMonBrowse.png?alt=media&token=a94249c5-0cf5-4609-b2f5-7eca2748ff37)

### Sighting Details
![Details screen](https://firebasestorage.googleapis.com/v0/b/monster-monitor-5c7dc.appspot.com/o/MonMonDetails.png?alt=media&token=10efda0d-5097-48c4-8cb7-f57b4006b051)
