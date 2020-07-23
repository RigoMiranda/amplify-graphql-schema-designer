import React, { useState, useCallback } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import clsx             from 'clsx';
import Drawer           from '@material-ui/core/Drawer';
import Grid             from '@material-ui/core/Grid';
import CssBaseline      from '@material-ui/core/CssBaseline';
import AppBar           from '@material-ui/core/AppBar';
import Toolbar          from '@material-ui/core/Toolbar';
import List             from '@material-ui/core/List';
import ListSubheader    from '@material-ui/core/ListSubheader';
import Typography       from '@material-ui/core/Typography';
import Divider          from '@material-ui/core/Divider';
import ListItem         from '@material-ui/core/ListItem';
import IconButton       from '@material-ui/core/IconButton';
import ListItemIcon     from '@material-ui/core/ListItemIcon';
import ListItemText     from '@material-ui/core/ListItemText';
import Switch           from '@material-ui/core/Switch';
import AddGraph         from '@material-ui/icons/AddCircle';
import CodeIcon         from '@material-ui/icons/Code';
import MenuIcon         from '@material-ui/icons/Menu';
import ChevronLeftIcon  from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Light            from '@material-ui/icons/Brightness7';
import Night            from '@material-ui/icons/Brightness2';
import Graph            from '../Components/Graph';
import EnumGraph        from '../Components/EnumGraph';
import PrismaModal      from './PrismaModal';
import { 
    defaultTypes,
    defaultGraph,
    defaultArgument, 
    defaultIndex,
    defaultConnection,
    defaultAuthentication 
} from '../Constants';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    }));

const PersistentDrawerLeft = props => {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);

    const { 
        themeColor,
        setThemeColor
    } = props;

    const [ graphs, setGraphs ]             = useState( [] );
    const [ typesGraphs,  setTypesGraphs ]  = useState( defaultTypes );
    const [ modalShow, setModalShow ]       = useState( false );

    const handleDrawerOpen = useCallback( () => {
        setOpen(true);
    }, [] );

    const handleDrawerClose = useCallback( () => {
        setOpen(false);
    }, [] );

    const newGraph = useCallback( () => {
        let tempGraphs = [...graphs];
        tempGraphs.push(defaultGraph(Math.random().toString(), Math.random().toString()) );
        setGraphs(tempGraphs);
    }, [graphs] );

    const removeGraph = useCallback( (graphId) => {
        setGraphs(prevGraph =>
            prevGraph.filter(graph => graph.id !== graphId)
        );
    }, [] );

    const updateGraph = useCallback( (graph) => {
        setGraphs(prevArguments =>
            prevArguments.map(obj => [graph].find(o => o.id === obj.id) || obj)
        );
    }, [] );

    const newArgument = useCallback( (graph) => {
        let temp = {...graph}
        temp.arguments.push({...defaultArgument(Math.random().toString())})
        setGraphs(prevGraphs =>
            prevGraphs.map(obj => [temp].find(o => o.id === obj.id) || obj)
        );
    }, [] );

    const newAuthentication = useCallback( (graph) => {
        let temp = {...graph}
        temp.authentication.push({...defaultAuthentication(Math.random().toString())})
        setGraphs(prevGraphs =>
            prevGraphs.map(obj => [temp].find(o => o.id === obj.id) || obj)
        );
    }, [] );

    const newIndex = useCallback( (graph) => {
        let temp = {...graph}
        temp.indexes.push({...defaultIndex(Math.random().toString())})
        setGraphs(prevGraphs =>
            prevGraphs.map(obj => [temp].find(o => o.id === obj.id) || obj)
        );
    }, [] );

    const newConnection = useCallback( (graph) => {
        let temp = {...graph}
        temp.connections.push({...defaultConnection(Math.random().toString())})
        setGraphs(prevGraphs =>
            prevGraphs.map(obj => [temp].find(o => o.id === obj.id) || obj)
        );
    }, [] );

    const generateSchema = useCallback( () => {
        if (graphs.length > 0){
            setModalShow( true );
        }
    }, [graphs] );
    

    return (
        <div className={classes.root}>
        <CssBaseline />
        <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
            })}
        >
            <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, open && classes.hide)}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
                GraphQL Schema Designer
            </Typography>
            </Toolbar>
        </AppBar>
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={open}
            classes={{
            paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            </div>

            <Divider />
            <div className={classes.drawerHeader}>
            <Typography component="div">
                <Grid component="label" container alignItems="center" spacing={1}>
                <Light />
                <Grid item>
                    <Switch checked={ themeColor } onClick={event => setThemeColor(!themeColor)} name="checkedA" />
                </Grid>
                <Night/>
                </Grid>
            </Typography>
            </div>
            <Divider />
            <Divider />
            <List>
            <ListItem 
                button 
                key     ={'New Graph'}
                onClick = {newGraph}
            >
                <ListItemIcon>{<AddGraph />}</ListItemIcon>
                <ListItemText primary={'New Graph'} />
            </ListItem>
            <ListItem 
                button
                key={'Generate Schema'}
                onClick = {generateSchema}
            >
                <ListItemIcon>{<CodeIcon />}</ListItemIcon>
                <ListItemText primary={'Generate Schema'} />
            </ListItem>
            </List>
            <Divider />
            <List
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Load Schemas
                    </ListSubheader>
                }
            >
            {['Todo App', 'Chat App'].map((text, index) => (
                <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <AddGraph /> : <CodeIcon />}</ListItemIcon>
                <ListItemText primary={text} />
                </ListItem>
            ))}
            </List>
        </Drawer>
        <main
            className={clsx(classes.content, {
            [classes.contentShift]: open,
            })}
        >
            <div className={classes.drawerHeader} />
            <Grid 
                container spacing={4}
            >
                {graphs.map( (graph, i ) => {
                    return(
                        <Grid
                            item
                            xs          = {6}
                            className   = {classes.body}
                            key         = {`drawer-header-grid-${graph.id}-${i}`}
                        >
                            {(graph.type !== 'enum')?
                                <Graph
                                    graph               = { graph }
                                    graphs              = { graphs }
                                    removeGraph         = { removeGraph }
                                    updateGraph         = { updateGraph }
                                    newArgument         = { newArgument }
                                    newAuthentication   = { newAuthentication }
                                    newIndex            = { newIndex }
                                    newConnection       = { newConnection }
                                    key                 = { `graph-type-${graph.id}-${i}` }
                                    typesGraphs         = { typesGraphs }
                                    setTypesGraphs      = { setTypesGraphs }
                                    { ...props }
                                />
                                :
                                <EnumGraph
                                    graph           = { graph }
                                    removeGraph     = { removeGraph }
                                    updateGraph     = { updateGraph }
                                    newArgument     = { newArgument }
                                    key             = { `graph-enum-${graph.id}-${i}` }
                                    { ...props }
                                />
                            }
                        </Grid>
                    )
                })}
            </Grid>
        </main>
        {(!modalShow)? '' :
            <PrismaModal
                graphName       = 'GraphQL Schema'
                graphCode       = { graphs }
                modalShow       = { modalShow }
                setModalShow    = { setModalShow }
            />
        }
        </div>
    );
}

export default React.memo( PersistentDrawerLeft );