const crypto = require('crypto');



function randomChallengeString() {
    let longString = '';
    for (let i = 0; i < 1000000; i += 1) {
     longString += Math.random().toString(36).substr(2, 1);
    }
    return longString;
   }


function doWork(zerosNb, str) {
    const challengeString = randomChallengeString();
    let nonce = 0;
    const startDate = new Date();
    let hash = crypto.createHash('sha256').update(challengeString + nonce).digest('hex');
    while (hash.substr(0, zerosNb) !== str) {
     hash = crypto.createHash('sha256').update(challengeString + nonce).digest('hex');
     nonce += 1;
    }
    const endDate = new Date();
    console.log('Found the answer');
    console.log(`The answer is ${nonce} with a final hash of ${hash}`);
    console.log(`${(endDate - startDate) / 1000} seconds to complete`);
}

console.log(doWork(5,'00000'))

/*
for 3 zeros : it took 9 seconds
For 4 zeros : The answer is 60114 with a final hash of 0000d13aff8ec475bae2961b5b3b5ac320ca7bdc634667027d29caf90ee42ec8
420.073 seconds to complete  = 7 minutes
*/

