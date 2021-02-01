import React, { useContext } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import DialogTitle from '@material-ui/core/DialogTitle';
import ItemContext, { ItemCtx } from '../../context/ItemContext';
import TextField from '@material-ui/core/TextField';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { AddCircleTwoTone } from '@material-ui/icons';
import SaveTwoToneIcon from '@material-ui/icons/SaveTwoTone';
import moment from 'moment';
import { Item } from '../../models/Item';
import { useSnackbar } from 'notistack';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';

interface Props {
    classes: any
}
export default function AddItemDialog(props: Props) {
    const context: ItemCtx = useContext(ItemContext)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const onSubmitForm = () => {
        if (!context.currentItem.title)
            return enqueueSnackbar("Please add item title.", { variant: 'error', anchorOrigin: { vertical: 'bottom', horizontal: 'center', }, });
        if (!+context.currentItem.amount)
            return enqueueSnackbar("Please add valid amount.", { variant: 'error', anchorOrigin: { vertical: 'bottom', horizontal: 'center', }, });
        var item: Item
        if (context.currentIndex === -1)
            item = new Item("", context.user.id, context.currentItem.title, context.currentItem.amount, moment(context.currentItem.date).format("MMM DD, YYYY"))
        else
            item = new Item(context.currentItem.id, context.currentItem.user_id, context.currentItem.title, context.currentItem.amount, moment(context.currentItem.date).format("MMM DD, YYYY"))

        context.addItem(item).then((resp: any) => {
            enqueueSnackbar(resp.message, { variant: resp.status === "bad" ? 'error' : 'success', anchorOrigin: { vertical: 'bottom', horizontal: 'center', }, });
            resp.status !== "bad" && context.fetchChartData()
        })
    }
    return (
        <Dialog
            fullWidth={true}
            maxWidth="xs"
            open={context.dialogOpen}
            onClose={context.toggleDialog}
            aria-labelledby="max-width-dialog-title"
        >
            <DialogTitle id="max-width-dialog-title" style={{ textAlign: "center" }}>  {context.currentIndex === -1 ? 'Add' : 'Update'} Item</DialogTitle>
            <DialogContent>
                <form noValidate style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <div style={{ margin: "10px 0px" }}>
                        <Grid container style={{ justifyContent: "center" }} spacing={1} alignItems="flex-end">

                            <Grid item>
                                <TextField value={context.currentItem.title} onChange={(e) => context.handleInputChange("title", e?.target.value)} label="Title" />
                            </Grid>
                        </Grid>
                    </div>
                    <div style={{ margin: "10px 0px" }}>
                        <FormControl fullWidth>
                            <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
                            <Input
                                id="standard-adornment-amount"
                                onInput={(e: any) => {
                                    if (e.target.value)
                                        e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 2)
                                }}
                                type="number"
                                value={context.currentItem.amount}
                                onChange={(e) => context.handleInputChange("amount", e?.target.value)}
                                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                            />
                        </FormControl>
                        {/* <Grid container style={{ justifyContent: "center" }} spacing={1} alignItems="flex-end">

                            <Grid item>
                                <TextField type="number" value={context.currentItem.amount} onChange={(e) => context.handleInputChange("amount", e?.target.value)} label="Amount" />
                            </Grid>
                        </Grid> */}
                    </div>

                    <div style={{ margin: "10px 0px" }}>
                        <Grid container style={{ justifyContent: "center" }} spacing={1} alignItems="flex-end">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>

                                <KeyboardDatePicker
                                    margin="normal"
                                    InputProps={{ readOnly: true }}
                                    id="date-picker-dialog"
                                    label="Select Date"
                                    format="MMM dd, yyyy"
                                    value={context.currentItem.date}
                                    onChange={(value) => context.handleInputChange("date", value)}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </MuiPickersUtilsProvider>

                        </Grid>
                    </div>
                    <div>

                    </div>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={context.toggleDialog} color="primary">
                    Close
                </Button>
                <Button
                    variant="contained"
                    startIcon={context.currentIndex === -1 ? <AddCircleTwoTone /> : <SaveTwoToneIcon />}
                    color="primary"
                    onClick={onSubmitForm}
                >
                    {context.currentIndex === -1 ? 'Add' : 'Update'}
                </Button>
            </DialogActions>
        </Dialog>

    )
}
