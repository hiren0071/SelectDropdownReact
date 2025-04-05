import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SelectDropdown = ({ label, onChange }) => {
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedData, setHighlightedData] = useState(-1);

  // Fetch options from the API
  useEffect(() => {
    axios.get('https://localhost:7000/api/DropdownData')
      .then(response => {
        setOptions(response.data);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  

  // Handle search input
  const filteredData = options.filter(option =>
    option.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Handle keyboard navigation
  const keyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        setHighlightedData((prevIndex) => (prevIndex + 1) % filteredData.length);
        break;
      case 'ArrowUp':
        setHighlightedData((prevIndex) => 
          (prevIndex - 1 + filteredData.length) % filteredData.length
        );
        break;
      case 'Enter':
        if (highlightedData !== -1) {
          handleSelect(filteredData[highlightedData]);
        }
        break;
      case 'Escape':
        setIsOpen(false); // Close the dropdown
        break;
      default:
        break;
    }
  };

  // Handle selection
  const handleSelect = (option) => {
    setSelectedOption(option);
    onChange(option);
    setIsOpen(false);
    setSearchText("");
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', keyDown);
    } else {
      window.removeEventListener('keydown', keyDown);
    }

    return () => {
      window.removeEventListener('keydown', keyDown);
    };
  }, [isOpen, highlightedData]);

  return (
    <div className="dropdown-container" tabIndex={0}>
      <div className="dropdown" onClick={() => setIsOpen(!isOpen)}>
        <input
          type="text"
          data-testid="react-select"
          value={selectedOption ? selectedOption.name : ''}
          className="input-dropdownText"
          placeholder={label}
          onClick={toggleDropdown}
          onChange={(e) => setSearchText(e.target.value)}
          readOnly
        />
        <div className="dropdown-icon">▼</div>
      </div>

      {isOpen && (
        <div className="dropdown-menu">
          <input
            type="text"
            className="search-input"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search..."
          />
          <ul>
            {filteredData.map((option, index) => (
              <li
                key={option.id}
                onClick={() => handleSelect(option)}
                className={`
                  ${selectedOption?.id === option.id ? 'selected' : ''}
                  ${highlightedData === index ? 'highlighted' : ''}
                `}
              >
                {option.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SelectDropdown;
