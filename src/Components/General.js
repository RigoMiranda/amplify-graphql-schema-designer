import React, { useState } from 'react';
import PrismaModal      from '../UI/PrismaModal';
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
import Box              from '@material-ui/core/Box';
import CodeIcon         from '@material-ui/icons/Code';
import DeleteIcon       from '@material-ui/icons/Delete';
import IconButton       from '@material-ui/core/IconButton';
import InfoButton       from './InfoButton';
import Tooltip          from '@material-ui/core/Tooltip';
import EditIcon         from '@material-ui/icons/Edit';
import SaveIcon         from '@material-ui/icons/Save';
import { DefaultComponentsStyles } from '../MaterialConstants'; 
import { graphTypes, generalTableRows, graphEnumRows } from '../Constants';

const General = props => {

    const classes = DefaultComponentsStyles();
    const [modalShow, setModalShow] = useState(false);
    const {
        removeGraph,
        updateGraph
    } = props;

    const [graph, setGraph] = useState( props.graph );
    const tableHeader = (graph.type === 'type')? generalTableRows : graphEnumRows;
    const [status, setStatus] = useState(false);

    const setGraphName = graph => {
        setStatus(!status);
        updateGraph(graph);
    }

    return (
    <React.Fragment>
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
            <TableRow>
                { tableHeader.map( row => {
                    return(
                        <TableCell 
                            align   = "center"
                            key     = {`general-table-header-${graph.id}-${Math.random().toString()}`}
                        >
                            {row.title}
                            {(row.info)? <InfoButton info = {row.info} /> : ''}
                        </TableCell>
                    )
                })}
            </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell 
                        align   = "center"
                        key     = {`general-table-row-${graph.id}-${Math.random().toString()}`}
                    >
                        <TextField 
                            required
                            error           = { !Boolean(graph.name) }
                            label           = "Required"
                            placeholder     = 'Name'
                            defaultValue    = { graph.name }
                            disabled        = { status }
                            onChange        = { event => {
                                    graph.name = event.target.value;
                                    setGraph(graph);
                            }}
                            InputProps={{
                                startAdornment: (
                                    <IconButton
                                        aria-label="delete"
                                        className={classes.margin}
                                        size="small"
                                        onClick={() => {
                                            if (graph.name !== '' ) {
                                                setGraphName(graph);
                                            }}
                                        }
                                    >
                                        {(status)? <EditIcon/> : <SaveIcon/> }
                                    </IconButton>
                                    )
                                }}
                        />
                    </TableCell>
                    <TableCell align="center">
                        <Select
                            value       = { graph.type }
                            disabled    = { !graph.isEditable }
                            className   = { classes.selectEmpty }
                            inputProps  = { { 'aria-label': 'Without label' } }
                            onChange    = { event => {
                                graph.type = event.target.value;
                                updateGraph(graph);
                            }}
                            >
                            {graphTypes.map( ( type ) => {
                                return(
                                    <MenuItem
                                        value   = {`${type.value}`}
                                        key     = {`general-menu-item-${graph.id}-${type.name}`}
                                    >
                                    {type.name}
                                    </MenuItem>
                                );
                            }) }
                        </Select>
                    </TableCell>
                    {(graph.type === 'type')?
                    <React.Fragment>
                        <TableCell align="center">
                            <Switch 
                                checked     = { graph.isTable }
                                disabled    = { !graph.isEditable }
                                onChange    = { () => {
                                    graph.isTable = !graph.isTable;
                                    updateGraph(graph);
                                }}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <Switch 
                                checked     = { graph.isSearchable }
                                disabled    = { !graph.isEditable }
                                onChange    = { () => {
                                    graph.isSearchable = !graph.isSearchable;
                                    updateGraph(graph);
                                }}
                            />
                        </TableCell>
                    </React.Fragment>
                    : ''}
                </TableRow>
            </TableBody>
        </Table>
        <Box m={2} className   = { classes.box }>
            <Tooltip title="Generate Schema">
            <IconButton 
                    aria-label  = "generate schema" 
                    className   = {classes.margin}
                    onClick = {() => {
                        setModalShow(true);
                    }}
                >
                <CodeIcon />
            </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
            <IconButton 
                    aria-label  = "delete" 
                    className   = {classes.margin}
                    onClick = {() => {
                        removeGraph(graph.id)
                    }}
                >
                <DeleteIcon />
            </IconButton>
            </Tooltip>
        </Box>
        </TableContainer>
        <PrismaModal
            graphName       = { `${graph.name} Schema` }
            graphCode       = { [graph] }
            modalShow       = { modalShow }
            setModalShow    = { setModalShow }
        />
    </React.Fragment>
    );
};

export default General;