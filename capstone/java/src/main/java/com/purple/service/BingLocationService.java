package com.purple.service;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.purple.model.Brewery;
import com.purple.model.tmdb.BingBrewery;
import com.purple.model.tmdb.TmdbMovie;
import org.apache.cxf.jaxrs.client.WebClient;
import org.springframework.boot.json.JsonParser;
import org.springframework.boot.json.JsonParserFactory;
import org.springframework.stereotype.Service;

import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Map;

@Service
public class BingLocationService implements ExternalLocationService {
    @Override
    public void getLocationFromExternal(Brewery brewery){
        try {
            Response response = WebClient.create(getBreweryAddress(brewery)).accept(MediaType.APPLICATION_JSON).get();
            String json = response.readEntity(String.class);
            mapToBrewery(brewery,json);
        } catch (Exception ex) {
            //should be logging the failure here
            ex.printStackTrace();
        }

    }
    @Override
    public void getALlLocationsFromExternal(List<Brewery> breweryList){

        for (Brewery brewery: breweryList) {
            Response response = WebClient.create(getBreweryAddress(brewery)).accept(MediaType.APPLICATION_JSON).get();
            String json = response.readEntity(String.class);
            mapToBrewery(brewery, json);
        }

    }
    private String getBreweryAddress(Brewery brewery) {
        return "https://nominatim.openstreetmap.org/search?q=" + brewery.getBreweryAddress() + "&format=json";
    }

    private void mapToBrewery(Brewery brewery, String json){
        JsonParser springParser = JsonParserFactory.getJsonParser();
        json = json.substring(1,json.length() - 1);
        Map<String,Object> map = springParser.parseMap(json);
        ObjectMapper mapper = new ObjectMapper();

        mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);

        BingBrewery bingBrewery = mapper.convertValue(map, BingBrewery.class);
        brewery.setLatitude(bingBrewery.getLat());
        brewery.setLongitude(bingBrewery.getLon());

    }


}
