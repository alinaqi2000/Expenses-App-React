import React, { useContext, useState, useEffect } from "react";
import List from "@material-ui/core/List";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { AddCircleTwoTone } from "@material-ui/icons";
import ItemContext, { ItemCtx } from "../../context/ItemContext";
import { Item as I } from '../../models/Item';
import CircularProgress from '@material-ui/core/CircularProgress';
import Item from './Item';
import axios, { AxiosResponse } from 'axios';
import { BASE_URL, ApiResponse } from '../../context/ItemProvider';
import { navigate } from "@reach/router";
import Avatar from '@material-ui/core/Avatar';
import AccountBoxTwoToneIcon from '@material-ui/icons/AccountBoxTwoTone';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import MoreVertTwoToneIcon from '@material-ui/icons/MoreVertTwoTone';

interface Props {
  classes: any;
}
export default function ItemsList(props: Props) {
  const context: ItemCtx = useContext(ItemContext)
  const [isLoading, setIsLoading] = useState(true)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    fetchItems()

  }, [])
  const verifyUser = async () => {
    const token = localStorage.getItem("authToken")
    if (!token)
      return navigate("/login")
    context.setToken(token)
    const resp: AxiosResponse<ApiResponse> = await axios.get<ApiResponse>(`${BASE_URL}verify_user?token=${token}`);
    return resp.data.status ? context.setUser(resp.data.success) : navigate("/login")
  }
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const fetchItems = () => {
    verifyUser().then(resp => {
      context.fetchItems()
      setTimeout(() => {
        setIsLoading(false)
      }, 1000);
    })
  }
  function handleOpen(): void {
    context.toggleDialog();
  }
  const logOut = () => {
    setAnchorEl(null);
    context.setToken("")
    navigate("/login")
  }
  const visitEdit = () => {
    setAnchorEl(null);
    navigate('/edit-profile')
  }
  return (
    <Card className={props.classes.root}>
      <CardContent>
        <div className="CardTop">
          <div className="portfolio">
            <div className="title">
              <Avatar alt={context.user.name} src={context.user.image_url} />
              <Typography gutterBottom variant="h5">
                {context.user.name}
                <span>
                  {context.user.email}
                </span>

              </Typography>
            </div>
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <MoreVertTwoToneIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={visitEdit}><AccountBoxTwoToneIcon /> Edit Profile</MenuItem>
                <MenuItem onClick={logOut}><ExitToAppTwoToneIcon /> Logout</MenuItem>
              </Menu>
            </div>

          </div>
          <div className="titles">
            <Typography gutterBottom variant="h6">
              Expenses List
          </Typography>
            <Button
              variant="contained"
              startIcon={<AddCircleTwoTone />}
              color="primary"
              onClick={handleOpen}
            >
              Add
          </Button>
          </div>
        </div>
        <List className={props.classes.list}>
          {
            isLoading ? <CircularProgress /> :
              !context.items.length ? <Typography gutterBottom variant="h6"> No items in the list.  </Typography> :
                context.items.map((item: I, i: number) => <Item key={item._id} index={i} item={item} />)
          }
        </List>
      </CardContent>
    </Card>
  );
}