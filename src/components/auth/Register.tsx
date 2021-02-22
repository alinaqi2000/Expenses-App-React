import React, { useState, useEffect, useContext } from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from "@material-ui/core/Typography";
import { Link, navigate } from "@reach/router";
import Button from '@material-ui/core/Button';
import { BASE_URL, ApiResponse } from '../../context/ItemProvider';
import { useSnackbar } from 'notistack';
import axios, { AxiosResponse } from 'axios';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import AssignmentTurnedInTwoToneIcon from '@material-ui/icons/AssignmentTurnedInTwoTone';
import ItemContext, { ItemCtx } from "../../context/ItemContext";

interface RegisterForm {
    name: string
    email: string
    password: string
    image_url: string
}
interface Props {
    path: string
    classes: any
}
export default function Register(props: Props) {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const context: ItemCtx = useContext(ItemContext)

    const [form, setForm] = useState<RegisterForm>({ name: "", email: "", password: "", image_url: "" })
    const handleInputChange = (key: string, value: string) => {
        setForm({ ...form, [key]: value })
    }
    useEffect(() => {
        verifyUser()
    }, [])
    const verifyUser = async () => {
        const token = localStorage.getItem("authToken")
        if (token) {
            context.setToken(token)
            const resp: AxiosResponse<ApiResponse> = await axios.get<ApiResponse>(`${BASE_URL}verify_user?token=${token}`);
            if (resp.data.status) {
                context.setUser(resp.data.success)
                return navigate("/")
            }
        }
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
        const resp: AxiosResponse<ApiResponse> = await axios.post<ApiResponse>(`${BASE_URL}auth/register`, form);
        enqueueSnackbar(resp.data.message, { variant: resp.data.status ? 'success' : 'error', anchorOrigin: { vertical: 'bottom', horizontal: 'center', }, });
        return resp.data.status && navigate("/login")
    }
    return (
        <Grid container style={{ justifyContent: "center" }} spacing={2}>

            <Grid item md={3} xs={12}>
                <Card className={props.classes.root}>
                    <CardContent className="auth-card">
                        <div className="CardTop">
                            <div className="titles" style={{ justifyContent: "center" }}>
                                <Typography gutterBottom variant="h5">
                                    Register
                    </Typography>
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
                                        <TextField onChange={(e) => handleInputChange("name", e?.target.value)} label="Name" />
                                    </Grid>
                                </Grid>
                                <Grid container style={{ justifyContent: "center", margin: "10px 0px" }} spacing={1} alignItems="flex-end">
                                    <Grid item>
                                        <TextField type="email" onChange={(e) => handleInputChange("email", e?.target.value)} label="Email Address" />
                                    </Grid>
                                </Grid>
                                <Grid container style={{ justifyContent: "center", margin: "10px 0px" }} spacing={1} alignItems="flex-end">
                                    <Grid item>
                                        <TextField type="password" onChange={(e) => handleInputChange("password", e?.target.value)} label="Password" />
                                    </Grid>
                                </Grid>
                                <Grid container style={{ justifyContent: "center", margin: "10px 0px" }} spacing={1} alignItems="flex-end">
                                    <Grid item>
                                        <TextField onChange={(e) => handleInputChange("image_url", e?.target.value)} label="Profile Image Url" />
                                    </Grid>
                                </Grid>
                                <Grid container style={{ justifyContent: "center", margin: "10px 0px" }} spacing={1} alignItems="flex-end">
                                    <Typography gutterBottom variant="body1">
                                        Already registered? <Link to="/login">Login</Link>
                                    </Typography>
                                </Grid>
                                <Grid container style={{ justifyContent: "center", margin: "10px 0px" }} spacing={1} alignItems="flex-end">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<AssignmentTurnedInTwoToneIcon />}
                                        onClick={onSubmitForm}
                                    >
                                        Register
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
