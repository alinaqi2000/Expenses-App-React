import React, { useContext } from 'react'
import ItemsList from './ItemsList';
import AddItemDialog from './AddItemDialog';
import ItemsChart from "./ItemsChart";
import Grid from '@material-ui/core/Grid';
import ItemContext, { ItemCtx } from '../../context/ItemContext';

interface Props {
    classes: any
    path: string
}
export default function ItemsMain(props: Props) {
    const context: ItemCtx = useContext(ItemContext)

    return (
        <Grid container className="main-cont" style={{ justifyContent: "center" }} spacing={2}>

            <Grid item md={7} xs={12}>
                <ItemsList classes={props.classes} />
                <AddItemDialog classes={props.classes} />
            </Grid>
            {
                context.items.length > 1 ?
                    <Grid item md={5} xs={12}>
                        <ItemsChart classes={props.classes} />
                    </Grid> : null
            }

        </Grid>
    )
}
