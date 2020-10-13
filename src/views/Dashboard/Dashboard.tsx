import React from "react";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import DateRange from "@material-ui/icons/DateRange";
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import WavesIcon from '@material-ui/icons/Waves';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import CloudIcon from '@material-ui/icons/Cloud';
import CloudQueueIcon from '@material-ui/icons/CloudQueue';
import OpacityIcon from '@material-ui/icons/Opacity';
// core components
import GridItem from "../../components/Grid/GridItem";
import GridContainer from "../../components/Grid/GridContainer";
import Button from '../../components/CustomButtons/Button';
import CustomCard from '../../components/CustomCard/CustomCard';
import CustomCharts from '../../components/CustomCharts/CustomCharts';
import CustomCardClima from '../../components/CustomCard/CustomCardClima'
import CustomCardClimaHead from '../../components/CustomCard/CustomCardClimaHead';
import CustomTable from '../../components/CustomTable/CustomTable';
// data-fns
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';
// Cards
import { Card } from "@material-ui/core";
import CardBody from "../../components/Card/CardBody";
import CardFooter from "../../components/Card/CardFooter";
// TextField
import TextField from '@material-ui/core/TextField';

import dashboardStyle from "../../assets/jss/material-dashboard-react/views/dashboardStyle";

type APIResponse = {
  name: string;
  coord: {
    dt: number;
  }
  sys: {
    sunrise: number;
    sunset: number;
  }
  main: {
    humidity: number;
    temp: number;
  }
  wind: {
    speed: number;
  }
  weather: Array<{
    description: string;
  }>
}

type APIForecastResponse = {
  list: Array<{
    dt: number;
    main: {
      feels_like: number;
      temp: number;
      humidity: number;
    }
    wind: {
      speed: number;
    }
    weather: Array<{
      description: string;
    }>
  }>
}

type ChartCard = {
  labels: string[];
  series: number[][];
}

type TableResponse = {
  tableHead: string[];
  tableData: any[];
}

interface Props {
  classes: any;
}

interface State {
  apiResponse?: APIResponse;
  apiForecastResponse?: APIForecastResponse;
  loading: boolean;
  tempChart: ChartCard;
  humidityChart: ChartCard;
  windChart: ChartCard;
  tempXHumidityChart: ChartCard;
  chartCard: ChartCard;
  tableResponse: TableResponse;
  key: string;
  city: string;
  iconWeather?: any;
}

class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      tempChart: { labels: [], series: [] },
      humidityChart: { labels: [], series: [] },
      windChart: { labels: [], series: [] },
      tempXHumidityChart: { labels: [], series: [] },
      chartCard: { labels: [], series: [] },
      tableResponse: { tableHead: [], tableData: [] },
      key: "224349e3f6cf069ee2486e1b1260ebc5",
      city: "Lima Duarte",
    };
    this.handleChangeCity = this.handleChangeCity.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.converteData = this.converteData.bind(this);
    this.sunriseSunset = this.sunriseSunset.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.handleChangeApi(this.state.city);
    this.handleChangeApiForecast(this.state.city);
    this.setState({ loading: false });
  }

  handleChangeApi(city: string) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.state.key}&lang=pt&units=metric`;
    fetch(url)
      .then((response) => response.json())
      .then((response: APIResponse) => {
        let iconWeather: any;
        if (response.sys.sunrise) {
          const agora = this.converteData(new Date(), "HH:mm");
          const por = this.converteData((response.sys.sunset * 1000), "HH:mm");
          const clima: string = response.weather[0].description;
          if (clima.indexOf('quebrad') > -1 || clima.indexOf('disper') > -1) iconWeather = <CloudQueueIcon />;
          else if (clima.indexOf('nublad') > -1 || clima.indexOf('carregad') > -1 || clima.indexOf('névoa') > -1) iconWeather = <CloudIcon />;
          else if (clima.indexOf('chuv') > -1) iconWeather = <OpacityIcon />;
          else if (agora > por) iconWeather = <Brightness2Icon />;
          else if (agora <= por)  iconWeather = <WbSunnyIcon />;
        }

        this.setState({ apiResponse: response, iconWeather })
      });
  }

  handleChangeApiForecast(city: string) {
    const urlForecast = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.state.key}&lang=pt&units=metric`;
    fetch(urlForecast)
      .then((response) => response.json())
      .then((response: APIForecastResponse) => {
        const listTable = response.list;
        const list = response.list.slice(0, 9);
        let tempChart = {
          labels: list.map((item) => this.converteData((item.dt * 1000), "HH'h'")),
          series: [list.map((item) => item.main.temp)],
        };
        let humidityChart = {
          labels: list.map((item) => this.converteData((item.dt * 1000), "HH'h'")),
          series: [list.map((item) => item.main.humidity)],
        };
        let windChart = {
          labels: list.map((item) => this.converteData((item.dt * 1000), "HH'h'")),
          series: [list.map((item) => item.wind.speed)],
        };
        let tempXHumidityChart = {
          labels: list.map((item) => this.converteData((item.dt * 1000), "HH'h'")),
          series: [
            list.map((item) => item.main.temp),
            list.map((item) => item.main.humidity)],
        };
        let tableResponse = {
          tableHead: ["Data", "Horas", "Temperatura", "Sensação térmica", "Umidade do ar", "Velocidade do vento", "Clima"],
          tableData: listTable.map((item) => [
            this.converteData((item.dt * 1000), "dd 'de' MMMM"),
            this.converteData((item.dt * 1000), "HH:mm"),
            item.main.temp,
            item.main.feels_like,
            item.main.humidity,
            item.wind.speed,
            item.weather[0].description
          ])
        };
        let chartCard = tempChart;
        this.setState({ tempChart, humidityChart, windChart, tempXHumidityChart, tableResponse, chartCard })
      });
  }

  handleChangeCity = (event: any) => {
    this.setState({ city: event.target.value });
  }

  handleSubmit = (event: any) => {
    event.preventDefault();
    this.setState({ loading: true });
    this.handleChangeApi(this.state.city);
    this.handleChangeApiForecast(this.state.city);
    this.setState({ loading: false });
  }

  converteData = (data: any, formato: string): string => {
    return format(new Date(data), formato, { locale: pt });
  }

  sunriseSunset = (data: any) => {
    if (data)
      return this.converteData((data * 1000), "HH:mm'h'");
  }

  handleChartTemp = (event: any) => {
    event.preventDefault();
    this.setState({ loading: true })
    let chartCard = this.state.tempChart;
    this.setState({ chartCard, loading: false });
  }

  handleChartHumidity = (event: any) => {
    event.preventDefault();
    this.setState({ loading: true })
    let chartCard = this.state.humidityChart;
    this.setState({ chartCard, loading: false });
  }

  handleChartWind = (event: any) => {
    event.preventDefault();
    this.setState({ loading: true })
    let chartCard = this.state.windChart;
    this.setState({ chartCard, loading: false });
  }

  handleChartTempXHumidity = (event: any) => {
    event.preventDefault();
    this.setState({ loading: true })
    let chartCard = this.state.tempXHumidityChart;
    this.setState({ chartCard, loading: false });
  }

  render() {
    const { classes } = this.props;
    const { city } = this.state;

    if (this.state.loading) {
      return <div className="div">Carregando...</div>;
    }

    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
              <Card>
                <CardBody>
                  <TextField id="city" label="Cidade" fullWidth defaultValue={city} onChange={this.handleChangeCity} />
                </CardBody>
                <CardFooter>
                  <Button type="submit" variant="contained" color="success" className={classes.submit} >
                    <SearchOutlinedIcon />
                      Pesquisa por cidade
                    </Button>
                </CardFooter>
              </Card>
            </form>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <CustomCardClima {...this.props} color={"primary"}
              data={this.state.chartCard} type={"Line"}
              infoCardClima={<CustomCardClimaHead {...this.props}
                city={this.state.apiResponse?.name}
                date={this.converteData(new Date(), "EEEE, dd 'de' MMMM', ' HH:mm'h'")}
                weather={this.state.apiResponse?.weather[0].description}
                iconHeader={this.state.iconWeather}
                temp={this.state.apiResponse?.main.temp}
                btnCharts={
                  <form className={classes.root} noValidate autoComplete="off">
                    <Button type="submit" variant="contained" color="info" onClick={this.handleChartTemp} className={classes.submit}>Temperatura</Button>
                    <Button type="submit" variant="contained" color="info" onClick={this.handleChartHumidity} className={classes.submit}>Umidade</Button>
                    <Button type="submit" variant="contained" color="info" onClick={this.handleChartWind} className={classes.submit}>Vento</Button>
                    <Button type="submit" variant="contained" color="info" onClick={this.handleChartTempXHumidity} className={classes.submit}>Temp X Umidade</Button>
                  </form>}
              />}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <GridContainer>
              <GridItem xs={12} sm={6} md={6}>
                <CustomCard {...this.props} color="danger" iconHeader={<WhatshotIcon />} titleHeader={"Temperatura"}
                  dataHeader={this.state.apiResponse?.main.temp} tipoHeader={"°C"} iconFooter={<DateRange />}
                  dataFooter={`${this.state.apiResponse?.name} - ${this.converteData(new Date(), "dd 'de' MMMM', ' HH:mm'h'")}`} />
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                <CustomCard {...this.props} color="primary" iconHeader={<BeachAccessIcon />} titleHeader={"Umidade relativa do ar"}
                  dataHeader={this.state.apiResponse?.main.humidity} tipoHeader={"%"} iconFooter={<BeachAccessIcon />}
                  dataFooter={"Percentual de umidade do ar"} />
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                <CustomCard {...this.props} color="warning" iconHeader={<WavesIcon />} titleHeader={"Velocidade do vento"}
                  dataHeader={this.state.apiResponse?.wind.speed} tipoHeader={" km/h"} iconFooter={<WavesIcon />}
                  dataFooter={"Velicidade do vento em km/h"} />
              </GridItem>
              <GridItem xs={12} sm={6} md={6}>
                <CustomCard {...this.props} color="info" iconHeader={this.state.iconWeather} titleHeader={"Clima"}
                  dataHeader={this.state.apiResponse?.weather[0].description}
                  iconFooter={this.state.iconWeather}
                  dataFooter={`Clima hoje em ${this.state.apiResponse?.name}`} />
              </GridItem>
            </GridContainer>
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <CustomCharts {...this.props} color={"warning"} data={this.state.tempChart} type={"Bar"}
              title={"Temperatura"} category={"Previsão da temperatura a cada 3 horas"}
              iconFooter={<WbSunnyIcon />} txtRodape={this.converteData(new Date(), "dd 'de' MMMM', ' HH:mm'h'")} />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <CustomCharts {...this.props} color={"info"} data={this.state.humidityChart} type={"Line"}
              title={"Umidade relativa do ar"} category={"Umidade do ar em um período de 24 horas"}
              iconFooter={<BeachAccessIcon />} txtRodape={"Percentual da umidade relativa do ar"} />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <CustomCharts {...this.props} color={"success"} data={this.state.windChart} type={"Bar"}
              title={"Velocidade do vento"} category={"Velocidade do vento em um período de 24 horas"}
              iconFooter={<WavesIcon />} txtRodape={"Velocidade medida em km/h"} />
          </GridItem>
          <GridItem xs={12} sm={12} md={12}>
            <CustomTable {...this.props} {...this.state.tableResponse} color={"success"}
              title={`${this.state.apiResponse?.name} nas próximas 72 horas`}
              category={`O sol hoje nasceu às: ${this.sunriseSunset(this.state.apiResponse?.sys.sunrise)} 
                e deve se pôr às: ${this.sunriseSunset(this.state.apiResponse?.sys.sunset)}`} />
          </GridItem>
        </GridContainer>
      </div >
    );
  }
}

export default withStyles(dashboardStyle)(Dashboard);
