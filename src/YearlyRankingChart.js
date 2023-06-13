import React, { useEffect, useState } from 'react';
import axios from 'axios';

const YearlyRankingChart = () => {
  const [yearlyRankings, setYearlyRankings] = useState([]);

  useEffect(() => {
    getYearlyRankings();
  }, []);

  const getYearlyRankings = async () => {
    try {
      const response = await axios.get('https://ergast.com/api/f1/driverStandings/1.json');
      const { MRData } = response.data;
      const { StandingsTable } = MRData;
      const { StandingsLists } = StandingsTable;

      if (StandingsLists && StandingsLists.length > 0) {
        const latestYear = StandingsLists[0].season;
        const yearlyData = StandingsLists.map(standings => ({
          year: standings.season,
          driver: standings.DriverStandings[0].Driver.driverId,
          points: standings.DriverStandings[0].points,
        }));

        setYearlyRankings(yearlyData);
      } else {
        setYearlyRankings([]); // No yearly data available
      }
    } catch (error) {
      console.error('Error retrieving yearly rankings:', error);
      setYearlyRankings([]); // Handle error case
    }
  };

  if (!yearlyRankings || yearlyRankings.length === 0) {
    return <div>No yearly rankings available</div>; // Display an error message or fallback UI
  }

  return (
    <div>
      <h2>Yearly Rankings</h2>
      <ul>
        {yearlyRankings.map(rank => (
          <li key={rank.year}>
            {rank.year}: {rank.driver} - {rank.points} points
          </li>
        ))}
      </ul>
    </div>
  );
};

export default YearlyRankingChart;
