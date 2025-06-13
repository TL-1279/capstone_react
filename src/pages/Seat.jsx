import React from 'react';

const Seat = ({ ghe, isSelected, onToggle }) => {
  const style = {
    width: '30px',
    height: '30px',
    backgroundColor: ghe.daDat ? '#999' : isSelected ? '#4caf50' : '#fff',
    border: '1px solid #333',
    cursor: ghe.daDat ? 'not-allowed' : 'pointer',
  };

  return (
    <button style={style} onClick={onToggle} disabled={ghe.daDat} title={ghe.tenGhe}>
      {ghe.tenGhe}
    </button>
  );
};

export default Seat;
