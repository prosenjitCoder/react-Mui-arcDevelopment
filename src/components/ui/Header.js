import React, { useState, useEffect } from 'react';
// import material-ui components
import {
  AppBar,
  Toolbar,
  useScrollTrigger,
  Tabs,
  Tab,
  Button,
  Menu,
  MenuItem,
} from '@material-ui/core';
// import material-ui styles
import { makeStyles } from '@material-ui/core/styles';

// import material-ui icons
import { ArrowDropDown } from '@material-ui/icons';

// import react-router-dom components
import { Link } from 'react-router-dom';

// import assets
import logo from '../../assets/logo.svg';

// ElevationScroll effect
function ElevationScroll(props) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

// create custom styles
const useStyles = makeStyles((theme) => ({
  toolbarMargin: {
    ...theme.mixins.toolbar,
    marginBottom: '3em',
  },
  logo: {
    height: '8em',
  },
  logoContainer: {
    padding: 0,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  tabContainer: {
    marginLeft: 'auto',
  },
  tab: {
    ...theme.typography.tab,
    minWidth: 10,
    marginLeft: '25px',
  },
  button: {
    ...theme.typography.estimate,
    borderRadius: '50px',
    marginLeft: '50px',
    marginRight: '25px',
    height: '45px',
  },
  menu: {
    backgroundColor: theme.palette.common.blue,
    color: 'white',
    borderRadius: '0px',
  },
  menuItem: {
    ...theme.typography.tab,
    opacity: 0.7,
    '&:hover': {
      opacity: 1,
    },
  },
}));

const menuItemOptions = [
  {
    name: 'Services',
    link: '/services',
  },
  {
    name: 'Custom Software Development',
    link: '/customsoftware',
  },
  {
    name: 'Mobile App Development',
    link: '/mobileapps',
  },
  {
    name: 'Website Development',
    link: '/websites',
  },
];

const Header = () => {
  // generate classes for styles
  const classes = useStyles();

  // state
  const [value, setValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // change navigation
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const handleHover = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const handleClickListItem = (event, i) => {
    setSelectedIndex(i);
    setOpen(false);
    setAnchorEl(null);
  };
  // Hooks
  useEffect(() => {
    switch (window.location.pathname) {
      case '/':
        if (value !== 0) {
          setValue(0);
        }
        break;
      case '/services':
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(0);
        }
        break;
      case '/customsoftware':
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(1);
        }
        break;
      case '/mobileapps':
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(2);
        }
        break;
      case '/websites':
        if (value !== 1) {
          setValue(1);
          setSelectedIndex(3);
        }
        break;
      case '/revolution':
        if (value !== 2) {
          setValue(2);
        }
        break;
      case '/about':
        if (value !== 3) {
          setValue(3);
        }
        break;
      case '/contact':
        if (value !== 4) {
          setValue(4);
        }
        break;
      default:
        break;
    }
  }, [value]);

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position='fixed' color='primary'>
          <Toolbar disableGutters>
            <Button
              disableRipple
              component={Link}
              to='/'
              className={classes.logoContainer}
              onClick={() => setValue(0)}
            >
              <img className={classes.logo} alt='company logo' src={logo} />
            </Button>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor='primary'
              className={classes.tabContainer}
            >
              <Tab
                className={classes.tab}
                label='Home'
                component={Link}
                to='/'
              />
              <Tab
                onMouseOver={(event) => handleHover(event)}
                aria-owns='simple-menu'
                aria-haspopup='true'
                className={classes.tab}
                label={
                  <>
                    <div style={{ display: 'flex' }}>
                      Services{' '}
                      <ArrowDropDown
                        style={{ fontSize: '1.5rem', marginRight: '3px' }}
                      />
                    </div>
                  </>
                }
                component={Link}
                to='/services'
              />
              <Tab
                className={classes.tab}
                label='The Revolution'
                component={Link}
                to='/revolution'
              />
              <Tab
                className={classes.tab}
                label='About Us'
                component={Link}
                to='/about'
              />
              <Tab
                className={classes.tab}
                label='Contact Us'
                component={Link}
                to='/contact'
              />
            </Tabs>
            <Button
              variant='contained'
              color='secondary'
              className={classes.button}
              component={Link}
              to='/estimate'
            >
              Free Estimate
            </Button>
            {/* Dropdown menu start */}
            <Menu
              classes={{ paper: classes.menu }}
              id='simple-menu'
              anchorEl={anchorEl}
              open={open}
              MenuListProps={{ onMouseLeave: handleClose }}
              elevation={0}
            >
              {/* show submenu items */}
              {menuItemOptions.map((option, i) => (
                <MenuItem
                  key={option.name}
                  classes={{ root: classes.menuItem }}
                  component={Link}
                  to={option.link}
                  selected={i === selectedIndex && value === 1}
                  onClick={(event) => {
                    handleClickListItem(event, i);
                    setValue(1);
                  }}
                >
                  {option.name}
                </MenuItem>
              ))}
            </Menu>
            {/* Dropdown menu end */}
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      {/* fixing spacing issue of fixed appbar */}
      <div className={classes.toolbarMargin} />
    </React.Fragment>
  );
};

export default Header;
