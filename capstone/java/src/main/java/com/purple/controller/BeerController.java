package com.purple.controller;

import com.purple.handler.BeerHandlerable;
import com.purple.model.*;
import com.purple.security.Authorized;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Beer Controller
 */
@RestController
@RequestMapping("/api")
public class BeerController extends BaseController {

    private final BeerHandlerable beerHandler;

    @Autowired
    public BeerController(BeerHandlerable beerHandler) {
        this.beerHandler = beerHandler;
    }

    @GetMapping(value = "/beer/all",
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Authorized
    public ResponseEntity<?> getAllBeers(HttpServletRequest request, HttpServletResponse response) {
        User user = super.getCurrentUserFromAttribute(request);
        return ResponseEntity.ok(this.beerHandler.getAllBeers(user));
    }

    @GetMapping(value = "/beer/detail/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Authorized
    public ResponseEntity<?> getBeerById(HttpServletRequest request, HttpServletResponse response, @PathVariable long id) {
        User user = super.getCurrentUserFromAttribute(request);
        return ResponseEntity.ok(this.beerHandler.getBeerById(user, id));
    }

    @GetMapping(value = "/brewery/beer/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Authorized
    public ResponseEntity<?> getAllBeerForBreweryId(HttpServletRequest request, HttpServletResponse response, @PathVariable long id) {
        User user = super.getCurrentUserFromAttribute(request);
        return ResponseEntity.ok(this.beerHandler.getAllBeerForBreweryId(user, id));
    }

    @PostMapping(value = "/beer/detail/{brewerId}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Authorized(requiredRole = "Brewer")
    public ResponseEntity<?> addNewBeerForBreweryId(HttpServletRequest request, HttpServletResponse response, @RequestBody Beer beer, @PathVariable long brewerId) {
        User user = super.getCurrentUserFromAttribute(request);
        return ResponseEntity.ok(this.beerHandler.addNewBeerForBreweryId(user, beer, brewerId));
    }

    @PutMapping(value = "/beer/detail/{brewerId}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Authorized(requiredRole = "Brewer")
    public ResponseEntity<?> addExistingBeerForBreweryId(HttpServletRequest request, HttpServletResponse response, @RequestBody Beer beer, @PathVariable long brewerId) {
        User user = super.getCurrentUserFromAttribute(request);
        return ResponseEntity.ok(this.beerHandler.addExistingBeerForBreweryId(user, beer, brewerId));
    }

    @PutMapping(value = "/beer/inactive/{brewerId}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Authorized(requiredRole = "Brewer")
    public ResponseEntity<?> updateToInactiveBeer(HttpServletRequest request, HttpServletResponse response, @RequestBody Beer beer, @PathVariable long brewerId) {
        User user = super.getCurrentUserFromAttribute(request);
        return ResponseEntity.ok(this.beerHandler.updateToInactiveBeer(user, beer, brewerId));
    }

    @PutMapping(value = "/beer/active/{brewerId}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Authorized(requiredRole = "Brewer")
    public ResponseEntity<?> updateToActiveBeer(HttpServletRequest request, HttpServletResponse response, @RequestBody Beer beer, @PathVariable long brewerId) {
        User user = super.getCurrentUserFromAttribute(request);
        return ResponseEntity.ok(this.beerHandler.updateToActiveBeer(user, beer, brewerId));
    }

    @PutMapping(value = "/beer/update/detail/{id}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Authorized(requiredRole = "Brewer")
    public ResponseEntity<?> updateBeer(HttpServletRequest request, HttpServletResponse response, @RequestBody Beer beer) {
        User user = super.getCurrentUserFromAttribute(request);
        return ResponseEntity.ok(this.beerHandler.updateBeer(user, beer));
    }
}