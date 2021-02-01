import React, { useContext, useEffect } from 'react'
import ItemContext, { ItemCtx } from '../../context/ItemContext'
import Chart from 'react-apexcharts'
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
interface Props {
    classes: any
}
export default function ItemsChart(props: Props) {
    const context: ItemCtx = useContext(ItemContext)
    var series = [{
        name: "Expense($)",
        data: context.chartData.prices
    }]
    var options = {
        chart: {
            type: 'area',
            height: 350,
            zoom: {
                enabled: false
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            curve: 'smooth',
        },

        title: {
            text: `${context.user.name}'s Expenses Chart`,
            align: 'left'
        },
        labels: context.chartData.dates,
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            opposite: true
        },
        legend: {
            horizontalAlign: 'left'
        }
    }
    useEffect(() => {
        context.fetchChartData()
    }, [])


    return (
        <Card className={props.classes.root}>
            <CardContent>
                <Chart options={options} series={series} type="area" height={350} />
            </CardContent>
        </Card>
    )
}
