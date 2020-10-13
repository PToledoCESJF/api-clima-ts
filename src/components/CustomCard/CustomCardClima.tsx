import React from 'react'
import ChartistGraph from "react-chartist";
import Card from '../Card/Card';
import CardBody from '../Card/CardBody';
import CardHeader from '../Card/CardHeader';


type Props = {
    classes: any;
    color: string;
    data: any;
    type: "Bar" | "Line";
    title?: string;
    category?: string;
    iconFooter?: any;
    txtRodape?: string;
    infoCardClima: React.ReactElement;

}

export default (props: Props) => (
    <Card>
        <CardHeader color={props.color} stats={true}>
            {props.infoCardClima}
            <ChartistGraph className="ct-chart" data={props.data} type={props.type} />
        </CardHeader>
        <CardBody>
            <h4 className={props.classes.cardTitle}>{props.title}</h4>
            <p className={props.classes.cardCategory}>
                {props.category}
            </p>
        </CardBody>
    </Card>
);