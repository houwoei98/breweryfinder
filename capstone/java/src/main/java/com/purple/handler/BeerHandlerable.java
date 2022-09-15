package com.purple.handler;

import com.purple.model.Beer;
import com.purple.model.Brewery;
import com.purple.model.User;

import java.util.List;

public interface BeerHandlerable {

    public List<Beer> getAllBeers(User user);

    public Beer getBeerById(User user, long id);

    public List<Beer> getAllBeerForBreweryId(User user, long id);

    public Beer addNewBeerForBreweryId(User user, Beer beer, long brewerId);

    public Beer addExistingBeerForBreweryId(User user, Beer beer, long brewerId);

    public Beer updateToInactiveBeer(User user, Beer beer, long brewerId);

    public Beer updateToActiveBeer(User user, Beer beer, long brewerId);

    public Beer updateBeer(User user, Beer beer);
}