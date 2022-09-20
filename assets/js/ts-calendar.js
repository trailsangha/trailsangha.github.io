---
---

//
// Trail Sangha calendar
//

document.addEventListener('DOMContentLoaded', function() {

  // Calendar targets div with id='ts-calendar'.
  var calendarEl = document.getElementById('ts-calendar');

  // Check for narrow screens.
  function isNarrowScreen() {
      if (window.innerWidth >= {{ site.data.calendar.break_width }} ) {
          return false;
      } else {
          return true;
      }
  };

  // Setup Calendar
  var calendar = new FullCalendar.Calendar(calendarEl, {

    // -- BASIC SETTINGS ----------------------------------------------------

    timeZone: '{{ site.data.calendar.time_zone }}',

    // Be sure to load bootstrap and bootstrap-icons first.
    themeSystem: 'bootstrap5',

    // Sunday = 0
    firstDay: 0,

    // Stop event dragging.
    editable: false,

    // Fill natural height, no scrollbar and allows wrapping.
    height: 'auto', 

    // -- VIEWS AND SIZING --------------------------------------------------

    views: {
      // Month grid -- intended for wide screens.
      tsGrid: {
        type: 'dayGridMonth',

        // TS beginning of time: Sept 2022.
        validRange: { start: '2022-09-01' },
      },

      // List view -- intended for narrow screens.
      tsList: {
        type: 'listMonth',

        // Distable past events, completely! Annoying to scroll and hard to 
        // style properly.
        validRange: function(nowDate) {
          return { start: nowDate };
        },
      },
    },

    // Pick intial view based on screensize.
    initialView: isNarrowScreen() ? 'tsList' : 'tsGrid',

    // On window resize, change view based on size.
    windowResize: function(view) {
        if (window.innerWidth >= {{ site.data.calendar.break_width }} ) {
            calendar.changeView('tsGrid');
        } else {
            calendar.changeView('tsList');
        }
    },

    // -- EVENT SOURCES -----------------------------------------------------

    eventSources: [
      {%- for item in site.data.calendar.event_feeds %}
        {
          {%- if item.google %}
            // Source: Google Calendar
            googleCalendarId: '{{ item.google }}',
            googleCalendarApiKey: '{{ site.data.secrets.gcal_api_key }}',
          {%- elsif item.data %}
            // Source: Site Data
            events: 
              {%- assign events = site.data[ item.data ] %}
              // Filtered by:
              {%- for filter in item.filter %}
                // {{ filter[0] }} = {{ filter[1] }}
                {%- assign events = events | where: filter[0], filter[1] %}
              {%- endfor %}
              [
                {%- for item in events %}
                  {
                    title: "{{ item.title }}",
                    start: "{{ item.start }}",
                    {%- if item.end %}
                      end: "{{ item.end }}",
                    {%- endif %}
                    {%- if item.url %}
                      url: "{{ item.url }}",
                    {%- endif %}
                  },
                {%- endfor %}
              ],
          {%- else %}
             {{ "Invalid Feed Type" | raise_error }}
          {%- endif %}
          {%- for keyvalue in item.options %}
            {{ keyvalue[0] }}: '{{ keyvalue[1] }}',
          {%- endfor %}
        },
      {%- endfor %}
    ],

  });

  calendar.render();

});

