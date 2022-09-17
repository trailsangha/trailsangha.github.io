---
---

//
// Trail Sangha calendar
//

document.addEventListener('DOMContentLoaded', function() {

  // Grab ts-calendar div.
  var calendarEl = document.getElementById('ts-calendar');

  // Check if screen narrow.  Use to switch between calendar views.
  function mobileCheck() {
      if (window.innerWidth >= {{ site.data.calendar.break_width }} ) {
          return false;
      } else {
          return true;
      }
  };

  // Calendar for TS schedule.
  var calendar = new FullCalendar.Calendar(calendarEl, {

   // ASSORTED SETTINGS 
      timeZone: '{{ site.data.calendar.time_zone }}',
   themeSystem: 'bootstrap5',
      firstDay: 0,       // Sunday=0
      editable: false,   // Stop event dragging.
        height: 'auto',  // Fill natural height, no scrollbar and allows wrapping.

    // CALENDAR VIEWS + SIZING

    // Pick intial view based on screensize.
    initialView: mobileCheck() ? 'listMonth' : 'dayGridMonth',

    // On window resize, change view based on size.
    windowResize: function(view) {
        if (window.innerWidth >= {{ site.data.calendar.break_width }} ) {
            calendar.changeView('dayGridMonth');
        } else {
            calendar.changeView('listMonth');
        }
    },

    // EVENT SOURCES

    // Same API key for all Google Calendars
    googleCalendarApiKey: '{{ site.data.secrets.gcal_api_key }}',

    eventSources: [
      {% for item in site.data.calendar.event_feeds %}
        {
          {% if item.google != null and item.google != '' %}
            googleCalendarId: '{{ item.google }}',
          {% elsif item.local_ics != null and item.local_ics != '' %}
            events: {
              url: '{{ item.local_ics | relative_url }}',
              format: 'ics'
            },
          {% elsif item.ics != null and item.ics != '' %}
            events: {
              url: '{{ item.ics }},
              format: 'ics'
            },
          {% elsif item.csv != null and item.csv != '' %}
            events: {{ site.data.events[ item.csv ] | jsonify }},
          {% else -%}
             {{ "Invalid Feed Type" | raise_error }}
          {% endif %}
          {% for keyvalue in item.options %}
            {{ keyvalue[0] }}: '{{ keyvalue[1] }}',
          {% endfor %}
        },
      {% endfor %}
    ],

//   eventRender: function(calev, elt, view) {
//     if (calev.end.getTime() < Date.now())
//       elt.addClass("ts-past-event");
//   }

  });

  calendar.render();

});

