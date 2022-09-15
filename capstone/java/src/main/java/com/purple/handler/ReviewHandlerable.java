package com.purple.handler;

import com.purple.model.Beer;
import com.purple.model.Review;
import com.purple.model.User;

import java.util.List;

public interface ReviewHandlerable {
    public List<Review> getReviewByBeerId(User user, long id);

    public Review getAvgBeerRating(User user, long id);

    public Review addBeerReview(User user, Review review);
}
