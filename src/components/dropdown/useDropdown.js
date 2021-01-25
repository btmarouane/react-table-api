import React, { useState } from 'react';

const useDropdown = (label, defaultState) => {
    const [state, setState] = useState(defaultState);
    const id = `use-dropdown-${label.replace(' ', '').toLowerCase()}`;
    const Dropdown = ({options}) => (
        <label htmlFor={id}>
            {label}
            <select
                id={id}
                value={state}
                onChange={(e) => setState(e.target.value)}
                onBlur={(e) => setState(e.target.value)}
                disabled={options.length === 0}
            >
                {
                    options.length === 0?<option>Loading ...</option> :(
                            <>
                                <option>All</option>
                                {options.map((item) => (
                                    <option key={item} value={item}>
                                {item}
                                    </option>
                                    ))}
                            </>
                    )
                }

            </select>
        </label>
    );
    return [state, Dropdown, setState];
};

export default useDropdown;
