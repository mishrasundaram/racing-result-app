import React, { useEffect, useState } from 'react';
import axios from 'axios';
import YearlyRankingChart from './YearlyRankingChart';

import './App.css';

function App() {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const options = {
        method: 'GET',
        url: 'https://formula-1-standings.p.rapidapi.com/races',
        headers: {
          'X-RapidAPI-Key': '9caf79052dmsh67dc0fd49fa61d8p1fef88jsn10edd692701c',
          'X-RapidAPI-Host': 'formula-1-standings.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setResults(response.data.races);
      } catch (error) {
        console.error('Error fetching racing results:', error);
      }
    };

    fetchResults();
  }, []);

  useEffect(() => {
    const filterResults = () => {
      if (!results) return; // Check if results is available

      const filtered = results.filter(
        (result) =>
          result.raceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          result.Driver.driverId.toLowerCase().includes(searchTerm.toLowerCase()) ||
          result.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
          result.season.toString().includes(searchTerm)
      );
      setFilteredResults(filtered);
    };

    filterResults();
  }, [results, searchTerm]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const getYearlyRankings = () => {
    const yearlyRankings = {
      years: [],
      teamRankings: [],
      driverRankings: []
    };

    results.forEach((result) => {
      const year = result.season.toString();
      const team = result.team;
      const driver = result.Driver.driverId;

      const yearIndex = yearlyRankings.years.indexOf(year);
      if (yearIndex === -1) {
        yearlyRankings.years.push(year);
        yearlyRankings.teamRankings.push(1);
        yearlyRankings.driverRankings.push(1);
      } else {
        yearlyRankings.teamRankings[yearIndex] += 1;
        yearlyRankings.driverRankings[yearIndex] += 1;
      }
    });

    return yearlyRankings;
  };

  const yearlyRankingData = getYearlyRankings();

  return (
    <div className="App">
      <header className="App-header">
        <h1>F1 Racing Results</h1>
      </header>
      <main>
        <div>
          <input
            type="text"
            placeholder="Search by race name, driver, team, or year"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
        <p>Total Results: {filteredResults.length}</p>
        <YearlyRankingChart data={yearlyRankingData} />
        <div>
          {filteredResults.length === 0 ? (
            <p>No results found.</p>
          ) : (
            filteredResults.map((result) => (
              <div key={result.id}>
                <h2>{result.raceName}</h2>
                <p>Year: {result.season}</p>
                <p>Driver: {result.Driver.driverId}</p>
                <p>Team: {result.team}</p>
                <p>Position: {result.position}</p>
                <p>Nationality: {result.nationality}</p>
                <p>Points: {result.points}</p>
                {/* Additional result details */}
              </div>
            ))
          )}
        </div>
      </main>
      <footer>
        <p>&copy; 2023 F1 Racing Results</p>
      </footer>
    </div>
  );
}

export default App;
