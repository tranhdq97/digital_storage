import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useState } from 'react';
import { makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  menuItem: {
    display: 'flex',
    alignItems: 'center', // Center vertically
    justifyContent: 'center', // Center horizontally
    '&:hover': {
      backgroundColor: 'grey', // Change the background color on hover
      color: 'white', // Change the text color on hover
    },
    paddingRight: '10px',
    paddingLeft: '5px', // Add padding to create space around the text
    borderRadius: '4px', // Add rounded corners to the menu item
    cursor: 'pointer',
    transition: 'background-color 0.3s', // Smooth transition on hover
  },
}));

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const classes = useStyles(); // Initialize the styles

  const handleClick = (event) => {
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickAllFile = () => {
    navigate('/ho-so');
  }
  const MENU = [
    { title: 'Tất cả hồ sơ', link: '/', onClick: handleClickAllFile },
    { title: 'Hồ sơ mới', link: '/', onClick: handleClick },
    { title: 'Cơ quan ban hành', link: '/', onClick: handleClick },
  ];

  return (
    <div className='flex justify-left pb-4 px-[24px]'>
      {MENU.map((item, index) => {
        return (
          <div key={index} className={`pr-[24px] ${classes.menuItem}`}>
            <div
              aria-controls={open ? 'demo-positioned-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={item.onClick}
              className={classes.menuItem}
            >
              <span style={{ fontWeight: 'bold' }}>{item.title}</span>
            </div>
            <Menu
              aria-labelledby="demo-positioned-button"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
            >
              {/* Add MenuItems here */}
            </Menu>
          </div>
        );
      })}
    </div>
  );
};

export default Navbar;
