import React from "react";
// reactstrap components
import { Card, CardHeader, CardBody, Row, Col } from "reactstrap";

import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import geobien from "assets/maps/geobien"
am4core.useTheme(am4themes_animated);

class Map extends React.Component {

    componentDidMount() {
        // Create map instance
        var chart = am4core.create("chartdiv", am4maps.MapChart);

        // Set map definition
        chart.geodata = geobien;

        // Set projection
        chart.projection = new am4maps.projections.Miller();

        // Series for World map
        var worldSeries = chart.series.push(new am4maps.MapPolygonSeries());

        worldSeries.exclude = ["AQ"];

        worldSeries.useGeodata = true;

        var polygonTemplate = worldSeries.mapPolygons.template;

        polygonTemplate.tooltipText = "{name}";
        polygonTemplate.fill = am4core.color("#74B266");
        polygonTemplate.propertyFields.disabled = "disabled";
        var hs = polygonTemplate.states.create("hover");
        hs.properties.fill = am4core.color("#367B25");



        // Create image series
        var imageSeries = chart.series.push(new am4maps.MapImageSeries());

        // Create a circle image in image series template so it gets replicated to all new images
        var imageSeriesTemplate = imageSeries.mapImages.template;
        var circle = imageSeriesTemplate.createChild(am4core.Circle);
        circle.radius = 4;
        circle.fill = am4core.color("#B27799");
        circle.stroke = am4core.color("#FFFFFF");
        circle.strokeWidth = 2;
        circle.nonScaling = true;
        circle.tooltipText = "{title}";

        // Set property fields
        imageSeriesTemplate.propertyFields.latitude = "latitude";
        imageSeriesTemplate.propertyFields.longitude = "longitude";

        // Add data for the three cities

        imageSeries.data = [];
        this.imageSeries = imageSeries;
        this.chart = chart;
    }

    componentDidUpdate() {
        if (this.props.data.projects.length > 0)
            if (this.imageSeries) {
                this.imageSeries.data = this.props.data.projects.map(pr => {
                    pr.title = pr.name;
                    pr.latitude = pr.location.latitude;
                    pr.longitude = pr.location.longitude;
                    return pr;
                })
            }
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.dispose();
        }
    }


    render() {
        return (
            <>
                <div className="content">
                    <Row>
                        <Col md="12">
                            <Card>
                                <CardHeader>Mapitas</CardHeader>
                                <CardBody>
                                    <div
                                        id="map"
                                        className="map"
                                        style={{ position: "relative", overflow: "hidden" }}
                                    >
                                        {/* Aqui va el mapa */}
                                        <div id="chartdiv" style={{ width: "100%", height: "500px" }}></div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </>
        );
    }
}

export default Map;
