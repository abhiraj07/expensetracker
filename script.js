
document.querySelector('.hamburger').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('open');
});




document.addEventListener("DOMContentLoaded", function() {
    let currentImageIndex = 0;
    const images = document.querySelectorAll('.hero-images img');
    const totalImages = images.length;

    function changeImage() {
        images[currentImageIndex].classList.remove('active');
        currentImageIndex = (currentImageIndex + 1) % totalImages;
        images[currentImageIndex].classList.add('active');
    }

    setInterval(changeImage, 3000); // Change image every 3 seconds
});
