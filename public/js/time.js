// // const moment = require('moment');
// var checkTodoBtn = document.getElementsByClassName("checkTodoBtn");
//
// for(let i = 0; i < checkTodoBtn.length; i++){
//   checkTodoBtn[i].addEventListener('click', function(e){
//     let isInTime;
//     let currentDate = moment().format('L');
//     let currentTime = moment().format('hh:mm a');
//     let due_date = e.currentTarget.value.substring(0, 10);
//     let due_time = e.currentTarget.value.substring(11, e.currentTarget.value.length)
//       currentTime = currentTime.replace(/ /g,'').toLowerCase();
//       due_time = due_time.replace(/ /g,'').toLowerCase();
//
//     var beginningTime = moment(currentTime, 'h:mma');
//     var endTime = moment(due_time, 'h:mma');
//
//     let beforeDueDate = moment(currentDate).isBefore(due_date);
//     let sameDueDate = moment(currentDate).isSame(due_date);
//     let beforeDueTime = beginningTime.isBefore(endTime);
//     if(beforeDueDate === true){
//       isInTime = true;
//     }else if(sameDueDate === true && beforeDueTime === true){
//       isInTime = true;
//     }else{
//       isInTime = false;
//     }
//     return isInTime;
//   })
// }
