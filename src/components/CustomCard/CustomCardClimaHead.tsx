import React from 'react'
import CardIcon from '../Card/CardIcon';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';


type Props = {
    classes: any;
    city: any;
    date: string;
    weather: any;
    iconHeader: React.ReactElement;
    temp: any;
    colorIcon?: string;
    btnCharts: React.ReactElement;
}

export default (props: Props) => (
    <div>
        <GridContainer>
            <GridItem xs={12} sm={12} md={6}>
                <p>
                    <h2> {props.city}</h2>
                    <h4> {props.date}</h4>
                    <h4> {props.weather}</h4>
                </p>
            </GridItem>
            <GridItem xs={12} sm={12} md={6}>
                    <h1>
                        <CardIcon colorIcon={!props.classes.color}>{props.iconHeader}
                            {props.temp}<small>°C</small>
                        </CardIcon>
                    </h1>
            </GridItem>
            <GridItem xs={12} sm={12} md={12} stats={true}>
                {props.btnCharts}
            </GridItem>
        </GridContainer>
    </div>
);
