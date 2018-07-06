import {createMuiTheme} from '@material-ui/core/styles';

const toggleTheme = {
  type: 'light',
  backgroundColor: '#fafafa',

  dark() {
    this.type = 'dark';
    this.backgroundColor = '#303030';
  },

  light() {
    this.type = 'light';
    this.backgroundColor = '#fafafa';

  }
};

document.body.style.backgroundColor = toggleTheme.backgroundColor;

const muiTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    type: toggleTheme.type,
  },
});

export default muiTheme;