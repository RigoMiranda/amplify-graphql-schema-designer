import React, { useEffect, useState } from 'react';
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
import Typography       from '@material-ui/core/Typography';
import Button           from '@material-ui/core/Button';
import IconButton       from '@material-ui/core/IconButton';
import Box              from '@material-ui/core/Box';
import DeleteIcon       from '@material-ui/icons/Delete';
import EditIcon         from '@material-ui/icons/Edit';
import SaveIcon         from '@material-ui/icons/Save';
import AddIcon          from '@material-ui/icons/Add';
import InfoButton       from './InfoButton';
import { connectionInfo } from '../InfoConstants';
import { connectionTypes } from '../Constants';
import { DefaultComponentsStyles } from '../MaterialConstants';

const Connections = props => {

    const classes = DefaultComponentsStyles();
    const {
        newConnection,
        updateGraph
    } = props;

    const [ graph, setGraph] = useState( props.graph );
    const [ argumentsName, setArgumentsName ] = useState( [] );

    const getArgumentsName = graph => {
        let argList = [{
            'name':  '—',
            'value': '—'
        }];
        graph.arguments.map( arg => {
            argList.push({
                'name':  arg.name,
                'value': arg.id
            });
            return null;
        });
        setArgumentsName(argList);
    }

    const addConnectionToArgument = (argId, graph, connection) => {

        let temp = { ...graph };

        if (connection.argumentId !== '' && connection.argumentId !== argId) {
            temp.arguments.forEach( (arg, i) => {
                if ( arg.id === connection.argumentId) {
                    temp.arguments[i].connection = null;
                }
            });
        }

        connection.argumentId = argId;
        temp.arguments.forEach( (arg, i) => {
            if ( arg.id === argId) {
                temp.arguments[i].connection = connection;
            }
        });

        updateGraph(graph);
    }

    const deleteConnection = (conn, graph) => {
        let temp = {...graph };
        temp.connections = temp.connections.filter(connection => connection.id !== conn.id);
        temp.arguments.forEach( (arg, i) => {
            if ( arg.id === conn.argumentId) {
                temp.arguments[i].connection = null;
            }
        });
        updateGraph(temp);
    }

    useEffect( () => {
        getArgumentsName(props.graph);
        setGraph(props.graph);
    }, [ props] );

    return (
        <TableContainer component={Paper}>
        <Typography variant="h6" noWrap>
            Connections
        </Typography>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell align="center"> Argument </TableCell>
                <TableCell align="center"> Type </TableCell>
                <TableCell align="center"> Key Name </TableCell>
                <TableCell align="center"> Fields </TableCell>
                <TableCell align="center"> Actions </TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {graph.connections.map( ( connection, i ) => {
                return (
                    <TableRow key={`connection-${graph.id}-${i}`}>
                        <TableCell>
                            <Select
                                value       = { connection.argumentName }
                                disabled    = { !connection.isEditable }
                                className   = {classes.selectEmpty}
                                inputProps  = { { 'aria-label': 'Without label' } }
                                onChange    = { event => {
                                    addConnectionToArgument(event.target.value, graph, connection);
                                }}
                                >
                                {argumentsName.map( ( args ) => {
                                    return <MenuItem value={`${args.value}`}>{args.name}</MenuItem>
                                }) }
                            </Select>
                        </TableCell>
                        <TableCell align="center">
                            <Select
                                value       = { connection.type }
                                disabled    = { !connection.isEditable }
                                className   = {classes.selectEmpty}
                                inputProps  = { { 'aria-label': 'Without label' } }
                                onChange    = { event => {
                                    graph.connections[i].type = event.target.value;
                                    updateGraph(graph);
                                }}
                                >
                                {connectionTypes.map( ( option ) => {
                                    return <MenuItem value={`${option.value}`}>{option.name}</MenuItem>
                                }) }
                            </Select>
                        </TableCell>
                        <TableCell align="center">
                            <TextField 
                                    required 
                                    label           = "Required"
                                    defaultValue    = { connection.keyName }
                                    placeholder     = 'byProject'
                                    disabled        = { !connection.isEditable }
                                    onChange        = { event => {
                                        graph.connections[i].keyName = event.target.value;
                                        setGraph(graph);
                                    }}
                                />
                        </TableCell>
                        <TableCell align="center">
                            <TextField 
                                    required 
                                    label           = "Required"
                                    placeholder     = 'id, createdAt'
                                    defaultValue    = { connection.fields }
                                    disabled        = { !connection.isEditable }
                                    onChange        = { event => {
                                        graph.connections[i].fields = event.target.value;
                                        setGraph(graph);
                                    }}
                                />
                        </TableCell>
                        <TableCell align="center">
                            <IconButton 
                                    aria-label  = "edit" 
                                    className   = {classes.margin}
                                    onClick     = { () => {
                                        graph.connections[i].isEditable = !connection.isEditable;
                                        updateGraph(graph);
                                    }}
                                >
                                {(connection.isEditable)? <SaveIcon/> : <EditIcon/>}
                            </IconButton>
                            <IconButton 
                                aria-label  = "delete" 
                                className   = {classes.margin}
                                onClick = {() => {
                                    deleteConnection(connection, graph)
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
                    newConnection(graph);
                }}
            >
                Connection
            </Button>
            <InfoButton info = { connectionInfo } />
        </Box>
        </TableContainer>
    );
};

export default Connections;