# Randomize
## Description
Randomize is an application dedicated to generating random music recommendations for users to expand their musical horizons.
With the overwhelming amount of music released, it may be difficult to determine which songs are worth listening to. 
Randomize generates 10 songs based on the Spotify's Global and US Top 50 Charts and our user-added songs.
Our app provides a quick tool to generate music suggestions without unnecessary data and features.

## Link to Website
https://group-3-sp21.herokuapp.com/

## Target Browsers
* iPhone 6/7/8 
* iPhone 6/7/8 Plus
* iPhone X
* Pixel 2/2 XL
* Desktop 13/15 in.

## Links
[Full Developer Manual](https://docs.google.com/document/d/1E2TGSofRAwppjy0SLhJPloEAmobOCnSOql5vLYSbB9M/edit?usp=sharing)

# Developer Manual
## How to Install Application & All Dependencies
1. Clone this repository to your computer.
2. Open the repository in VSCode or text editor of your choice.
3. In text editor terminal, type `npm install` to install any Node.js modules.

## How to Run Application on a Server
1. Open the repository in VSCode or text editor of your choice.
2. In text editor terminal, type `npm start` to boot up your local server (typically http://localhost:3000/ by default)
3. Type `http://localhost:3000/` in a web browser to access the application.

## How to Run Tests for the Software
There is no prewritten tests in this repository. Testing was mainly done through the server localhost:3000 and inspecting the page to look at the console. However, testing for this application’s API can also be done through the use of Postman, an application that links to your locally-hosted API endpoints and performs a variety of tests using GET, POST, PUT, and DELETE commands to ensure that your API endpoints are functioning correctly. To test your API endpoints in Postman, follow these steps:
1. Start your Node.js server in the Randomize repository terminal, if you have not already done so.
2. In Postman, navigate to the “Overview” page and create a new workspace tab.
3. In the URL bar within your new tab, paste the address of the server you are hosting your Randomize repository on. This should look something like “http://localhost:3000/”.
4. To test a given api route, append the url with “/api/[insert route name]”. For example, if you wanted to view the songs endpoint of the api, you would use the url “http://localhost:3000/api/songs” in Postman. Try this with a variety of different request types to make sure that your API is functioning as intended.
5. Analyze the data returned by Postman to ensure your endpoint is functioning properly. The HTTP response code displayed in the upper right hand corner of the results panel can be helpful in diagnosing problems with endpoint connections.
6. If everything looks good, your endpoint is working!

## APIs
`/wholeUSchart` - API route that gets songs on the US Top 50 charts with its respective artists
* GET - returns data from US Top 50 table with associated metadata added for each song from Artists and Songs tables
`/wholeGlobalchart` - API route that gets songs on the Global Top 50 charts with its respective artists
* GET - returns data from Global Top 50 table with associated metadata added for each song from Artists and Songs tables
`/songs` - API route that gets all the songs in the database (original data + user-added data)
* GET - returns all existing data from Songs table if table length is greater than 0
* POST - creates a new entry in the Songs table based on currentId value
* PUT - updates an existing entry in the Songs table
`/userSongs` - API route for data of only user-added songs
* GET - returns data from Songs table that are greater than song_id of 66 (song_id after 66 are songs not originally included in the database)

## Known Bugs & Future Development
**Bugs:**
* Application does not check whether a song is already in the database if a user adds a pre-existing song
* Application does not reformat user input to the style standards that were used to create the database
* Users cannot specify the artist of a song they are adding because Artists and Songs data are on two different tables within the database. Because of this complexity, only the song name and explicit values are requested (both part of Songs data) and are displayed in the generator table and user-added table.

**Future Development:**
This functionality can be expanded upon in the future to include certain filters for specific artists, genres, and song content. Future features that would be strong additions to the app include:
* Continuing with the original plan and implementing custom playlists
* Cross-checking that user-added songs are real songs available on Spotify or Apple Music
* Consistently updating the US and Global Top 50 charts to reflect the current songs
* A playlist organization system that allows the creation and modification of multiple playlists
* Features that allow users to influence or filter the type of music that is selected to build their random playlist
* An expanded song library that allows for a greater degree of diversity in the music selected to build a random playlist