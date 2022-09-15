package com.purple.service;

import com.purple.model.Brewery;

import java.util.List;

public interface ExternalLocationService {
    public void getLocationFromExternal(Brewery brewery);
    public void getALlLocationsFromExternal(List<Brewery> breweryList);
}
