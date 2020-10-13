import React from 'react';
import Card from '../Card/Card';
import CardBody from '../Card/CardBody';
import CardHeader from '../Card/CardHeader';
import Table from "../../components/Table/Table";

type Props = {
    classes: any;
    color: string;
    tableHead: string[];
    tableData: any;
    title: any;
    category: any;
};

export default (props: Props) => (
    <Card>
        <CardHeader color={props.color}>
            <h4 className={props.classes.cardTitleWhite}>{props.title}</h4>
            <p className={props.classes.cardCategoryWhite}>
                {props.category}
            </p>
        </CardHeader>
        <CardBody>
            <Table
                tableHeaderColor={props.color}
                tableHead={props.tableHead}
                tableData={props.tableData}
            />
        </CardBody>
    </Card>
);
