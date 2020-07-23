import React, { useState } from 'react';
import Grid  from '@material-ui/core/Grid';
import PersistentDrawerLeft from './UI/PersistentDrawerLeft'
import { 
    makeStyles,
    createMuiTheme,
    ThemeProvider
  } from '@material-ui/core/styles';

// Style
const useStyles = makeStyles((theme) => ({
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
// End Style

function App() {
  const [ themeColor, setThemeColor ]     = useState( false );
  const classes                           = useStyles();

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: themeColor ? 'dark' : 'light',
        },
      }),
    [themeColor],
  );

  return (
    <ThemeProvider theme={theme}>
    <div className={classes.root}>
      <Grid 
        container spacing={3}
      >
        <Grid className={classes.body} item xs={12}>
          <PersistentDrawerLeft
            themeColor      = { themeColor }
            setThemeColor   = { setThemeColor }
          />
        </Grid>
        {/* <Grid className={classes.footer} item xs={12}>
          <Container><p>@rmiranda_s 2020</p></Container>
        </Grid> */}
      </Grid>
    </div>
    </ThemeProvider>
  );
}

export default React.memo( App );