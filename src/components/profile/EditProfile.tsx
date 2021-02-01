import React, { useState, useEffect, useContext } from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import { navigate } from "@reach/router";
import Button from '@material-ui/core/Button';
import { BASE_URL, ApiResponse } from '../../context/ItemProvider';
import { useSnackbar } from 'notistack';
import axios, { AxiosResponse } from 'axios';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import AssignmentTurnedInTwoToneIcon from '@material-ui/icons/AssignmentTurnedInTwoTone';
import ItemContext, { ItemCtx } from "../../context/ItemContext";
import Avatar from '@material-ui/core/Avatar';
import BackspaceTwoToneIcon from '@material-ui/icons/BackspaceTwoTone';
import { User } from '../../models/User'

interface Props {
    path: string
    classes: any
}
export default function EditProfile(props: Props) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const context: ItemCtx = useContext(ItemContext)

    const [form, setForm] = useState<User>(context.user)
    const handleInputChange = (key: string, value: string) => {
        setForm({ ...form, [key]: value })
    }
    useEffect(() => {
        verifyUser()
    }, [])
    const verifyUser = async () => {
        const token = localStorage.getItem("authToken")
        if (!token)
            return navigate("/login")
        context.setToken(token)
        const resp: AxiosResponse<ApiResponse> = await axios.get<ApiResponse>(`${BASE_URL}verify_user?token=${token}`);
        if (resp.data.status === "ok") {
            setForm(JSON.parse(resp.data.success))
            context.setUser(JSON.parse(resp.data.success))
        } else
            navigate("/login")
    }
    const onSubmitForm = async () => {
        if (!form.name)
            return enqueueSnackbar("Please add a name.", { variant: 'error', anchorOrigin: { vertical: 'bottom', horizontal: 'center', }, });
        if (!form.email)
            return enqueueSnackbar("Please add valid email address.", { variant: 'error', anchorOrigin: { vertical: 'bottom', horizontal: 'center', }, });
        if (!form.password)
            return enqueueSnackbar("Please add a password.", { variant: 'error', anchorOrigin: { vertical: 'bottom', horizontal: 'center', }, });
        // if (!form.image_url)
        // return enqueueSnackbar("Please add valid image url.", { variant: 'error', anchorOrigin: { vertical: 'bottom', horizontal: 'center', }, });
        const resp: AxiosResponse<ApiResponse> = await axios.put<ApiResponse>(`${BASE_URL}users`, form);
        enqueueSnackbar(resp.data.message, { variant: resp.data.status === "ok" ? 'success' : 'error', anchorOrigin: { vertical: 'bottom', horizontal: 'center', }, });
        resp.data.status === "ok" && context.setUser(form)
    }
    return (
        <Grid container style={{ justifyContent: "center" }} spacing={2}>

            <Grid item md={6} xs={12}>
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
                                <Button
                                    variant="contained"
                                    startIcon={<BackspaceTwoToneIcon />}
                                    color="primary"
                                    onClick={() => navigate("/")}
                                >
                                    Back
             </Button>

                            </div>
                        </div>
                        <form noValidate style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}>
                            <div style={{ margin: "10px 0px" }}>
                                <Grid container style={{ justifyContent: "center", margin: "10px 0px" }} spacing={1} alignItems="flex-end">
                                    <Grid item>
                                        <TextField value={form.name} onChange={(e) => handleInputChange("name", e?.target.value)} label="Name" />
                                    </Grid>
                                </Grid>
                                <Grid container style={{ justifyContent: "center", margin: "10px 0px" }} spacing={1} alignItems="flex-end">
                                    <Grid item>
                                        <TextField value={form.email} type="email" onChange={(e) => handleInputChange("email", e?.target.value)} label="Email Address" />
                                    </Grid>
                                </Grid>
                                <Grid container style={{ justifyContent: "center", margin: "10px 0px" }} spacing={1} alignItems="flex-end">
                                    <Grid item>
                                        <TextField value={form.password} type="password" onChange={(e) => handleInputChange("password", e?.target.value)} label="Password" />
                                    </Grid>
                                </Grid>
                                <Grid container style={{ justifyContent: "center", margin: "10px 0px" }} spacing={1} alignItems="flex-end">
                                    <Grid item>
                                        <TextField value={form.image_url} onChange={(e) => handleInputChange("image_url", e?.target.value)} label="Profile Image Url" />
                                    </Grid>
                                </Grid>
                                <Grid container style={{ justifyContent: "center", margin: "10px 0px" }} spacing={1} alignItems="flex-end">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<AssignmentTurnedInTwoToneIcon />}
                                        onClick={onSubmitForm}
                                    >
                                        Update Profile
                        </Button>
                                </Grid>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}
