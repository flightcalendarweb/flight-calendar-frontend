// utils/icsGenerator.js
export const generateICSFile = (eventDetails) => {
    // Ensure required fields are present
    if (
      !eventDetails.uid ||
      !eventDetails.dtstart ||
      !eventDetails.dtend ||
      !eventDetails.summary
    ) {
      console.error('Missing required event details');
      return;
    }
  
    // Format the .ics content
    const escapeICSValue = (value) => (value || '')
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
  
  const formatTimestamp = () => {
    return new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };
  
  const icsContent =
  "BEGIN:VCALENDAR\n" +
  "VERSION:2.0\n" +
  "PRODID:-//Your Organization//Your Product//EN\n" +
  "BEGIN:VEVENT\n" +
  "UID:" + eventDetails.uid + "\n" +
  "DTSTAMP:" + formatTimestamp() + "\n" +
  "DTSTART:" + eventDetails.dtstart + "\n" +
  "DTEND:" + eventDetails.dtend + "\n" +
  "SUMMARY:" + escapeICSValue(eventDetails.summary) + "\n" +
  "DESCRIPTION:" + escapeICSValue(eventDetails.description) + "\n" +
  "LOCATION:" + escapeICSValue(eventDetails.location) + "\n" +
  "END:VEVENT\n" +
  "END:VCALENDAR";
  
  console.log(icsContent);
  
  
    // Create a Blob with the .ics content
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  
    // Create a link element to trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'event.ics';
  
    // Programmatically click the link to trigger the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Helper function to escape special characters in .ics values
  const escapeICSValue = (value) => {
    if (!value) return '';
    return value
      .replace(/\\/g, '\\\\') // Escape backslashes
      .replace(/;/g, '\\;')   // Escape semicolons
      .replace(/,/g, '\\,')   // Escape commas
      .replace(/\n/g, '\\n'); // Escape newlines
  };