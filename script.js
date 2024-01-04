$(function () {
  // Display the current date at the top of the calendar
  $('#currentDay').text(dayjs().format('dddd, MMMM D'));

  // Function to update the time block colors based on the current time
  function updateTimeBlocks() {
    // Get the current hour in 24-hour format
    var currentHour = dayjs().hour();

    // Iterate over each time block
    $('.time-block').each(function () {
      var blockHour = parseInt($(this).attr('id').split('-')[1]);

      // Remove any old classes from the element
      $(this).removeClass('past present future');

      // Apply new class based on the current time
      if (blockHour < currentHour) {
        $(this).addClass('past');
      } else if (blockHour === currentHour) {
        $(this).addClass('present');
      } else {
        $(this).addClass('future');
      }
    });
  }

  // Function to save events to local storage
  function saveEvents(hour, event) {
    var events = JSON.parse(localStorage.getItem('events')) || {};
    events[hour] = event;
    localStorage.setItem('events', JSON.stringify(events));
  }

  // Function to load events from local storage
  function loadEvents() {
    var events = JSON.parse(localStorage.getItem('events')) || {};
    for (var hour in events) {
      $('#hour-' + hour + ' .description').val(events[hour]);
    }
  }

  // Call the function to update time block colors
  updateTimeBlocks();

  // Set interval to check for time updates every 5 minutes
  setInterval(updateTimeBlocks, 300000);

  // Load any saved events from local storage
  loadEvents();

  // Click listener for the save button
  $('.saveBtn').on('click', function () {
    // Get the hour from the id of the time block containing the button
    var hour = $(this).parent().attr('id').split('-')[1];

    // Get the text from the description area of the time block
    var eventText = $(this).siblings('.description').val();

    // Save the event in local storage
    saveEvents(hour, eventText);
  });
});




// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
//$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
//});
