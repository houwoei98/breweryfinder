package com.purple.controller;

import com.purple.handler.BreweryHandlerable;
import com.purple.model.*;
import com.purple.security.Authorized;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Brewery Controller
 */
@RestController
@RequestMapping("/api")
public class BreweryController extends BaseController {

    private final BreweryHandlerable breweryHandler;

    @Autowired
    public BreweryController(BreweryHandlerable breweryHandler) {
        this.breweryHandler = breweryHandler;
    }

    @GetMapping(value = "/brewery/all",
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Authorized
    public ResponseEntity<?> getAllBreweries(HttpServletRequest request, HttpServletResponse response) {
        User user = super.getCurrentUserFromAttribute(request);
        return ResponseEntity.ok(this.breweryHandler.getAllBreweries(user));
    }

    @GetMapping(value = "/brewery/detail/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Authorized
    public ResponseEntity<?> getBreweryById(HttpServletRequest request, HttpServletResponse response, @PathVariable long id) {
        User user = super.getCurrentUserFromAttribute(request);
        return ResponseEntity.ok(this.breweryHandler.getBreweryById(user, id));
    }

    @PutMapping(value = "/brewery/detail/{id}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Authorized(requiredRole = "Brewer")
    public ResponseEntity<?> updateBrewery(HttpServletRequest request, HttpServletResponse response, @RequestBody Brewery brewery) {
        User user = super.getCurrentUserFromAttribute(request);
        return ResponseEntity.ok(this.breweryHandler.updateBrewery(user, brewery));
    }

    @PutMapping(value = "/brewery/inactive/{id}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Authorized(requiredRole = "Admin")
    public ResponseEntity<?> updateBreweryToInActive(HttpServletRequest request, HttpServletResponse response, @RequestBody Brewery brewery) {
        User user = super.getCurrentUserFromAttribute(request);
        return ResponseEntity.ok(this.breweryHandler.updateBreweryToInActive(user, brewery));
    }

    @PutMapping(value = "/brewery/active/{id}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Authorized(requiredRole = "Admin")
    public ResponseEntity<?> updateBreweryToActive(HttpServletRequest request, HttpServletResponse response, @RequestBody Brewery brewery) {
        User user = super.getCurrentUserFromAttribute(request);
        return ResponseEntity.ok(this.breweryHandler.updateBreweryToActive(user, brewery));
    }

    @PutMapping(value = "/brewery/news/{id}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Authorized(requiredRole = "Brewer")
    public ResponseEntity<?> updateBreweryNews(HttpServletRequest request, HttpServletResponse response, @RequestBody Brewery brewery) {
        User user = super.getCurrentUserFromAttribute(request);
        return ResponseEntity.ok(this.breweryHandler.updateBreweryNews(user, brewery));
    }

    @GetMapping(value = "/beer/brewery/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Authorized
    public ResponseEntity<?> getAllBreweryForBeerId(HttpServletRequest request, HttpServletResponse response, @PathVariable long id) {
        User user = super.getCurrentUserFromAttribute(request);
        return ResponseEntity.ok(this.breweryHandler.getAllBreweryForBeerId(user, id));
    }

    @PostMapping(value = "/brewery/new",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Authorized(requiredRole = "Admin")
    public ResponseEntity<?> addNewBrewery(HttpServletRequest request, HttpServletResponse response, @RequestBody Brewery brewery) {
        User user = super.getCurrentUserFromAttribute(request);
        return ResponseEntity.ok(this.breweryHandler.addNewBrewery(user, brewery));
    }

    @GetMapping(value = "/brewery/detail/user/{userId}",
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Authorized
    public ResponseEntity<?> getBreweryByUserId(HttpServletRequest request, HttpServletResponse response, @PathVariable long userId) {
        User user = super.getCurrentUserFromAttribute(request);
        return ResponseEntity.ok(this.breweryHandler.getBreweryByUserId(user, userId));
    }

    @GetMapping(value = "/brewery/user",
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Authorized
    public ResponseEntity<?> getFavouriteBreweriesByUser(HttpServletRequest request, HttpServletResponse response) {
        User user = super.getCurrentUserFromAttribute(request);
        return ResponseEntity.ok(this.breweryHandler.getFavouriteBreweriesByUser(user));
    }

    @GetMapping(value = "/brewery/active/all",
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Authorized
    public ResponseEntity<?> getAllActiveBreweries(HttpServletRequest request, HttpServletResponse response) {
        User user = super.getCurrentUserFromAttribute(request);
        return ResponseEntity.ok(this.breweryHandler.getAllActiveBreweries(user));
    }

}