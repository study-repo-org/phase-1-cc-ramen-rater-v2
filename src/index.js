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

    // Send POST request to create new ramen
    fetch('http://localhost:3000/ramens', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newRamen),
    })
    .then(response => response.json())
    .then(createdRamen => {
      // Update UI to display newly created ramen
      const newRamenImg = document.createElement('img');
      newRamenImg.src = createdRamen.image;
      newRamenImg.addEventListener('click', () => handleClick(createdRamen));
      const ramenMenu = document.getElementById('ramen-menu');
      ramenMenu.appendChild(newRamenImg);
    })
    .catch(error => console.error('Error creating new ramen:', error));

    form.reset();
  });
};




const displayRamens = () => {
  const ramenMenu = document.getElementById('ramen-menu');

  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(ramens => {
      ramens.forEach((ramen) => {
        const ramenContainer = document.createElement('div'); // Create a container for each ramen item
        const img = document.createElement('img');
        img.src = ramen.image;
        
        img.addEventListener('click', () => handleClick(ramen));

        // Create a delete button for each ramen item
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', (event) => {
         
          handleDelete(ramen.id);
        });

        // Append the img and delete button to the ramen container
        ramenContainer.appendChild(img);
        ramenContainer.appendChild(deleteButton);

        ramenMenu.appendChild(ramenContainer);
      });

      if (ramens.length > 0) {
        handleClick(ramens[0]);
      }
    })
    .catch(error => console.error('Error fetching ramen data:', error));
};


const handleDelete = (ramenId) => {
  fetch(`http://localhost:3000/ramens/${ramenId}`, {
    method: 'DELETE',
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Failed to delete ramen');
    }
    // Optionally, update UI or perform any additional actions after successful deletion
  })
  .catch(error => console.error('Error deleting ramen:', error));
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