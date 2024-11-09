const API_KEY = '';
const API_URL = 'https://www.googleapis.com/youtube/v3/search';
const SNIP = 'part=snippet';
const MAX_RESULTS = 'maxResults=50';
const TYPE = 'type=video';
const DURATION = 'videoDuration=short';
const CHANNEL = 'channelId=';
const USER = 'forUsername=colin+furze';
const PAGE = 'pageToken='; // CDIQAA

async function getStatues(event) {
    const queryString = `${API_URL}?${SNIP}&${MAX_RESULTS}&${TYPE}&${DURATION}&${CHANNEL}&${USER}&${PAGE}&key=${API_KEY}`;

    const response = await fetch(queryString);

    const data = await response.json();

    if (response.ok) {
        console.log(data.nextPageToken);
        console.log(data.regionCode);
        console.log(data.pageInfo);
        processId(data);
    } else {
        throw new Error(data.error);
    }

}

function processId(data) {

    let idArray = [];

    for (let item of data.items) {
        idArray.push(item.id.videoId);
    }

    console.log(idArray);
}

// Function to save array to a file
function saveToFile(ids) {
    const filePath = 'shortsIds.json';
    const jsonContent = JSON.stringify(ids, null, 2);

    fs.writeFile(filePath, jsonContent, 'utf8', (err) => {
        if (err) {
            console.error("Error writing to file:", err);
        } else {
            console.log(`Shorts IDs successfully saved to ${filePath}`);
        }
    });
}

function displayStatus(data) {

    let heading = "Shorts ID's";
    let results = `${data}`;


    document.getElementById("heading").innerText = heading;
    document.getElementById("shorts").innerHTML = results;
}

getStatues();