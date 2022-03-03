/**
 * Fond the couples that adding its height in inches, match the input
 * @param {*} sortedPlayers Sorted list of players
 * @param {*} input Input to be matched
 * @returns 
 */
function findCouples(sortedPlayers, input) {
  let couplesList = [];
  let i = 0;
  let j = sortedPlayers.length - 1
  let repeatedJ = { h_in: -1, index: -1}
  while ( j > i ) {
    let playerI = sortedPlayers[i];
    let playerJ = sortedPlayers[j];
    let sum = parseInt(playerI.h_in) + parseInt(playerJ.h_in)
    if (sum === input) {
      couplesList.push([`${playerI.first_name} ${playerI.last_name}`, `${playerJ.first_name} ${playerJ.last_name}`]);
      j--;
      // Check if there are players with same height on the right part of the list.
      if (playerJ.h_in === sortedPlayers[j].h_in) {
        // If there are players with the same height on the right part, save the index of the right most player.
        if (repeatedJ.h_in !== playerJ.h_in) {
          repeatedJ.h_in = playerJ.h_in;
          repeatedJ.index = j + 1
        }
        i--;
      // Check if there are players with the same height on the left part of the list.
      } else if (playerI.h_in === sortedPlayers[i + 1].h_in) {
        // Return the right index to the same player as before, or the right most repeated player
        j = repeatedJ.index === -1 ? j + 1 : repeatedJ.index;
      }
      // Flush info for repeated players on the right.
      if (playerJ.h_in !== sortedPlayers[j].h_in) {
        repeatedJ.h_in = -1;
        repeatedJ.index = -1
      }
    }
    i++;
  }
  return couplesList;
};
/**
 * Find a subarray where its certain to find at least one couple to fulfill the condition:
 * - Adding the height in inches match the input
 * @param {*} sortedPlayers Sorted list of players
 * @param {*} input Input to be matched
 * @param {*} start Start index for binary search
 * @param {*} end end index for binary search
 * @returns 
 */
function recusrsiveFindFocus(sortedPlayers, input, start, end) {
  let lastPlayer = sortedPlayers[sortedPlayers.length - 1]
  if (start > end){
    return false;
  }
  let mid=Math.floor((start + end)/2);
  let midPlayer = sortedPlayers[mid];
  let sum = parseInt(lastPlayer.h_in) + parseInt(midPlayer.h_in)
  if (sum === input){
    return true;
  }
  if(sum > input)
      return recusrsiveFindFocus(sortedPlayers, input, start, mid-1);
  else
    return recusrsiveFindFocus(sortedPlayers, input, mid+1, end);
}

/**
 * Swap elements in players array
 * @param {*} players List of players
 * @param {*} leftIndex Left index to swap
 * @param {*} rightIndex Right index to swap
 */
function swap(players, leftIndex, rightIndex){
  var temp = players[leftIndex];
  players[leftIndex] = players[rightIndex];
  players[rightIndex] = temp;
}
/**
 * Create a partition from the list of players
 * @param {*} players List of players
 * @param {*} left Left index of the partition
 * @param {*} right right index of partition
 * @returns 
 */
function partition(players, left, right) {
  var pivot   = parseInt(players[Math.floor((right + left) / 2)].h_in),
      i       = left,
      j       = right;
  while (i <= j) {
      while (parseInt(players[i].h_in) < pivot) {
          i++;
      }
      while (parseInt(players[j].h_in) > pivot) {
          j--;
      }
      if (i <= j) {
          swap(players, i, j);
          i++;
          j--;
      }
  }
  return i;
}
/**
 * Quicksort algorithm
 * @param {*} players List of players
 * @param {*} left Left index of partition
 * @param {*} right right index of partition
 * @returns 
 */
function quickSort(players, left, right) {
  var index;
  if (players.length > 1) {
      index = partition(players, left, right);
      if (left < index - 1) {
          quickSort(players, left, index - 1);
      }
      if (index < right) {
          quickSort(players, index, right);
      }
  }
  return players;
}


module.exports = {
  findCouples: findCouples,
  recusrsiveFindFocus: recusrsiveFindFocus,
  quickSort: quickSort
}