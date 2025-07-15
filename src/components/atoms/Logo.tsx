import React from 'react';

const Logo: React.FC = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
        src="/assets/img/trashure-logo.png" 
        alt="Logo Trashure"
        width={70}
        height={70}
      />
      <div style={{ color: 'white', marginLeft: '15px' }}>
        <h3><b><span className="text-amber-400">Trash</span>ure</b></h3>
        <h5>Mengubah Sampah Menjadi Berkah</h5>
      </div>
    </div>
  );
};

export default Logo;
