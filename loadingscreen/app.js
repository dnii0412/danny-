window.addEventListener('load', function () {
    const loadingScreen = document.querySelector('.loading-screen');
    const loadedImage = document.getElementById('loaded-image');
  
    loadedImage.onload = function () {
      loadingScreen.style.display = 'none';
      loadedImage.style.display = 'block';
    };
  
    loadedImage.src = 'your-image.jpg';
  });
  