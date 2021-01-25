import React from "react";
import { useTable, useBlockLayout } from "react-table";
import {useSticky} from 'react-table-sticky';
import {Styles} from "./TableStyles";
import './table.css'
import {Spinner} from "react-bootstrap";
const CustomTable = ({ columns, data, isLoading}) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    },useBlockLayout, useSticky)


    return (
        <Styles>
            <div {...getTableProps()} className="table sticky" style={{ width: 1100, minHeight: 450, maxHeight: 600 }}>
                <div className="header">
                    {headerGroups.map((headerGroup) => (
                        <div {...headerGroup.getHeaderGroupProps()} className="tr">
                            {headerGroup.headers.map((column) => (
                                <div {...column.getHeaderProps()} className="th">
                                    {column.render('Header')}
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
                {
                    isLoading?(
                        <Spinner animation="grow" variant="dark" />
                    ):(
                        <div {...getTableBodyProps()} className="body">
                            {rows.map((row) => {
                                prepareRow(row);
                                return (
                                    <div {...row.getRowProps()} className="tr">
                                        {row.cells.map((cell) => (
                                            <div {...cell.getCellProps()} className="td">
                                                {cell.render('Cell')}
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                        </div>
                    )
                }

            </div>
        </Styles>
    )
}
export default CustomTable;
