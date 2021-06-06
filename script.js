var d = new Date();

  const inputTxtArea = document.getElementById("input");
  const outputTxtArea = document.getElementById("result");
  const btn = document.getElementById("submit");

  btn.addEventListener("click", function () {

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

  let officersOnDuty = [];
  const strProcessor = (str) => {

    const arr = str.split(' View Tour Session + ').reverse();
    let closedAbmYet = false;
    var formattedStr = '';
    let breifingOfficer = 'Manpreet SINGH';
    let firstOfficerName = '';
    let secondOfficerName = '';
    arr.forEach((ele) => {
      ele = ele.replace('+ S - M232 - Colliers - Exchange Building  + ', '');

      const patrolType = ele.match(/^([\w\/\-]+)/)[0] + ' Patrol';

      ele = ele.replace(/^([\w\/\-]+)/, '');
      ele = ele.replace(/\sPatrol\s/, '');

      const officerName = ele.match(/\w+\s+/)[0];
      ele = ele.replace(/\w+\s+/, '')

      //Last name in all caps
      const officerLastName = (ele.match(/\w+/)[0]).toUpperCase();

      ele = ele.replace(/\w+/, '')

      const startTime = ele.match(/\d+:\d+/)[0];

      if (closedAbmYet == false && parseInt(startTime, 10) > 8) {
        formattedStr += "09:00 : S/Os opened the National Bank\'s Abm \n"
        closedAbmYet = true
      }

      if (!officersOnDuty.includes(officerName + officerLastName))
        officersOnDuty.push(officerName + officerLastName);

      if (officersOnDuty.length > 1) {

      }
      const endTime = ele.match(/\d+:\d+/g)[1];

      let startTimeInMinutes = (60 * parseInt(String(startTime).match(/^(\d+):(\d+)$/)[1], 10) + parseInt(String(startTime).match(/^(\d+):(\d+)$/)[2], 10))

      let endTimeInMinutes = (60 * parseInt(String(endTime).match(/^(\d+):(\d+)$/)[1], 10) + parseInt(String(endTime).match(/^(\d+):(\d+)$/)[2], 10))

      
      if (officersOnDuty.length > 1 && (endTimeInMinutes - startTimeInMinutes > 10)) {
        formattedStr += startTime + ': S/O ' + officerName + officerLastName + ' started the ' + patrolType + '. \n' + startTime.substr(0, startTime.length - 2) + (parseInt(String(startTime).match(/^(\d+):(\d+)$/)[2], 10) + 5) 
          + ': S/O ' + officersOnDuty[1- officersOnDuty.indexOf(officerName + officerLastName)] + ' is monitoring CCTV cameras, site is safe and secure. \n'
          + endTime + ': S/O ' + officerName + officerLastName + ' completed the ' + patrolType + '; all clear. \n';
      }
      else {
        formattedStr += startTime + ': S/O ' + officerName + officerLastName + ' started the ' + patrolType + '. \n' + endTime + ': S/O ' + officerName + officerLastName + ' completed the ' + patrolType + '; all clear. \n';
      }

    })
    console.log(officersOnDuty)

    let breifing = '07:45: S/O ' + officersOnDuty[0] + ' and ' + officersOnDuty[1] + ' are onsite and received briefing by S/O ' + breifingOfficer + '\n';
    let initialDuties = "08:10: S/O " + officersOnDuty[0] + ' and ' + officersOnDuty[1] + ' read the pass-on and emails' + '\n';
    return breifing + initialDuties + formattedStr;
  }
