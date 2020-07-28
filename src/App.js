import React, { useState }  from 'react';
import Grid                 from '@material-ui/core/Grid';
import PersistentDrawerLeft from './UI/PersistentDrawerLeft';
import { AppStyle }         from './MaterialConstants';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

function App() {
  const [ themeColor, setThemeColor ] = useState( false );
  const classes                       = AppStyle();

  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: themeColor ? 'dark' : 'light',
          primary: {
            light: '#ff9900',
            main: '#ff9900',
            dark:'#ff9900',
            contrastText: '#ffffff',
          },
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

export default App;