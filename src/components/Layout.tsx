import React, { useContext, useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid';
import ItemContext, { ItemCtx } from '../context/ItemContext';
import { navigate } from "@reach/router";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import CssBaseline from '@material-ui/core/CssBaseline';
import AccountBoxTwoToneIcon from '@material-ui/icons/AccountBoxTwoTone';

interface Props {
    children: JSX.Element,
}

export default function Layout(props: Props) {
    const context: ItemCtx = useContext(ItemContext)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    useEffect(() => {
        checkTheme()
    }, [])
    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const logOut = () => {
        setAnchorEl(null);
        context.setToken("")
        navigate("/login")
    }
    const visitEdit = () => {
        setAnchorEl(null);
        navigate('/edit-profile')
    }
    const checkTheme = () => {
        const theme: any = localStorage.getItem("appTheme")
        theme && context.setTheme(theme)
    }
    const theme = React.useMemo(
        () =>
            createMuiTheme({
                palette: {
                    type: context.theme,
                }
            }),
        [context.theme],
    );
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AppBar position="static">
                <Toolbar style={{ justifyContent: "space-between" }}>
                    <Typography variant="h6">
                        Expenses App
                          </Typography>
                    <div style={{ display: "flex" }}>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={context.theme === "dark"}
                                    onChange={() => context.setTheme(context.theme === "light" ? 'dark' : "light")}
                                />
                            }
                            label="Dark Mode"
                        />
                        {context.isAuth && (
                            <React.Fragment>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <Avatar alt={context.user.name} src={context.user.image_url} />
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
                            </React.Fragment>
                        )}
                    </div>

                </Toolbar>
            </AppBar>
            <div className={context.theme === "dark" ? "App darkMode" : "App"}>

                <Grid container style={{ justifyContent: "center" }} spacing={2}>
                    <Grid item md={12} xs={12}>
                        {props.children}
                    </Grid>
                </Grid>
            </div>
        </ThemeProvider>)
}
