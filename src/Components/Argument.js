import React, { useState } from 'react';
import Connections      from './Connections';
import Table            from '@material-ui/core/Table';
import TableBody        from '@material-ui/core/TableBody';
import TableCell        from '@material-ui/core/TableCell';
import TableContainer   from '@material-ui/core/TableContainer';
import TableHead        from '@material-ui/core/TableHead';
import TableRow         from '@material-ui/core/TableRow';
import Paper            from '@material-ui/core/Paper';
import TextField        from '@material-ui/core/TextField';
import Select           from '@material-ui/core/Select';
import MenuItem         from '@material-ui/core/MenuItem';
import Switch           from '@material-ui/core/Switch';
import Button           from '@material-ui/core/Button';
import IconButton       from '@material-ui/core/IconButton';
import Box              from '@material-ui/core/Box';
import DeleteIcon       from '@material-ui/icons/Delete';
import EditIcon         from '@material-ui/icons/Edit';
import SaveIcon         from '@material-ui/icons/Save';
import AddIcon          from '@material-ui/icons/Add';
import InfoButton       from './InfoButton';
import { DefaultComponentsStyles } from '../MaterialConstants'; 
import { typeTableHeader, enumTableHeader } from '../Constants';

const Argument = props => {

    const classes = DefaultComponentsStyles();
    const {
        newArgument,
        updateGraph,
        typesGraphs,
        graph,
        info
    } = props;

    const [ theGraph, setGraph] = useState( graph );

    const deleteArgument = ( argumentId ) => {
        let temp = { ...props };
        temp.graph.arguments = temp.graph.arguments.filter(argument => argument.id !== argumentId);
        props.updateGraph(temp);
    }

    const tableHeader = ((graph.type === 'type')? typeTableHeader : enumTableHeader);

    return (
    <div>
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
            <TableRow>
                {tableHeader.map( (name, i) => {
                    return( 
                        <TableCell 
                            align = "center"
                            key   = {`argument-table-header-${graph.id}-${i}`}
                        >
                            { name } 
                        </TableCell>);
                })}

            </TableRow>
            </TableHead>
            <TableBody>
            {graph.arguments.map( ( argument, i ) => {
                return (
                    <TableRow key={`argument-${graph.id}-${i}`}>
                        <TableCell align="center" >
                            <TextField 
                                required 
                                label           = "Required"
                                defaultValue    = { argument.name }
                                disabled        = { !argument.isEditable }
                                onChange        = { event => {
                                    theGraph.arguments[i].name = event.target.value;
                                    setGraph(theGraph);
                                }}
                            />
                        </TableCell>
                        {(graph.type === 'type')?
                        <React.Fragment>
                            <TableCell align="center">
                                <Select
                                    value       = { argument.type }
                                    disabled    = { !argument.isEditable }
                                    className   = {classes.selectEmpty}
                                    inputProps  = { { 'aria-label': 'Without label' } }
                                    onChange    = { event => {
                                        graph.arguments[i].type = event.target.value;
                                        updateGraph(graph);
                                    }}
                                    >
                                    {typesGraphs.map( ( option ) => {
                                        return (
                                            <MenuItem 
                                                value = {`${option.value}`}
                                                key   = {`argument-menu-item-${graph.id}-${Math.random().toString()}`}
                                            >
                                                {option.name}
                                            </MenuItem>
                                        );
                                    }) }
                                </Select>
                            </TableCell>
                            <TableCell align="center">
                                <Switch 
                                    checked     = { argument.required }
                                    disabled    = { !argument.isEditable }
                                    onClick     = { () => {
                                        graph.arguments[i].required = !graph.arguments[i].required;
                                        updateGraph(graph);
                                    }}
                                />
                            </TableCell>
                        </React.Fragment>
                        : ''}
                        <TableCell align="center">
                            <IconButton 
                                    aria-label  = "edit" 
                                    className   = {classes.margin}
                                    onClick     = { () => {
                                        graph.arguments[i].isEditable = !graph.arguments[i].isEditable;
                                        updateGraph(graph);
                                    }}
                                >
                                {(argument.isEditable)? <SaveIcon/> : <EditIcon/>}
                            </IconButton>
                            <IconButton 
                                aria-label  = "delete" 
                                className   = {classes.margin}
                                onClick = {() => {
                                    deleteArgument(argument.id)
                                }}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                )
            })}
            </TableBody>
        </Table>
        <Box m={2} className   = { classes.box }>
            <Button
                variant     = "contained"
                color       = "primary"
                
                startIcon   = {<AddIcon />}
                onClick     = { () => {
                    newArgument(graph);
                }}
            >
                Argument
            </Button>
            <InfoButton info = {info} />
        </Box>
        </TableContainer>
        {(graph.type === 'type')? 
        <Connections
            updateGraph     = { updateGraph }
            newConnection   = { props.newConnection }
            graph           = { graph }
        /> 
        : ''}
    </div>
    );
};

export default React.memo (Argument );