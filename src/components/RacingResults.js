import React, { useEffect, useState } from 'react';

const RacingResults = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Fetch the racing results from the backend or an API
    // Update the `results` state with the fetched data
    const fetchResults = async () => {
      try {
        const response = await fetch('https://formula-1-standings.p.rapidapi.com/races');
        const data = await response.json();
        setResults(data);
      } catch (error) {
        console.error('Error fetching racing results:', error);
      }
    };

    fetchResults();
  }, []);

  return (
    <div>
      {results.map((result) => (
        <div key={result.id}>
          <h2>{result.raceName}</h2>
          <p>Year: {result.year}</p>
          <p>Driver: {result.driver}</p>
          <p>Team: {result.team}</p>
          {/* Additional result details */}
        </div>
      ))}
    </div>
  );
};

export default RacingResults;
