// Install dependencies: npm install googleapis
const { google } = require('googleapis');

// Step 1: Load client secrets from credentials.json
const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json',
  scopes: ['https://www.googleapis.com/auth/calendar'],
});

// Step 2: Create Calendar client
async function accessCalendar() {
  try {
    const client = await auth.getClient();
    const calendar = google.calendar({ version: 'v3', auth: client });

    // Step 3: Create a new event
    const event = {
      summary: 'IPT1 Demo Event',
      start: { dateTime: '2026-07-21T10:00:00', timeZone: 'Asia/Manila' },
      end: { dateTime: '2026-07-21T11:00:00', timeZone: 'Asia/Manila' },
    };

    const insertRes = await calendar.events.insert({
      calendarId: 'primary',
      resource: event,
    });
    console.log('Event created:', insertRes.data.htmlLink);

    // Step 4: List upcoming events
    const listRes = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 5,
      singleEvents: true,
      orderBy: 'startTime',
    });

    console.log('Upcoming events:');
    if (listRes.data.items && listRes.data.items.length > 0) {
      listRes.data.items.forEach(ev => {
        const start = ev.start.dateTime || ev.start.date;
        const end = ev.end.dateTime || ev.end.date;
        console.log(`${ev.summary} - ${start} to ${end}`);
      });
    } else {
      console.log('No upcoming events found.');
    }
  } catch (error) {
    console.error('Error accessing Google Calendar:', error);
  }
}

accessCalendar();
