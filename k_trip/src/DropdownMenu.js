// DropdownMenu.js
import React from 'react';

function DropdownMenu({ items, selectedItem, onSelectItem, placeholder }) {
    return (
        <div className="dropdown">
            <button>{selectedItem ? selectedItem : placeholder}</button>
            <ul>
                {items.map((item, index) => (
                    <li key={index} onClick={() => onSelectItem(item)}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DropdownMenu;
