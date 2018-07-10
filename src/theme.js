import {createMuiTheme} from '@material-ui/core/styles';

const currentTheme = {
  type: 'light',
  backgroundColor: '#fafafa',

  setTheme(type, backgroundColor) {
    console.log(`current theme ${type}`);

    this.type = type;
    this.backgroundColor = backgroundColor;
  }
};

(() => {
  const currentHour = new Date('AM').getHours();

  if (currentHour > 7 && currentHour < 19) {
    currentTheme.setTheme('light', '#fafafa');
  } else {
    currentTheme.setTheme('dark', '#303030');
  }

  document.body.style.backgroundColor = currentTheme.backgroundColor;
})();

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    type: currentTheme.type,
  },
});

export default muiTheme;