import React from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

const Table = ({ onSort, sortColumn, data, columns }) => {
    //const { movies, onSort, sortColumn, data, columns } = this.props
    return ( 
        <table className="table">
            <TableHeader 
                columns={columns} 
                sortColumn={sortColumn} 
                onSort={onSort}
            />
            <TableBody 
                columns={columns} 
                data={data}
            />
        </table>
     );
}
 
export default Table;