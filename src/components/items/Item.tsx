import React, { useContext } from 'react'
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { Item as I } from '../../models/Item';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Typography from "@material-ui/core/Typography";
import ItemContext, { ItemCtx } from "../../context/ItemContext";
import { useSnackbar } from 'notistack';
import { ApiResponse } from '../../context/ItemProvider';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';
import DeleteTwoToneIcon from '@material-ui/icons/DeleteTwoTone';

interface Props {
    item: I
    index: number
}
export default function Item(props: Props) {
    const context: ItemCtx = useContext(ItemContext)
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const deleteItem = () => {
        context.deleteItem(props.index).then((resp: ApiResponse) => {
            enqueueSnackbar(resp.message, { variant: resp.status === "ok" ? 'success' : 'error', anchorOrigin: { vertical: 'bottom', horizontal: 'center', }, });
            resp.status === "ok" && context.fetchChartData()

        })
    }
    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    {/* <ImageIcon /> */}
                    <Typography gutterBottom variant="h5">
                        ${props.item.amount}
                    </Typography>
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={props.item.title} secondary={props.item.date} />
            <ListItemSecondaryAction>
                <IconButton onClick={() => context.setItem(props.item, props.index)} edge="end" aria-label="delete">
                    <EditTwoToneIcon />
                </IconButton>
                <IconButton onClick={deleteItem} edge="end" aria-label="delete">
                    <DeleteTwoToneIcon />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}
