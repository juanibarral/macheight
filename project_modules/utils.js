function findCouples(sortedPlayers, input) {
  let couplesList = [];
  let i = 0;
  let j = sortedPlayers.length - 1
  while ( j > i ) {
    let playerI = sortedPlayers[i];
    let playerJ = sortedPlayers[j];
    let sum = parseInt(playerI.h_in) + parseInt(playerJ.h_in)
    if (sum === input) {
      couplesList.push([`${playerI.first_name} ${playerI.last_name} : ${playerI.h_in}`, `${playerJ.first_name} ${playerJ.last_name} : ${playerJ.h_in}`]);
      j--;
      if (playerJ.h_in === sortedPlayers[j].h_in) {
        i--;
      } else if (playerI.h_in === sortedPlayers[i + 1].h_in) {
        j++;
      }
    }
    i++;
  }
  return couplesList;
};

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


module.exports = {
  findCouples: findCouples,
  recusrsiveFindFocus: recusrsiveFindFocus,
}