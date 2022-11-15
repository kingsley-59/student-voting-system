import React from 'react'

const Table = ({ tableHeaders, tableRows }) => {
    return (
        <table className='table'>
            <thead>
                <tr>
                    {tableHeaders.map((header, i) => (
                        <td key={i}>{header}</td>
                    ))}
                </tr>
            </thead>
            <tbody>
                {tableRows.map((row, index) => (
                    <tr key={index}>
                        {row.map((data, i) => (
                            <td key={i} data-label={tableHeaders[i]}>{data}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default Table
