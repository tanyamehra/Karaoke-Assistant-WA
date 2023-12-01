import './Dropdown.css'
import { useState } from 'react';

function Dropdown ({selectedVocalRange, setSelectedVocalRange}) {
    const [isActive, setIsActive] = useState(false);
    const vocalRangeOptions = ["Bass", "Baritone", "Tenor", "Alto", "Mezzo-Soprano", "Soprano"];
    return (
        <div className="dropdown">
            <div className="dropdown-btn" onClick={(e) => setIsActive(!isActive)}>
                {selectedVocalRange}
                <span className='fas fa-caret-down'></span>
            </div>
            {isActive && (
                <div className="dropdown-content">
                    {vocalRangeOptions.map((vocalRangeOption) => (
                         <div 
                            onClick={(e) => {
                                setSelectedVocalRange(vocalRangeOption);
                                setIsActive(false);
                            }} 
                            className="dropdown-item">
                            {vocalRangeOption}
                         </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Dropdown;