import React, { useState } from 'react';
import { makeStyles }   from '@material-ui/core/styles';
import InfoIcon         from '@material-ui/icons/Info';
import Popover          from "@material-ui/core/Popover";
import IconButton       from '@material-ui/core/IconButton';
import Typography       from "@material-ui/core/Typography";
import Link             from '@material-ui/core/Link';


const useStyles = makeStyles(theme => ({
    popover: {
        // pointerEvents: "none"
    },
    paper: {
        padding: theme.spacing(1),
        maxWidth: '25%'
    },
    typography: {
        pointerEvents: "true",
        padding: theme.spacing(2)
    },
    links: {
        width: '100%'
    }
}));

const InfoButton = React.memo( props => {

    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const handlePopoverOpen = event => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    
    return (
        <React.Fragment>
        <IconButton 
            aria-label   = "info-button" 
            className    = {classes.margin}
            variant      = "contained"
            // onMouseEnter = {handlePopoverOpen}
            // onMouseLeave = {() => setTimeout(handleClose, 600) }
            onClick      = { handlePopoverOpen }
        >
            <InfoIcon />
        </IconButton>
        <Popover
                id          = {(Boolean(anchorEl)) ? 'simple-popover' : undefined}
                open        = { Boolean(anchorEl) }
                anchorEl    = { anchorEl }
                onClose     = { handleClose }
                className   = {classes.popover}
                classes={{
                    paper: classes.paper
                }}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center"
                }}
            >
                <Typography className={classes.typography}>
                    { props.info.text}
                </Typography>
                <Link
                        fullWidth
                        className={classes.links}
                        href= '#'
                        onClick={() => {
                            var win = window.open(props.info.url, '_blank');
                            win.focus();
                        }}
                        >
                        Read More
                    </Link>
            </Popover>
        </React.Fragment>
    );

});

export default InfoButton;