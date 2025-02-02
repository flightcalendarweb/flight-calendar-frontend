// App.js
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Import uuid
import { generateICSFile } from './utils/icsGenerator';

const App = () => {
  // State to manage event details
  const [eventDetails, setEventDetails] = useState({
    uid: uuidv4(), // Generate a unique UID
    summary: 'QF345',
    description: 'Qantas QF345.',
    location: 'Sydney Kingsford Smith International Airport',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
  });

  // Handler to update event details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handler to format date and time for ICS
  const formatDateTimeForICS = (date, time) => {
    const dateTime = new Date(`${date}T${time}`);
    return dateTime.toISOString().replace(/-|:|\.\d\d\d/g, '');
  };

  // Handler to trigger ICS file download
  const handleDownloadICS = () => {
    const { startDate, startTime, endDate, endTime, ...rest } = eventDetails;

    // Format start and end times for ICS
    const dtstart = formatDateTimeForICS(startDate, startTime);
    const dtend = formatDateTimeForICS(endDate, endTime);

    // Generate the ICS file with updated timestamps
    generateICSFile({ ...rest, dtstart, dtend });
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Generate .ics File</h1>

      {/* Form to input event details */}
      <div style={{ marginBottom: '20px' }}>
        <label>
          Event Summary:
          <input
            type="text"
            name="summary"
            value={eventDetails.summary}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Event Description:
          <input
            type="text"
            name="description"
            value={eventDetails.description}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Event Location:
          <input
            type="text"
            name="location"
            value={eventDetails.location}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          Start Date:
          <input
            type="date"
            name="startDate"
            value={eventDetails.startDate || ''}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Start Time:
          <input
            type="time"
            name="startTime"
            value={eventDetails.startTime || ''}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <label>
          End Date:
          <input
            type="date"
            name="endDate"
            value={eventDetails.endDate || ''}
            onChange={handleInputChange}
          />
        </label>
        <label>
          End Time:
          <input
            type="time"
            name="endTime"
            value={eventDetails.endTime || ''}
            onChange={handleInputChange}
          />
        </label>
      </div>

      {/* Button to download the .ics file */}
      <button onClick={handleDownloadICS}>Download .ics File</button>
    </div>
  );
};

export default App;