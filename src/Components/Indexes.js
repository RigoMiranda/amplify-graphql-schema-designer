import React, { useState } from 'react';
import Table            from '@material-ui/core/Table';
import TableBody        from '@material-ui/core/TableBody';
import TableCell        from '@material-ui/core/TableCell';
import TableContainer   from '@material-ui/core/TableContainer';
import TableHead        from '@material-ui/core/TableHead';
import TableRow         from '@material-ui/core/TableRow';
import Paper            from '@material-ui/core/Paper';
import TextField        from '@material-ui/core/TextField';
import Button           from '@material-ui/core/Button';
import IconButton       from '@material-ui/core/IconButton';
import Box              from '@material-ui/core/Box';
import DeleteIcon       from '@material-ui/icons/Delete';
import EditIcon         from '@material-ui/icons/Edit';
import SaveIcon         from '@material-ui/icons/Save';
import AddIcon          from '@material-ui/icons/Add';
import InfoButton       from './InfoButton';
import { DefaultComponentsStyles } from '../MaterialConstants'; 

const Indexes = props => {

    const classes = DefaultComponentsStyles();
    const {
        newIndex,
        updateGraph,
        graph,
        info
    } = props;

    let [ internal, setInternal ] = useState(graph);

    const deleteIndex = (indexId) => {
        let temp = { ...props };
        temp.graph.indexes = temp.graph.indexes.filter(index => index.id !== indexId);
        updateGraph(temp);
    }

    return (
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell align="center"> Fields </TableCell>
                <TableCell align="center"> Name </TableCell>
                <TableCell align="center"> Query Field </TableCell>
                <TableCell align="center"> Actions </TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {internal.indexes.map( ( index, i ) => {
                return (
                    <TableRow>
                        <TableCell>
                            <TextField 
                                required 
                                label           = "Required"
                                placeholder     = 'status, createdAt'
                                defaultValue    = { index.fields }
                                disabled        = { !index.isEditable }
                                onChange        = { event => {
                                    internal.indexes[i].fields = event.target.value;
                                    setInternal(internal);
                                }}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <TextField 
                                required 
                                label           = "Required"
                                placeholder     = 'byStatus'
                                defaultValue    = { index.name }
                                disabled        = { !index.isEditable }
                                onChange        = { event => {
                                    internal.indexes[i].name = event.target.value;
                                    setInternal(internal);
                                }}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <TextField 
                                required 
                                label           = "Required"
                                placeholder     = 'getByStatus'
                                defaultValue    = { index.queryField }
                                disabled        = { !index.isEditable }
                                onChange        = { event => {
                                    internal.indexes[i].queryField = event.target.value;
                                    setInternal(internal);
                                }}
                            />
                        </TableCell>
                        <TableCell align="center">
                            <IconButton 
                                    aria-label  = "delete" 
                                    className   = {classes.margin}
                                    onClick = {() => {
                                        internal.indexes[i].isEditable = !index.isEditable;
                                        updateGraph(internal);
                                    }}
                                >
                                {(index.isEditable)? <SaveIcon/> : <EditIcon/>}
                            </IconButton>
                            <IconButton 
                                aria-label  = "delete" 
                                className   = {classes.margin}
                                onClick = {() => {
                                    deleteIndex(index.id)
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
                    newIndex(graph);
                }}
            >
                Index
            </Button>
            <InfoButton info = {info} />
        </Box>
        </TableContainer>
    );
};

export default Indexes;