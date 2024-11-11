const apiKey = require('./api.js');

async function fetchShorts(apiKey) {
    const nextPageTokens = [];
    const shortsIds = [];
    let nextPageToken = '';
    let pageCount = 0;

    try {
        do {
            const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&type=video&videoDuration=short&key=${apiKey}&pageToken=${nextPageToken}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data.items) {
                data.items.forEach(item => {
                    shortsIds.push(item.id.videoId);
                });
            }

            if (data.nextPageToken) {
                nextPageTokens.push(data.nextPageToken);
                nextPageToken = data.nextPageToken;
                pageCount++;
            } else {
                nextPageToken = '';
            }

        } while (nextPageToken && pageCount < 3);

        console.log("Next Page Tokens:", nextPageTokens);
        console.log("All Shorts Video IDs:", shortsIds);

        // Save pageArr to data.json
        //require('fs').writeFileSync('shortsIds.json', JSON.stringify(shortsIds), 'utf8');
        //console.log("Array has been saved to data.json");

    } catch (error) {
        console.error("Error fetching Shorts IDs:", error);
    }

}

fetchShorts(apiKey);
