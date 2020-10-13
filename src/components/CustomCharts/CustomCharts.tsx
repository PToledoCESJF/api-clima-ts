import React from 'react'
import ChartistGraph from "react-chartist";
import Card from '../Card/Card';
import CardBody from '../Card/CardBody';
import CardFooter from '../Card/CardFooter';
import CardHeader from '../Card/CardHeader';

type Props = {
    classes: any;
    color: string;
    data: any;
    type: "Bar" | "Line";
    title: string;
    category: string;
    iconFooter: any;
    txtRodape: string;
}

export default (props: Props) => (
    <Card chart={true}>
        <CardHeader color={props.color}>
        <ChartistGraph className="ct-chart" data={props.data} type={props.type} />
        </CardHeader>
        <CardBody>
            <h4 className={props.classes.cardTitle}>{props.title}</h4>
                <p className={props.classes.cardCategory}>
                    {props.category}
                </p>
        </CardBody>
        <CardFooter chart={true}>
            <div className={props.classes.stats}>
                {props.iconFooter}
                {props.txtRodape}
            </div>
        </CardFooter>
    </Card>
);
