import React from 'react'
import Card from '../Card/Card';
import CardFooter from '../Card/CardFooter';
import CardHeader from '../Card/CardHeader';
import CardIcon from '../Card/CardIcon';

type Props = {
    classes: any;
    color: "primary" | "info" | "success" | "danger" | "warning";
    iconHeader: any;
    titleHeader: string;
    dataHeader: any;
    tipoHeader?: string;
    iconFooter: React.ReactElement;
    dataFooter: any;
}

export default (props: Props) => (
    <Card>
        <CardHeader color={props.color} stats={true} icon={true}>
            <CardIcon color={props.color}>
                {props.iconHeader}
            </CardIcon>
            <p className={props.classes.cardCategory}>
                {props.titleHeader}
            </p>
            <h3 className={props.classes.cardTitle}>
                {props.dataHeader}
                <small>{props.tipoHeader}</small>
            </h3>
        </CardHeader>
        <CardFooter stats={true}>
            <div className={props.classes.statsFooter}>
                {props.iconFooter}
                {props.dataFooter}
            </div>
        </CardFooter>
    </Card>
);