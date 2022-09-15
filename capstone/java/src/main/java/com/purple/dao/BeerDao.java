package com.purple.dao;

import com.purple.model.Beer;
import com.purple.model.Brewery;

import java.util.List;

public interface BeerDao {

    public List<Beer> getAllBeer();

    public Beer getBeerById(long id);

    public List<Beer> getAllBeerForBreweryId(long id);

    public Beer addBeer(Beer beer);

    public void linkBeerAndBrewery(long brewerId, Beer beer);

    public void updateToInactiveBeer(long brewerId, Beer beer);

    public void updateToActiveBeer(long brewerId, Beer beer);

    public Beer updateBeer(Beer beer);

}
