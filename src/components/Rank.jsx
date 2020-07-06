import React from 'react';

const Rank = ({ name, entries }) => {
    return (
        <div>
            <div className="rank f2">
                {`${name}, your current entry count is ...`} <br />
                {entries}
            </div>
        </div>
    )
}

export default Rank;