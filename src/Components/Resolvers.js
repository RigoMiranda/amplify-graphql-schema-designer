import React            from 'react';
import { makeStyles }   from '@material-ui/core/styles';
import Table            from '@material-ui/core/Table';
import TableBody        from '@material-ui/core/TableBody';
import TableCell        from '@material-ui/core/TableCell';
import TableContainer   from '@material-ui/core/TableContainer';
import TableHead        from '@material-ui/core/TableHead';
import TableRow         from '@material-ui/core/TableRow';
import Paper            from '@material-ui/core/Paper';
import Switch           from '@material-ui/core/Switch';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    box: {
        maxWidth: '200px',
        height: '60px'
    },
    button: {
        padding: '0px',
        maxWidth: '150px',
        maxHeight: '30px'
    }
});

const resolversData = [
    { 'name':'Queries' },
    { 'name':'Mutations' },
    { 'name':'Subscriptions' },
    { 'name':'Timestamps'  }
]

const Resolvers = props => {

    const classes                   = useStyles();
    const { graph , updateGraph }   = props;

    const updateResolver = resolver => {
        const currentValue = graph.resolvers[resolver.toLowerCase()]
        graph.resolvers[resolver.toLowerCase()] = !currentValue
        updateGraph(graph);
    }

    return (
        <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
            <TableHead>
                <TableRow>
                    {resolversData.map( ( r, i ) => {
                        return <TableCell align="center" key={`${graph.id}-${r.name}-${i}`}> {r.name} </TableCell> 
                    }) }
                </TableRow>
            </TableHead>
            <TableBody>
            <TableRow>
            {resolversData.map( ( r, i ) => {
                return (
                        <TableCell 
                            align = "center"
                            key   = {`resolvers-${r.name}-${graph.id}-${i}`}
                        >
                            <Switch 
                                checked     = { graph.resolvers[r.name.toLowerCase()] }
                                disabled    = { !graph.isEditable }
                                onChange = { () => {
                                    updateResolver(r.name);
                                }}
                            />
                        </TableCell>
                )
            })}
            </TableRow>
            </TableBody>
        </Table>
        </TableContainer>
    );
};

export default Resolvers;