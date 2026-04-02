// Review confirmation page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Get URL parameters (form uses method="get")
    const urlParams = new URLSearchParams(window.location.search);
    
    // Display review details
    const reviewDetails = document.getElementById('review-details');
    if (reviewDetails) {
        const productName = urlParams.get('product-name');
        const rating = urlParams.get('rating');
        const installationDate = urlParams.get('installation-date');
        const usefulFeatures = urlParams.getAll('useful-features');
        const review = urlParams.get('review');
        const userName = urlParams.get('user-name');
        
        let detailsHTML = '<ul>';
        
        if (productName) {
            detailsHTML += `<li><strong>Product:</strong> ${productName}</li>`;
        }
        
        if (rating) {
            detailsHTML += `<li><strong>Rating:</strong> ${rating} out of 5</li>`;
        }
        
        if (installationDate) {
            detailsHTML += `<li><strong>Installation Date:</strong> ${installationDate}</li>`;
        }
        
        if (usefulFeatures && usefulFeatures.length > 0) {
            detailsHTML += `<li><strong>Useful Features:</strong> ${usefulFeatures.join(', ')}</li>`;
        }
        
        if (review) {
            detailsHTML += `<li><strong>Review:</strong> ${review}</li>`;
        }
        
        if (userName) {
            detailsHTML += `<li><strong>User Name:</strong> ${userName}</li>`;
        }
        
        detailsHTML += '</ul>';
        reviewDetails.innerHTML = detailsHTML;
    }
    
    // Handle review counter using localStorage
    const reviewCountElement = document.getElementById('review-count');
    if (reviewCountElement) {
        // Get current count from localStorage
        let reviewCount = localStorage.getItem('reviewCount');
        
        // If no count exists, initialize to 0
        if (reviewCount === null) {
            reviewCount = 0;
        } else {
            reviewCount = parseInt(reviewCount);
        }
        
        // Increment the count
        reviewCount++;
        
        // Save the updated count to localStorage
        localStorage.setItem('reviewCount', reviewCount);
        
        // Display the count
        reviewCountElement.textContent = reviewCount;
    }
});
