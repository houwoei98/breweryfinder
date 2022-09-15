package com.purple.dao;

import com.purple.model.Review;

import java.util.List;

public interface ReviewDao {
    public List<Review> getReviewByBeerId(long id);

    public Review getAvgBeerRating(long id);

    public Review addBeerReview(Review review);

    public Review getReviewByRatingId(long id);
}
