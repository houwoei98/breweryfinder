package com.purple.model.tmdb;


/*
[
{"place_id":57123862,
"licence":"Data © OpenStreetMap contributors,
ODbL 1.0. https://osm.org/copyright",
"osm_type":"node",
"osm_id":5202423829,
"boundingbox":["51.4993271","51.4994271","-0.0747906","-0.0746906"],
"lat":"51.4993771",
"lon":"-0.0747406",
"display_name":"Hawkes Cider, 86-92, Druid Street, Bermondsey Spa, Old Kent Road, London Borough of Southwark, London, Greater London, England, SE1 2HQ, United Kingdom",
"class":"amenity",
"type":"pub",
"importance":0.6001000000000001,
"icon":"https://nominatim.openstreetmap.org/ui/mapicons/food_pub.p.20.png"
}
]
 */
public class BingBrewery {
    private double lat;
    private double lon;

    public double getLat() {
        return lat;
    }

    public void setLat(double lat) {
        this.lat = lat;
    }

    public double getLon() {
        return lon;
    }

    public void setLon(double lon) {
        this.lon = lon;
    }
}
