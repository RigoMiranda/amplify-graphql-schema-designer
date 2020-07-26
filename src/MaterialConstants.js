import { makeStyles } from '@material-ui/core/styles';

export const AppStyle = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    sideBar: {
        height: '100vh',
        maxWidth: '100px',
        backgroundColor: 'red'
    },
    body: {
        height: '100vh',
        width: '100%'
    },
    footer: {
        height: '100px',
        width: '100%',
        backgroundColor: 'yellow'
    },
    graph: {
        padding: '15px',
    }
}));

export const DefaultComponentsStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    box: {
        width: '100%',
        height: '60px'
    },
    button: {
        maxWidth: '150px',
        maxHeight: '30px'
    }
});