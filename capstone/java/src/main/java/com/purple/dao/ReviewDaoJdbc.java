package com.purple.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.sql.DataSource;

import com.purple.model.Review;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

/**
 * JDBCReviewDao implements ReviewDao
 */
@Component
public class ReviewDaoJdbc implements ReviewDao {

    private final NamedParameterJdbcTemplate jdbcTemplate;

    @Autowired
    public ReviewDaoJdbc(DataSource datasource) {
        this.jdbcTemplate = new NamedParameterJdbcTemplate(datasource);
    }

    public List<Review> getReviewByBeerId(long id) {
        List<Review> reviews = new ArrayList<>();
        String sql = "select\n" +
                "       ratingid,\n" +
                "       beerid,\n" +
                "       userid,\n" +
                "       titleofreview,\n" +
                "       maintext,\n" +
                "       rating,\n" +
                "       reviewdate,\n" +
                "       imgpath\n" +
                "    from reviewratingtable\n" +
                "    where beerid = :id;";
        Map<String, Object> params = new HashMap<>();
        params.put("id", id);
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, params);
        while (results.next()) {
            reviews.add(mapRowToReview(results));
        }
        return reviews;
    }

    public Review getReviewByRatingId(long id) {
        String sql = "select\n" +
                "       ratingid,\n" +
                "       beerid,\n" +
                "       userid,\n" +
                "       titleofreview,\n" +
                "       maintext,\n" +
                "       rating,\n" +
                "       reviewdate,\n" +
                "       imgpath\n" +
                "    from reviewratingtable\n" +
                "    where ratingid = :id;";
        Map<String, Object> params = new HashMap<>();
        params.put("id", id);
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, params);
        if (results.next()) {
            return mapRowToReview(results);
        }
        return null;
    }

    public Review getAvgBeerRating(long id) {

        String sql = "select \n" +
                "       beerid,\n" +
                "       avg(rating) \n" +
                "           as averagerating\n" +
                "    from reviewratingtable\n" +
                "    where beerid = :id \n" +
                "    group by beerid;";
        Map<String, Object> params = new HashMap<>();
        params.put("id", id);
        SqlRowSet results = jdbcTemplate.queryForRowSet(sql, params);
        if (results.next()) {
            Review review = new Review();
            review.setBeerId(results.getInt("beerid"));
            review.setAvgRating(results.getDouble("averagerating"));
            return review;
        }
        return null;
    }

    public Review addBeerReview(Review review) {
        String sql = "insert into reviewratingtable (beerid,\n" +
                "                               userid, \n" +
                "                               titleofreview, \n" +
                "                               maintext,\n" +
                "                               rating,\n" +
                "                               reviewdate,\n" +
                "                               imgpath)\n" +
                "    values\n" +
                "    (:beerid, \n" +
                "     :userid, \n" +
                "     :titleofreview, \n" +
                "     :maintext, \n" +
                "     :rating, \n" +
                "     :reviewdate, \n" +
                "     :imgpath) returning ratingid;";
        Map<String, Object> params = new HashMap<>();
        params.put("beerid", review.getBeerId());
        params.put("userid", review.getUserId());
        params.put("titleofreview", review.getTitleOfReview());
        params.put("maintext", review.getMainText());
        params.put("rating", review.getRating());
        params.put("reviewdate", review.getReviewDate());
        params.put("imgpath", review.getImgPath());
        Long id = this.jdbcTemplate.queryForObject(sql, params, Long.class);
        return getReviewByRatingId(id);
    }

    private Review mapRowToReview(SqlRowSet results) {
        Review review = new Review();
        review.setRatingId(results.getInt("ratingid"));
        review.setBeerId(results.getInt("beerid"));
        review.setUserId(results.getInt("userid"));
        review.setTitleOfReview(results.getString("titleofreview"));
        review.setMainText(results.getString("maintext"));
        review.setRating(results.getInt("rating"));
        review.setReviewDate(results.getString("reviewdate"));
        review.setImgPath(results.getString("imgpath"));
        return review;
    }
}
