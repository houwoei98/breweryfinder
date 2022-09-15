package com.purple.controller;

import com.purple.handler.ReviewHandlerable;
import com.purple.model.Beer;
import com.purple.model.Review;
import com.purple.model.User;
import com.purple.security.Authorized;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Review Controller
 */
@RestController
@RequestMapping("/api")
public class ReviewController extends BaseController {

    private final ReviewHandlerable reviewHandler;

    @Autowired
    public ReviewController(ReviewHandlerable reviewHandler) {
        this.reviewHandler = reviewHandler;
    }

    @GetMapping(value = "/beer/detail/review/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Authorized
    public ResponseEntity<?> getReviewByBeerId(HttpServletRequest request, HttpServletResponse response, @PathVariable long id) {
        User user = super.getCurrentUserFromAttribute(request);
        return ResponseEntity.ok(this.reviewHandler.getReviewByBeerId(user, id));
    }

    @GetMapping(value = "/beer/rating/{id}",
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Authorized
    public ResponseEntity<?> getAvgBeerRating(HttpServletRequest request, HttpServletResponse response, @PathVariable long id) {
        User user = super.getCurrentUserFromAttribute(request);
        return ResponseEntity.ok(this.reviewHandler.getAvgBeerRating(user, id));
    }

    @PostMapping(value = "/beer/rating/{id}",
            consumes = MediaType.APPLICATION_JSON_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    @Authorized(requiredRole = "BeerLover")
    public ResponseEntity<?> addBeerReview(HttpServletRequest request, HttpServletResponse response, @RequestBody Review review) {
        User user = super.getCurrentUserFromAttribute(request);
        return ResponseEntity.ok(this.reviewHandler.addBeerReview(user, review));
    }
}
