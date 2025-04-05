import React, { useState } from 'react';
import SelectDropdown from './SelectDropdown';

export default function Home() {
  const [selected, setSelected] = useState(null);

  const handleSelection = (item) => {
    setSelected(item);
  };

  return (
    <div className="container">
      <h1>Dropdown Select Component</h1>
      <SelectDropdown
        label="Select a color"
        onChange={handleSelection}
      />
      {selected && <p>Selected Color is: {selected.name}</p>}
    </div>
  );
}
