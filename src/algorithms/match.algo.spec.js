const MatchAlgo = require("./match.algorithm");

const user1Interests = {
    "pjBmUIjlFN8oyA65pSpD_0": {
        "id": "pjBmUIjlFN8oyA65pSpD_0",
        "name": "Rap ",
        "description": "",
        "imgUrl": "https://storage.cloud.google.com/textversation-images/interests/music/rap.jpg"
    },
    "pjBmUIjlFN8oyA65pSpD_1":{
        "id": "pjBmUIjlFN8oyA65pSpD_1",
        "name": "R&B",
        "description": "",
        "imgUrl": "https://storage.cloud.google.com/textversation-images/interests/music/rnb.jpg"
    },
    "pjBmUIjlFN8oyA65pSpD_2":{
        "name": "Jazz ",
        "description": "",
        "imgUrl": "https://storage.cloud.google.com/textversation-images/interests/music/jazz.jpg",
        "id": "pjBmUIjlFN8oyA65pSpD_2"
    },
   "pjBmUIjlFN8oyA65pSpD_3": {
        "name": "Oldschool",
        "description": "",
        "imgUrl": "https://storage.cloud.google.com/textversation-images/interests/music/oldschool.jpg",
        "id": "pjBmUIjlFN8oyA65pSpD_3"
    },
};

//* Both of user 2's interests are interests in common with user 1 in this case
const user2Interests = {
    "pjBmUIjlFN8oyA65pSpD_2":{
        "name": "Jazz ",
        "description": "",
        "imgUrl": "https://storage.cloud.google.com/textversation-images/interests/music/jazz.jpg",
        "id": "pjBmUIjlFN8oyA65pSpD_2"
    },
    "pjBmUIjlFN8oyA65pSpD_3": {
        "name": "Oldschool",
        "description": "",
        "imgUrl": "https://storage.cloud.google.com/textversation-images/interests/music/oldschool.jpg",
        "id": "pjBmUIjlFN8oyA65pSpD_3"
    }
};

test("Try comparing users where one or more users do not have interests set",()=>{
    expect(MatchAlgo.ajInterestMatchCalc(user1Interests,{})).toBeFalsy();
    expect(MatchAlgo.ajInterestMatchCalc({},user2Interests)).toBeFalsy();
    expect(MatchAlgo.ajInterestMatchCalc({},{})).toBeFalsy();
});

test("Check for correctness of matching score calculation",()=>{
    let matchData = MatchAlgo.ajInterestMatchCalc(user1Interests,user2Interests);

    console.log(matchData);
    expect(matchData.score).toBe(0.75);
    expect(matchData.percentage).toBe(75);
});