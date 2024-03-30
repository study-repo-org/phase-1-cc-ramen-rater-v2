// index.js

// Callbacks
const handleClick = (ramen) => {
  const detailImage = document.querySelector('.detail-image');
  const name = document.querySelector('.name');
  const restaurant = document.querySelector('.restaurant');
  const ratingDisplay = document.querySelector('#rating-display');
  const commentDisplay = document.querySelector('#comment-display');

  detailImage.src = ramen.image;
  name.textContent = ramen.name;
  restaurant.textContent = ramen.restaurant;
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;
};




const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');
  
  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const newName = document.getElementById('new-name').value;
    const newRestaurant = document.getElementById('new-restaurant').value;
    const newImage = document.getElementById('new-image').value;
    const newRating = document.getElementById('new-rating').value;
    const newComment = document.getElementById('new-comment').value;

    const newRamen = {
      name: newName,
      restaurant: newRestaurant,
      image: newImage,
      rating: newRating,
      comment: newComment,
    };
    
    const newRamenImg = document.createElement('img');
    newRamenImg.src = newImage;

    newRamenImg.addEventListener('click', () => {
      handleClick(newRamen);
    });

    const ramenMenu = document.getElementById('ramen-menu');
    ramenMenu.appendChild(newRamenImg);

    form.reset();
  });
};




const displayRamens = () => {
  const ramenMenu = document.getElementById('ramen-menu');

  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(ramens => {
      ramens.forEach((ramen) => {
        const img = document.createElement('img');
        img.src = ramen.image;
        
        img.addEventListener('click', () => handleClick(ramen));
        ramenMenu.appendChild(img);

        
      });
    })
    .catch(error => console.error('Error fetching ramen data:', error));
};



const main = () => {
  displayRamens();
  addSubmitListener();
}


document.addEventListener('DOMContentLoaded', main);

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};