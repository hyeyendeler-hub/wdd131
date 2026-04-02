// Product Review Form JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Product array - data source for product options
    const products = [
        { id: 1, name: "Wireless Bluetooth Headphones" },
        { id: 2, name: "Smart Watch Pro" },
        { id: 3, name: "Portable Bluetooth Speaker" },
        { id: 4, name: "Mechanical Gaming Keyboard" },
        { id: 5, name: "Ergonomic Office Chair" },
        { id: 6, name: "4K Ultra HD Monitor" },
        { id: 7, name: "Wireless Gaming Mouse" },
        { id: 8, name: "USB-C Docking Station" },
        { id: 9, name: "Noise Cancelling Earbuds" },
        { id: 10, name: "Adjustable Standing Desk" }
    ];

    // Populate product select options
    const productSelect = document.getElementById('product-name');
    if (productSelect) {
        products.forEach(product => {
            const option = document.createElement('option');
            option.value = product.id;
            option.textContent = product.name;
            productSelect.appendChild(option);
        });
    }

    // Set default date to today
    const dateInput = document.getElementById('installation-date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.value = today;
    }
});
