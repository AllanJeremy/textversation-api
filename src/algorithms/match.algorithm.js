const MatchConfig = require("../config/match.config");

// AJ matching algorithm
module.exports.ajInterestMatchCalc = (user1Interests, user2Interests) => {
  //? Compares 2 user interests and determines a match score
  //? [Consideration] Create recursive implementation that can compare `n` people's interests against each other
  const user1InterestsArray = Object.values(user1Interests);
  const user2InterestsArray = Object.values(user2Interests);

  // Both users need to have interests set
  if (!user1InterestsArray.length || !user2InterestsArray.length) return false;

  const NUM_PEOPLE_COMPARED = 2;
  const interestIds1 = user1InterestsArray.map(interest => interest.id);
  const interestIds2 = user2InterestsArray.map(interest => interest.id);

  const primaryInterestIds =
    interestIds1.length >= interestIds2 ? interestIds1 : interestIds2;
  const secondaryInterestIds =
    interestIds1.length >= interestIds2 ? interestIds2 : interestIds1;

  // Get which interests the user matched on ~ doesn't matter which user we use to compare, results are same. Using user1 as base comparison
  let matchedInterestIds = secondaryInterestIds.filter(interestId =>
    primaryInterestIds.includes(interestId)
  );
  let matchedInterests = matchedInterestIds.map(
    currInterestId => user1Interests[currInterestId]
  );
  matchedInterests = matchedInterests.filter(interest => interest); //? Remove falsy values from array

  let matchScore = matchedInterests
    .reduce((prev, currInterest) => {
      //? CurrInterest will contain weight information later on
      //? Use the different interest weights for various interests when we start using different weights
      let user1InterestWeight = 1 / interestIds1.length;
      let user2InterestWeight = 1 / interestIds2.length; //? Add more weights if we want to compare more users

      let currInterestPoints =
        (user1InterestWeight + user2InterestWeight) / NUM_PEOPLE_COMPARED;
      let aggregatePoints = prev + currInterestPoints; //? Total points so far
      return aggregatePoints;
    }, 0)
    .toFixed(5); //? 5 decimal places with max of 1. 3 decimal places as percentage ~ enough variance to sort matches well

  // Convert the score to a floating point number
  matchScore = parseFloat(matchScore);

  let matchData = {
    interestsMatched: matchedInterests,
    score: matchScore,
    percentage: matchScore * 100,
    isMatch: matchScore >= MatchConfig.MIN_INTEREST_MATCH_THRESHOLD
  };

  return matchData;
};
