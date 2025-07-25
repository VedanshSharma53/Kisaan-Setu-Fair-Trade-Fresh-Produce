// Initialize map when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on a listing page (has map container)
  const mapContainer = document.getElementById('map');
  const mapFallback = document.getElementById('map-fallback');
  
  // Only initialize map if we're on a listing page
  if (!mapContainer) {
    console.log('Not on a listing page, skipping map initialization');
    return;
  }

  // Check if Mapbox GL is available
  if (typeof mapboxgl === 'undefined') {
    console.error('Mapbox GL not loaded');
    showMapFallback();
    return;
  }

  // Check if required variables are available
  if (typeof mapToken === 'undefined' || !mapToken) {
    console.error('Mapbox token not available');
    showMapFallback();
    return;
  }

  if (typeof listing === 'undefined' || !listing.geometry || !listing.geometry.coordinates) {
    console.error('Listing coordinates not available');
    showMapFallback();
    return;
  }

  // Set access token
  mapboxgl.accessToken = mapToken;

  try {
    // Create map
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      center: listing.geometry.coordinates,
      zoom: 9
    });

    // Add marker when map loads
    map.on('load', function() {
      const marker = new mapboxgl.Marker({color: 'red'})
        .setLngLat(listing.geometry.coordinates)
        .setPopup(new mapboxgl.Popup({offset: 25})
          .setHTML(`<h4>${listing.title}</h4><p>Exact Location will be provided after booking</p>`))
        .addTo(map);
    });

    // Handle map errors
    map.on('error', function(e) {
      console.error('Map error:', e);
      showMapFallback();
    });

  } catch (error) {
    console.error('Error initializing map:', error);
    showMapFallback();
  }

  // Function to show fallback when map fails
  function showMapFallback() {
    if (mapContainer) {
      mapContainer.style.display = 'none';
    }
    if (mapFallback) {
      mapFallback.style.display = 'block';
    }
  }
});