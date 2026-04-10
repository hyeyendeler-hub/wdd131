// Review confirmation page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const products = [
        { id: "1", name: "Wireless Bluetooth Headphones" },
        { id: "2", name: "Smart Watch Pro" },
        { id: "3", name: "Portable Bluetooth Speaker" },
        { id: "4", name: "Mechanical Gaming Keyboard" },
        { id: "5", name: "Ergonomic Office Chair" },
        { id: "6", name: "4K Ultra HD Monitor" },
        { id: "7", name: "Wireless Gaming Mouse" },
        { id: "8", name: "USB-C Docking Station" },
        { id: "9", name: "Noise Cancelling Earbuds" },
        { id: "10", name: "Adjustable Standing Desk" }
    ];

    const urlParams = new URLSearchParams(window.location.search);
    const pendingReviewJSON = localStorage.getItem('pendingReview');
    const pendingReviewProcessed = localStorage.getItem('pendingReviewProcessed') === 'true';

    const reviewData = pendingReviewJSON ? JSON.parse(pendingReviewJSON) : {
        productName: urlParams.get('product-name'),
        rating: urlParams.get('rating'),
        installationDate: urlParams.get('installation-date'),
        usefulFeatures: urlParams.getAll('useful-features'),
        review: urlParams.get('review'),
        userName: urlParams.get('user-name')
    };

    const reviewDetails = document.getElementById('review-details');
    if (reviewDetails) {
        if (reviewData) {
            const productName = products.find(product => product.id === reviewData.productName)?.name || reviewData.productName;
            const usefulFeatures = reviewData.usefulFeatures || [];

            const detailsHTML = `
                <ul>
                    ${productName ? `<li><strong>Product:</strong> ${productName}</li>` : ''}
                    ${reviewData.rating ? `<li><strong>Rating:</strong> ${reviewData.rating} out of 5</li>` : ''}
                    ${reviewData.installationDate ? `<li><strong>Installation Date:</strong> ${reviewData.installationDate}</li>` : ''}
                    ${usefulFeatures.length ? `<li><strong>Useful Features:</strong> ${usefulFeatures.join(', ')}</li>` : ''}
                    ${reviewData.review ? `<li><strong>Review:</strong> ${reviewData.review}</li>` : ''}
                    ${reviewData.userName ? `<li><strong>User Name:</strong> ${reviewData.userName}</li>` : ''}
                </ul>
            `;
            reviewDetails.innerHTML = detailsHTML;
        } else {
            reviewDetails.innerHTML = '<p>No review details were found. Please submit the form again.</p>';
        }
    }

    const reviewCountElement = document.getElementById('review-count');
    if (reviewCountElement) {
        let reviewCount = localStorage.getItem('reviewCount');
        reviewCount = reviewCount ? parseInt(reviewCount, 10) : 0;

        if (reviewData && pendingReviewJSON && !pendingReviewProcessed) {
            reviewCount++;
            localStorage.setItem('reviewCount', reviewCount);
            localStorage.setItem('pendingReviewProcessed', 'true');
        }

        reviewCountElement.textContent = reviewCount;
    }
});
