package com.purple.handler;

import com.purple.dao.ReviewDao;
import com.purple.model.Beer;
import com.purple.model.Review;
import com.purple.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ReviewHandler implements ReviewHandlerable {

    private final ReviewDao reviewDao;

    @Autowired
    public ReviewHandler(ReviewDao reviewDao) {
        this.reviewDao = reviewDao;
    }

    @Override
    public List<Review> getReviewByBeerId(User user, long id) {
        List<Review> reviews = new ArrayList<>();
        reviews = reviewDao.getReviewByBeerId(id);
        return reviews;
    }

    @Override
    public Review getAvgBeerRating(User user, long id) {
        return reviewDao.getAvgBeerRating(id);
    }

    public Review addBeerReview(User user, Review review) {
        return reviewDao.addBeerReview(review);
    }

}
