import '../../App.css';

const StarRating = (props) => {

    const stars = [1, 2, 3, 4, 5];

    return (

        <div className="StarRating">
            {stars.map(star => (
                star <= props.rating ? (
                    <span className="filled">&#9734;</span>
                    ) : (
                    <span className="nofill">&#9734;</span>
                    )
            ))
            }
        </div>
    );
}

export default StarRating;