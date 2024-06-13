let employeeRecord = {};

function createEmployeeRecord (array) {
function employeeName () {
    if (array.length < 1) {
return null;
}
else employeeRecord = {
    firstName: array[0],
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents : [],
    timeOutEvents: []
}

return employeeRecord;

}
return employeeName();

}


function createEmployeeRecords(array) {
let employeeRecords = [];
for (let i = 0; i < array.length; i++) {
    let employeeRecord = createEmployeeRecord(array[i]);
    employeeRecords.push(employeeRecord);
}
return employeeRecords;
};

function createTimeInEvent(employeeRecord, dateAndTime) {
let timeInEvent = {
    type: "TimeIn",
    date: dateAndTime.split(" ")[0],
    hour: parseInt(dateAndTime.split(" ")[1])
};
employeeRecord.timeInEvents.push(timeInEvent);
return employeeRecord;

}

function createTimeOutEvent(employeeRecord, dateAndTime) {
let timeOutEvent = {
    type: "TimeOut",
    date: dateAndTime.split(" ")[0],
    hour: parseInt(dateAndTime.split(" ")[1])
};
employeeRecord.timeOutEvents.push(timeOutEvent);
return employeeRecord;
}


function hoursWorkedOnDate(employeeRecord, date) {
    let timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    let timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    if (timeInEvent && timeOutEvent) {
      let hoursWorked = timeOutEvent.hour - timeInEvent.hour;
      let deMilitaryTimed = hoursWorked / 100;
      return deMilitaryTimed;
     
    } else {
      console.log("No time in or time out event found for the specified date.");
      return 0;
    }

    
  }
  function wagesEarnedOnDate(employeeRecord, date) {
    let hoursWorked = hoursWorkedOnDate(employeeRecord, date)
    let hourlyWage = employeeRecord.payPerHour;
    if (hoursWorked) {
        let wageEarned = hourlyWage * hoursWorked;
        return wageEarned;
    } else {
        console.log("No Hours Found, Ask A SuperVisor if you Believe this is a mistake!")
        return 0;
        
    }
    
}
function allWagesFor(employeeRecord) {
    let totalWages = 0;
  
    for (let i = 0; i < employeeRecord.timeInEvents.length; i++) {
      let timeInEvent = employeeRecord.timeInEvents[i];
      let timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === timeInEvent.date);
  
      if (timeOutEvent) {
        let hoursWorked = hoursWorkedOnDate(employeeRecord, timeInEvent.date);
        let wagesEarned = hoursWorked * employeeRecord.payPerHour;
        totalWages += wagesEarned;
      }
    }
  
    return totalWages;
  }
  function calculatePayroll(employeeRecords) {
    let totalPayroll = 0;
  
    for (let i = 0; i < employeeRecords.length; i++) {
      let employeeRecord = employeeRecords[i];
      let wages = allWagesFor(employeeRecord);
      totalPayroll += wages;
    }
  
    return totalPayroll;
  }