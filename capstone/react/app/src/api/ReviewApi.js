export function getReviewByBeerId(id){
    const url = `/api/beer/detail/review/${id}`;
    return fetch(url, {
        mode: 'cors',
        credentials: 'same-origin',
        method: 'GET',
        headers: {  'Content-Type': 'application/json',
            'x-csrf-token': window.CSRF_TOKEN_HEADER}
    } ).then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            console.error(`Error: ${response.status}`);
        }
    }).catch(e => console.error(`Error: ${JSON.stringify(e)}`));
}

export function getAvgBeerRating(id){
    const url = `/api/beer/rating/${id}`;
    return fetch(url, {
        mode: 'cors',
        credentials: 'same-origin',
        method: 'GET',
        headers: {  'Content-Type': 'application/json',
            'x-csrf-token': window.CSRF_TOKEN_HEADER}
    } ).then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            console.error(`Error: ${response.status}`);
        }
    }).catch(e => console.error(`Error: ${JSON.stringify(e)}`));
}

// export function addReviewDetail(review, id){
//     const url = `/api/beer/rating/${id}`;
//     return fetch(url, {
//         mode: 'cors',
//         credentials: 'same-origin',
//         method: 'POST',
//         headers: {  'Content-Type': 'application/json',
//             'x-csrf-token': window.CSRF_TOKEN_HEADER}
//     } ).then(response => {
//         if (response.status === 200) {
//             return response.json();
//         } else {
//             console.error(`Error: ${response.status}`);
//         }
//     }).catch(e => console.error(`Error: ${JSON.stringify(e)}`));
// }

export function addReviewDetail(review, id){
    const url = `/api/beer/rating/${id}`;
    return fetch(url, {
        mode: 'cors',
        credentials: 'same-origin',
        method: 'POST',
        headers: {  'Content-Type': 'application/json',
            'x-csrf-token': window.CSRF_TOKEN_HEADER},
        body: JSON.stringify(review)
    } ).then(response => {
        if (response.status === 200) {
            return response.json();
        } else {
            console.error(`Error: ${response.status}`);
        }
    }).catch(e => console.error(`Error: ${JSON.stringify(e)}`));
}