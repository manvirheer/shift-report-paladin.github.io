const inputTxtArea = document.getElementById("input");
const outputTxtArea = document.getElementById("result");
const btn = document.getElementById("submit");

btn.addEventListener("click", function(){
  
  //User's input
  var raw = inputTxtArea.value;

  //Replacing new line to space
  var spacedRaw = removeExtras(raw);

  //Converting string to desired formatted string
  var result = strProcessor(spacedRaw);

  //Set up the output text area with the processed string
  outputTxtArea.value = result;

})

const removeExtras = (str) => {
  result = str.replace(/(?:\r\n|\r|\n)/g, ' ');
  result = result.replace(/\t+/gm, ' ')
  return result;
}

const strProcessor = (str) => {
  
  const arr = str.split(' View Tour Session + ').reverse();
  var formattedStr = '';
  arr.forEach((ele) => {
    ele = ele.replace('+ S - M232 - Colliers - Exchange Building  + ', '');

    const patrolType = ele.match(/^([\w\/\-]+)/)[0] + ' Patrol';

    ele = ele.replace(/^([\w\/\-]+)/, '');
    ele = ele.replace(/\sPatrol\s/, '');

    const officerName = ele.match(/\w+\s+/)[0];
     ele = ele.replace(/\w+\s+/, '')
    const officerLastName = (ele.match(/\w+/)[0]).toUpperCase();

    ele = ele.replace(/\w+/, '')
    
    const startTime = ele.match(/\d+:\d+/)[0];
    const endTime = ele.match(/\d+:\d+/g)[1];

    console.log(startTime + ' ' + endTime + '\n')
    formattedStr += startTime + ': S/O ' + officerName + ' ' + officerLastName + ' started the ' + patrolType + '. \n' + endTime + ': S/O ' + officerName + ' ' + officerLastName  ' finished the ' + patrolType + '; all clear. \n'
  })
  
  return formattedStr;
}
