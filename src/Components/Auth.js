import React, { useState, useEffect } from 'react';
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
import { authTableHeader, toAllow } from '../Constants';
import { DefaultComponentsStyles } from '../MaterialConstants'; 

const Auth = props => {

    const classes = DefaultComponentsStyles();
    const {
        newAuthentication,
        updateGraph,
        info
    } = props;

    const [ graph, setGraph] = useState( props.graph );

    const deleteAuth = ( authId ) => {
        let temp = { ...props };
        temp.graph.authentication = temp.graph.authentication.filter(auth => auth.id !== authId);
        props.updateGraph(temp);
    }

    useEffect( () => {
        setGraph( props.graph );
    }, [props] );

    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                    <TableRow>
                        {authTableHeader.map( (header, i ) => {
                            return (
                                <TableCell
                                    align="center"
                                    key   = {`auth-table-header-${graph.id}-${i}`}
                                >
                                    { header.title }
                                </TableCell>
                            )
                        })}

                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {graph.authentication.map( ( auth, i ) => {
                        return (
                            <TableRow key={`auth-${graph.id}-${i}`}>
                                <TableCell align="center" >
                                <Select
                                    value       = { auth.allow }
                                    disabled    = { !auth.isEditable }
                                    className   = {classes.selectEmpty}
                                    inputProps  = { { 'aria-label': 'Without label' } }
                                    onChange    = { event => {
                                        graph.authentication[i].allow = event.target.value;
                                        updateGraph(graph);
                                    }}
                                    >
                                    {toAllow.map( ( allow ) => {
                                        return <MenuItem value={`${allow.value}`}>{allow.name}</MenuItem>
                                    }) }
                                </Select>
                                </TableCell>
                                <TableCell align="center">
                                    {(auth.allow === 'public' || auth.allow === 'private')? '' : (auth.allow === 'owner')?
                                        <Select
                                            value       = { auth.arg }
                                            disabled    = { !auth.isEditable }
                                            className   = {classes.selectEmpty}
                                            inputProps  = { { 'aria-label': 'Without label' } }
                                            onChange    = { event => {
                                                graph.authentication[i].arg = event.target.value;
                                                updateGraph(graph);
                                            }}
                                            >
                                            {graph.arguments.map( ( args ) => {
                                                return <MenuItem value={`${args.name}`}>{args.name}</MenuItem>
                                            }) }
                                        </Select>
                                    :
                                    <TextField 
                                        required 
                                        label           = "Required"
                                        defaultValue    = { auth.arg }
                                        disabled        = { !auth.isEditable }
                                        onChange        = { event => {
                                            graph.authentication[i].arg = event.target.value;
                                            updateGraph(graph);
                                        }}
                                    />
                                    }
                                </TableCell>
                                <TableCell align="center">
                                    <Switch 
                                        checked     = { auth.operations.create }
                                        disabled    = { !auth.isEditable }
                                        onClick     = { () => {
                                            graph.authentication[i].operations.create = !auth.operations.create;
                                            updateGraph(graph);
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <Switch 
                                        checked     = { auth.operations.update }
                                        disabled    = { !auth.isEditable }
                                        onClick     = { () => {
                                            graph.authentication[i].operations.update = !auth.operations.update;
                                            updateGraph(graph);
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <Switch 
                                        checked     = { auth.operations.delete }
                                        disabled    = { !auth.isEditable }
                                        onClick     = { () => {
                                            graph.authentication[i].operations.delete = !auth.operations.delete;
                                            updateGraph(graph);
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <Switch 
                                        checked     = { auth.operations.read }
                                        disabled    = { !auth.isEditable }
                                        onClick     = { () => {
                                            graph.authentication[i].operations.read = !auth.operations.read;
                                            updateGraph(graph);
                                        }}
                                    />
                                </TableCell>
                                <TableCell align="center">
                                    <IconButton 
                                            aria-label  = "edit" 
                                            className   = {classes.margin}
                                            onClick     = { () => {
                                                graph.authentication[i].isEditable = !auth.isEditable;
                                                updateGraph(graph);
                                            }}
                                        >
                                        {(auth.isEditable)? <SaveIcon/> : <EditIcon/>}
                                    </IconButton>
                                    <IconButton 
                                        aria-label  = "delete" 
                                        className   = {classes.margin}
                                        onClick = {() => {
                                            deleteAuth(auth.id);
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
                        newAuthentication(graph);
                    }}
                >
                    Auth
                </Button>
                <InfoButton info = {info} />
            </Box>
            </TableContainer>
        </React.Fragment>
    );
}

export default React.memo( Auth );