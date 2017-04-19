/// <reference path="../../typings/react/react.d.ts" />
/// <reference path="../../typings/globals/material-ui/index.d.ts" />

import * as React from "react";

import {ExcelImportResult} from "../model/excelImportResult";

import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Subheader from "material-ui/Subheader"

export interface ExcelImportErrorListProps{
    importResults:Array<ExcelImportResult>;
}

export class ExcelImportErrorList extends React.Component<ExcelImportErrorListProps, undefined>{

    render(): JSX.Element{
        
        if (this.isListOfErrorsEmpty())
            return this.buildEmptyTable();
        else
            return this.buildErrorItems();
    }

    private isListOfErrorsEmpty():boolean{
        return this.props.importResults.length == 0;
    }

    private buildErrorItems():JSX.Element{
        
        const header = this.props.importResults.length + " errors were found in the Excel file";

        const tableItems = this.props.importResults.map((result, index, arr) => 
            <TableRow>
                <TableRowColumn>{result.Messages}</TableRowColumn>
            </TableRow>
        );

        return <Table>
            <TableHeader
                displaySelectAll={false}>
                <TableRow>
                    <TableHeaderColumn>{header}</TableHeaderColumn>
                </TableRow>
            </TableHeader>                    
            <TableBody
                displayRowCheckbox={false}>
                {this.props.importResults.map( (result, index) => (
                <TableRow key={index}>
                    <TableRowColumn>{result.Messages}</TableRowColumn>
                </TableRow>
              ))}
            </TableBody>                    
        </Table>;
    }

    private buildEmptyTable(): JSX.Element{
        return <div></div>;
    }    
} 