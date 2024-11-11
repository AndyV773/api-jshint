const API_KEY = require('./api.js');

const API_URL = 'https://www.googleapis.com/youtube/v3/search';
const SNIP = 'part=snippet';
const MAX_RESULTS = 'maxResults=50';
const TYPE = 'type=video';
const DURATION = 'videoDuration=short';
const CHANNEL = 'channelId=';
const USER = 'forUsername=colin+furze';  // ${CHANNEL}&${USER}&
let PAGE = ['CDIQAA', 'CGQQAA', 'CJYBEAA', 'CMgBEAA', 'CPoBEAA', 'CKwCEAA', 'CN4CEAA', 'CJADEAA', 'CMIDEAA', 'CPQDEAA']; // CDIQAA CGQQAA CJYBEAA CMgBEAA CPoBEAA CKwCEAA CN4CEAA CJADEAA CMIDEAA CPQDEAA

let idArray = [];
let pageArr = [];


async function getStatus(event) {
    for (let i = 0; i < 10; i++) {
        const queryString = `${API_URL}?${SNIP}&${MAX_RESULTS}&${TYPE}&${DURATION}&pageToken=${PAGE[i]}&key=${API_KEY}`;

        const response = await fetch(queryString);

        const data = await response.json();

        if (response.ok) {
            console.log('In getStatus:', data.nextPageToken);
            processId(data, i);
        } else {
            if (data.error) {
                console.error("API Error:", JSON.stringify(data.error, null, 2)); // Log the error object as a JSON string
                throw new Error("An error occurred while fetching data from the API");
            }
            throw new Error(data.error);
        }
    }

    console.log(pageArr);
    // Save pageArr to data.json
    // require('fs').writeFileSync('data.json', JSON.stringify(pageArr), 'utf8');

    console.log("Array has been saved to data.json");

}

function processId(data, i) {
    idArray.push([]);

    for (let item of data.items) {
        idArray[i].push(item.id.videoId);
    }

    pageArr.push({[data.nextPageToken] : [idArray[i]]});

}

getStatus();