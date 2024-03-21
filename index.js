const fs = require('node:fs');
const readline = require('node:readline');

require("dotenv").config({ path: __dirname + "/.env" });
const { twitterClient } = require("./twitterClient.js")

const tweet = async (tweetText) => {
  try {
    await twitterClient.v2.tweet(tweetText);
  } catch (e) {
    console.log(e)
  }
}

async function processLineByLine() {
  const fileStream = fs.createReadStream('tweets.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    //console.log(`${line}`);
    tweet(`${line}`);
    await new Promise(resolve => setTimeout(resolve, 12 * 60 * 60 * 1000));
  }
}

processLineByLine();