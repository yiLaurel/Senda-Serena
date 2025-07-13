/**
 * Explore Querétaro - Turismo Profesional
 * Main JavaScript file for the tourism website
 */

// Main configuration for the map
const MAP_CONFIG = {
  center: [20.5888, -100.3899], 
  minZoom: 7,
  maxZoom: 16,
  tileLayers: {
    standard: {
      url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
    },
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }
  },
  iconColors: {
    ciudad: '#6EC5E9',
    'pueblo-magico': '#F7A8B8',
    naturaleza: '#8FDF9E',
    vinicola: '#E3A8F7',
    hotel: '#FFD166',
    gastronomia: '#FF9E7D'
  }
};

// Destinations data with coordinates
const DESTINOS_DATA = [
  {
    name: "Jalpan de Serra, Pueblo Mágico",
    coords: [21.2184736, -99.4741672],
    type: "pueblo-magico",
    category: "Pueblo Mágico",
    description: "Encantador pueblo en la Sierra Gorda con una impresionante misión franciscana.",
    image: "turismo1/4pueblosmagicos.jpeg"
  },
  {
    name: "Acueducto de Querétaro",
    coords: [20.5966383, -100.3724265],
    type: "ciudad",
    category: "Patrimonio Histórico",
    description: "Icono de la ciudad con 74 arcos que se extienden por más de 1,200 metros.",
    image: "turismo1/acueducto-de-queretaro.jpg"
  },
  {
    name: "Amealco, Qro.",
    coords: [20.1865094, -100.1469744],
    type: "pueblo-magico",
    category: "Pueblo Mágico",
    description: "Conocido como la cuna de las muñecas artesanales y por su hermosa laguna.",
    image: "turismo1/amealco.jpg"
  },
  {
    name: "Bernal, Qro.",
    coords: [20.7379323, -99.9423166],
    type: "pueblo-magico",
    category: "Pueblo Mágico",
    description: "Hogar del tercer monolito más grande del mundo y un encantador pueblo.",
    image: "turismo1/bernal.jpg"
  },
  {
    name: "Cascada El Chuveje",
    coords: [21.1744848, -99.5627027],
    type: "naturaleza",
    category: "Atractivo Natural",
    description: "Hermosa cascada en la Sierra Gorda rodeada de vegetación exuberante.",
    image: "turismo1/Cascada-El-Chuveje.jpg"
  },
  {
    name: "Centro Histórico de Querétaro",
    coords: [20.5926617, -100.4178639],
    type: "ciudad",
    category: "Patrimonio de la Humanidad",
    description: "El corazón de la ciudad con arquitectura colonial y plazas encantadoras.",
    image: "turismo1/centro.jpg"
  },
  {
    name: "Cerro de las Campanas",
    coords: [20.5956098, -100.3742526],
    type: "ciudad",
    category: "Sitio Histórico",
    description: "Lugar emblemático donde ocurrieron eventos importantes en la historia de México.",
    image: "turismo1/cerro-de-las-campanas.jpg"
  },
  {
    name: "Grutas de Tolantongo",
    coords: [20.697417, -99.8776489],
    type: "naturaleza",
    category: "Atractivo Natural",
    description: "Impresionantes grutas con aguas termales en un entorno paradisíaco.",
    image: "turismo1/grutas-de-tolantongo-qro.jpg"
  },
  {
    name: "Mercado La Cruz",
    coords: [20.5981222, -100.3858361],
    type: "gastronomia",
    category: "Gastronomía Local",
    description: "Mercado tradicional donde puedes probar la auténtica comida queretana.",
    image: "turismo1/mercado-de-la-cruz-gastronomia.jpg"
  },
  {
    name: "Mirador de San Joaquín",
    coords: [20.9115871, -99.564642],
    type: "naturaleza",
    category: "Mirador",
    description: "Vistas panorámicas espectaculares de la Sierra Gorda queretana.",
    image: "turismo1/Queretaro_San_Joaquin_Panorama-web.jpg"
  },
  {
    name: "Viñedos La Redonda",
    coords: [20.6398199, -99.9070774],
    type: "vinicola",
    category: "Ruta del Vino",
    description: "Hermoso viñedo donde puedes disfrutar de catas y recorridos.",
    image: "turismo1/viñedo-la-redonda-qro.jpg"
  },
  {
    name: "Viñedos Freixenet",
    coords: [20.4876, -100.3819],
    type: "vinicola",
    category: "Ruta del Vino",
    description: "Famosa viñedo con tours y degustaciones de vinos espumosos.",
    image: "turismo1/viñedos-freixenet-qro.jpg"
  },
  {
    name: "Tequisquiapan",
    coords: [20.5225, -99.8907],
    type: "pueblo-magico",
    category: "Pueblo Mágico",
    description: "Encantador pueblo conocido por sus aguas termales y su ambiente relajado.",
    image: "turismo1/tequis.jpg"
  }
];

// Hotels data
const HOTELES_DATA = [
  {
    name: "Hotel Boutique Casa del Atrio",
    coords: [20.5915, -100.3962],
    type: "hotel",
    rating: 4.5,
    price: "$1,200 - $2,500 MXN/noche",
    description: "Encantador hotel boutique en el centro histórico con amenities de lujo.",
    image: "turismo1/hotel-centro.jpg"
  },
  {
    name: "Hotel La Posada del Castillo",
    coords: [20.6589, -100.4548],
    type: "hotel",
    rating: 4.8,
    price: "$2,500 - $4,000 MXN/noche",
    description: "Hacienda colonial convertida en hotel de lujo con spa y campo de golf.",
    image: "turismo1/hotel-bernal.jpg"
  },
  {
    name: "Hotel Hacienda Tequisquiapan",
    coords: [20.5243, -99.8915],
    type: "hotel",
    rating: 4.6,
    price: "$1,500 - $2,800 MXN/noche",
    description: "Hotel con aguas termales y spa en el corazón de Tequisquiapan.",
    image: "turismo1/hotel-tequisquiapan.jpg"
  },
  {
    name: "Hotel Hacienda la Venta",
    coords: [20.38363, -100.0124681],
    type: "hotel",
    rating: 4.4,
    price: "$1,800 - $3,200 MXN/noche",
    description: "Hacienda restaurada con encanto colonial y excelente servicio.",
    image: "turismo1/hotel-hacienda-la-venta-qro.jpg"
  },
  {
    name: "Hotel Sierra Gorda",
    coords: [21.2186, -99.4686],
    type: "hotel",
    rating: 4.3,
    price: "$1,000 - $2,000 MXN/noche",
    description: "Ubicado en plena naturaleza, ideal para ecoturismo y aventura.",
    image: "turismo1/hotel-sierra-gorda.jpg"
  }
];

// Interactive Map Module
const InteractiveMap = {
  map: null,
  baseLayers: {},
  overlayLayers: {},
  markers: {},
  currentLayer: null,

  // Initialize the map
  init() {
    if (!document.getElementById('map')) return;
    
    this.initMap();
    this.initBaseLayers();
    this.initOverlayLayers();
    this.addDestinos();
    this.addHoteles();
    this.setupControls();
    this.setupEventListeners();
    this.setupMapButtons();
    this.preloadImages();
  },

  // Create the Leaflet map instance
  initMap() {
    this.map = L.map('map', {
      center: MAP_CONFIG.center,
      zoom: 9,
      minZoom: MAP_CONFIG.minZoom,
      maxZoom: MAP_CONFIG.maxZoom,
      scrollWheelZoom: true,
      zoomControl: false
    });

    L.control.zoom({
      position: 'topright'
    }).addTo(this.map);
  },

  // Initialize base layers (standard and satellite)
  initBaseLayers() {
    this.baseLayers.standard = L.tileLayer(MAP_CONFIG.tileLayers.standard.url, {
      attribution: MAP_CONFIG.tileLayers.standard.attribution,
      maxZoom: MAP_CONFIG.maxZoom
    }).addTo(this.map);

    this.baseLayers.satellite = L.tileLayer(MAP_CONFIG.tileLayers.satellite.url, {
      attribution: MAP_CONFIG.tileLayers.satellite.attribution,
      maxZoom: MAP_CONFIG.maxZoom
    });
  },

  // Initialize overlay layers for different categories
  initOverlayLayers() {
    this.overlayLayers = {
      ciudad: L.layerGroup(),
      'pueblo-magico': L.layerGroup(),
      naturaleza: L.layerGroup(),
      vinicola: L.layerGroup(),
      hotel: L.layerGroup(),
      gastronomia: L.layerGroup()
    };

    Object.values(this.overlayLayers).forEach(layer => layer.addTo(this.map));
  },

  // Create custom icons for markers
  createCustomIcon(type) {
    const color = MAP_CONFIG.iconColors[type] || '#666';
    return L.divIcon({
      className: `map-marker marker-${type}`,
      html: `
        <div class="marker-container" style="background-color: ${color}; border-color: ${this.darkenColor(color, 20)}">
          <i class="fas ${this.getIconForType(type)}"></i>
          <div class="marker-pulse"></div>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });
  },

  // Get appropriate icon for each marker type
  getIconForType(type) {
    const icons = {
      'ciudad': 'fa-city',
      'pueblo-magico': 'fa-archway',
      'naturaleza': 'fa-tree',
      'vinicola': 'fa-wine-glass-alt',
      'hotel': 'fa-hotel',
      'gastronomia': 'fa-utensils'
    };
    return icons[type] || 'fa-map-marker-alt';
  },

  // Darken a color by a certain percentage
  darkenColor(color, percent) {
    const num = parseInt(color.replace("#", ""), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return `#${(0x1000000 + (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 + 
             (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 + 
             (B < 255 ? (B < 1 ? 0 : B) : 255)).toString(16).slice(1)}`;
  },

  // Add destination markers to the map
  addDestinos() {
    DESTINOS_DATA.forEach(destino => {
      const icon = this.createCustomIcon(destino.type);
      const marker = L.marker(destino.coords, { 
        icon,
        riseOnHover: true
      }).addTo(this.overlayLayers[destino.type]);
      
      this.markers[destino.name] = marker;

      const popupContent = this.createPopupContent(destino, 'destino');
      marker.bindPopup(popupContent, {
        maxWidth: 300,
        minWidth: 250,
        className: `map-popup popup-${destino.type}`
      });

      marker.on('mouseover', function() {
        this.openPopup();
        marker.getElement().classList.add('hovered');
      });

      marker.on('mouseout', function() {
        marker.getElement().classList.remove('hovered');
      });
    });
  },

  // Add hotel markers to the map
  addHoteles() {
    HOTELES_DATA.forEach(hotel => {
      const icon = this.createCustomIcon('hotel');
      const marker = L.marker(hotel.coords, { 
        icon,
        riseOnHover: true
      }).addTo(this.overlayLayers.hotel);
      
      this.markers[hotel.name] = marker;

      const popupContent = this.createPopupContent(hotel, 'hotel');
      marker.bindPopup(popupContent, {
        maxWidth: 300,
        minWidth: 250,
        className: 'map-popup popup-hotel'
      });

      marker.on('mouseover', function() {
        this.openPopup();
        marker.getElement().classList.add('hovered');
      });

      marker.on('mouseout', function() {
        marker.getElement().classList.remove('hovered');
      });
    });
  },

  // Create popup content for markers
  createPopupContent(data, type) {
    const imageUrl = data.image || '';
    const imageTag = imageUrl ? 
      `<img src="${imageUrl}" alt="${data.name}" loading="lazy" onerror="this.src='placeholder-image.jpg'">` : 
      '<div class="image-placeholder"><i class="fas fa-image"></i></div>';
    
    if (type === 'destino') {
      return `
        <div class="popup-content">
          <div class="popup-header" style="background-color: ${MAP_CONFIG.iconColors[data.type]}">
            <h4>${data.name}</h4>
            <span class="popup-category">${data.category}</span>
          </div>
          <div class="popup-body">
            ${imageTag}
            <p>${data.description}</p>
            <div class="popup-actions">
              <a href="#contacto" class="btn btn-sm btn-popup">Más info</a>
              <button class="btn btn-sm btn-popup-secondary" onclick="InteractiveMap.zoomToMarker('${data.name}')">
                <i class="fas fa-map-marked-alt"></i> Ver en mapa
              </button>
            </div>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="popup-content">
          <div class="popup-header" style="background-color: ${MAP_CONFIG.iconColors.hotel}">
            <h4>${data.name}</h4>
            <div class="popup-rating">
              ${'★'.repeat(Math.floor(data.rating))}${'☆'.repeat(5 - Math.ceil(data.rating))}
              <span>${data.rating}</span>
            </div>
          </div>
          <div class="popup-body">
            ${imageTag}
            <p>${data.description}</p>
            <p class="popup-price">${data.price}</p>
            <div class="popup-actions">
              <a href="#contacto" class="btn btn-sm btn-popup">Reservar</a>
            </div>
          </div>
        </div>
      `;
    }
  },

  // Preload images for better performance
  preloadImages() {
    const allImages = [...DESTINOS_DATA, ...HOTELES_DATA].map(item => item.image).filter(Boolean);
    allImages.forEach(imageUrl => {
      const img = new Image();
      img.src = imageUrl;
    });
  },

  // Setup layer controls
  setupControls() {
    const baseLayersControl = {
      "Mapa Estándar": this.baseLayers.standard,
      "Satélite": this.baseLayers.satellite
    };

    const overlayLayersControl = {
      "<i class='fas fa-city' style='color: #6EC5E9'></i> Ciudad": this.overlayLayers.ciudad,
      "<i class='fas fa-archway' style='color: #F7A8B8'></i> Pueblos Mágicos": this.overlayLayers['pueblo-magico'],
      "<i class='fas fa-tree' style='color: #8FDF9E'></i> Naturaleza": this.overlayLayers.naturaleza,
      "<i class='fas fa-wine-glass-alt' style='color: #E3A8F7'></i> Viñedos": this.overlayLayers.vinicola,
      "<i class='fas fa-hotel' style='color: #FFD166'></i> Hoteles": this.overlayLayers.hotel
    };

    L.control.layers(baseLayersControl, overlayLayersControl, {
      position: 'topright',
      collapsed: false
    }).addTo(this.map);
  },

  // Setup event listeners
  setupEventListeners() {
    document.querySelectorAll('.btn-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        this.filterMarkers(filter);
        
        document.querySelectorAll('.btn-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    window.addEventListener('resize', () => {
      this.map.invalidateSize();
    });
  },

  // Setup map buttons
  setupMapButtons() {
    document.querySelectorAll('.btn-map').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const destino = btn.dataset.destino;
        this.zoomToMarker(destino);
      });
    });
  },

  // Filter markers by category
  filterMarkers(filter) {
    if (filter === 'all') {
      Object.values(this.overlayLayers).forEach(layer => {
        this.map.addLayer(layer);
      });
    } else {
      Object.entries(this.overlayLayers).forEach(([type, layer]) => {
        if (type === filter) {
          this.map.addLayer(layer);
        } else {
          this.map.removeLayer(layer);
        }
      });
    }
    
    this.fitToVisibleMarkers();
  },

  // Fit map to visible markers
  fitToVisibleMarkers() {
    const bounds = new L.LatLngBounds();
    
    Object.entries(this.overlayLayers).forEach(([type, layer]) => {
      if (this.map.hasLayer(layer)) {
        layer.eachLayer(marker => {
          bounds.extend(marker.getLatLng());
        });
      }
    });
    
    if (bounds.isValid()) {
      this.map.fitBounds(bounds, { 
        padding: [50, 50],
        maxZoom: 12
      });
    } else {
      this.map.setView(MAP_CONFIG.center, 9);
    }
  },

  // Zoom to a specific marker
  zoomToMarker(markerName) {
    const marker = this.markers[markerName];
    if (marker) {
      let type;
      for (const [key, layer] of Object.entries(this.overlayLayers)) {
        if (layer.hasLayer(marker)) {
          type = key;
          break;
        }
      }
      
      if (type) {
        this.filterMarkers(type);
        
        document.querySelectorAll('.btn-filter').forEach(btn => {
          btn.classList.remove('active');
          if (btn.dataset.filter === type) {
            btn.classList.add('active');
          }
        });
      }
      
      this.map.setView(marker.getLatLng(), 14);
      marker.openPopup();
    }
  }
};

// Navigation Module
const Navigation = {
  init() {
    this.initMobileMenu();
    this.initSmoothScroll();
    this.initNavbarScroll();
  },

  // Initialize mobile menu functionality
  initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (!hamburger || !navLinks) return;
    
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
    
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
  },

  // Initialize smooth scroll for anchor links
  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const navbar = document.querySelector('.navbar');
          const offset = navbar ? navbar.offsetHeight : 0;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  },

  // Handle navbar scroll effects
  initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }
};

// Animations Module
const Animations = {
  init() {
    this.initScrollAnimations();
  },

  // Initialize scroll animations
  initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.destino-card, .hotel-card, .section-title, .route-card').forEach(el => {
      observer.observe(el);
    });
  }
};

// Comments System
class ComentariosSystem {
  constructor() {
    this.comentariosContainer = document.getElementById('lista-comentarios');
    this.formComentario = document.getElementById('form-comentario');
    this.paginaActual = document.getElementById('pagina')?.value || 'index';
    
    if (this.comentariosContainer && this.formComentario) {
      this.init();
    }
  }
  
  init() {
    this.cargarComentarios();
    this.formComentario.addEventListener('submit', (e) => this.enviarComentario(e));
  }
  
  // Load comments from server
  cargarComentarios() {
    const formData = new FormData();
    formData.append('action', 'fetch');
    formData.append('pagina', this.paginaActual);

    fetch('comentarios.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        this.mostrarComentarios(data.comentarios);
      } else {
        console.error('Error:', data.message);
      }
    })
    .catch(error => console.error('Error:', error));
  }

  // Display comments in the UI
  mostrarComentarios(comentarios) {
    this.comentariosContainer.innerHTML = '';

    if (comentarios.length === 0) {
      this.comentariosContainer.innerHTML = '<p class="no-comments">No hay comentarios aún. ¡Sé el primero en comentar!</p>';
      return;
    }

    comentarios.forEach(comentario => {
      const fecha = new Date(comentario.fecha);
      const fechaFormateada = fecha.toLocaleDateString('es-MX', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });

      const comentarioHTML = `
        <div class="comentario">
          <div class="comentario-header">
            <div class="comentario-avatar">
              ${comentario.nombre.charAt(0).toUpperCase()}
            </div>
            <div class="comentario-info">
              <h4>${comentario.nombre}</h4>
              <span class="comentario-fecha">${fechaFormateada}</span>
            </div>
          </div>
          <div class="comentario-texto">
            <p>${comentario.comentario}</p>
          </div>
        </div>
      `;
      this.comentariosContainer.insertAdjacentHTML('beforeend', comentarioHTML);
    });
  }

  // Send new comment to server
  enviarComentario(e) {
    e.preventDefault();
    
    const formData = new FormData(this.formComentario);
    formData.append('action', 'insert');
    const btnSubmit = this.formComentario.querySelector('button[type="submit"]');
    const btnTextOriginal = btnSubmit.textContent;
    
    btnSubmit.disabled = true;
    btnSubmit.textContent = 'Enviando...';

    fetch('comentarios.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert(data.message);
        this.formComentario.reset();
        this.cargarComentarios();
      } else {
        alert('Error: ' + data.message);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Ocurrió un error al enviar el comentario');
    })
    .finally(() => {
      btnSubmit.disabled = false;
      btnSubmit.textContent = btnTextOriginal;
    });
  }
}

// Weather Module
const Weather = {
  init() {
    this.setupWeatherWidgets();
  },

  // Setup weather widgets for destinations
  setupWeatherWidgets() {
    document.querySelectorAll('.destino-clima').forEach(widget => {
      const ciudad = widget.dataset.ciudad;
      if (ciudad) {
        this.getWeatherData(ciudad, widget);
      }
    });
  },

  // Get weather data from OpenWeatherMap API
  getWeatherData(ciudad, widget) {
    const API_KEY = 'YOUR_OPENWEATHERMAP_API_KEY'; // Replace with your actual API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},MX&units=metric&appid=${API_KEY}&lang=es`;
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.cod === 200) {
          this.updateWeatherWidget(widget, data);
        } else {
          widget.innerHTML = '<i class="fas fa-question"></i>';
        }
      })
      .catch(() => {
        widget.innerHTML = '<i class="fas fa-question"></i>';
      });
  },

  // Update weather widget with data
  updateWeatherWidget(widget, data) {
    const temp = Math.round(data.main.temp);
    const icon = data.weather[0].icon;
    const description = data.weather[0].description;
    
    widget.innerHTML = `
      <img src="https://openweathermap.org/img/wn/${icon}.png" alt="${description}">
      <span>${temp}°C</span>
    `;
  }
};

// Contact Form Module
const ContactForm = {
  init() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', (e) => this.handleSubmit(e));
  },

  // Handle form submission
  handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    
    // Simulate form submission (in a real app, you would send to a server)
    setTimeout(() => {
      this.showSuccessModal();
      form.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }, 1500);
  },

  // Show success modal after form submission
  showSuccessModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
      modal.style.display = 'flex';
      
      // Close modal when clicking X or button
      document.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
      });
      
      document.querySelector('.modal-btn').addEventListener('click', () => {
        modal.style.display = 'none';
      });
      
      // Close when clicking outside modal
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.style.display = 'none';
        }
      });
    }
  }
};

// Hotel Filtering Module
const HotelFilter = {
  init() {
    const filterButtons = document.querySelectorAll('.btn-filtro');
    if (!filterButtons.length) return;
    
    filterButtons.forEach(button => {
      button.addEventListener('click', () => this.filterHotels(button));
    });
  },

  // Filter hotels by category
  filterHotels(button) {
    const category = button.dataset.categoria;
    
    // Update active button
    document.querySelectorAll('.btn-filtro').forEach(btn => {
      btn.classList.remove('active');
    });
    button.classList.add('active');
    
    // Filter hotel cards
    document.querySelectorAll('.hotel-card').forEach(card => {
      if (category === 'todos' || card.dataset.categoria.includes(category)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }
};

// Initialize all modules when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  Navigation.init();
  Animations.init();
  InteractiveMap.init();
  new ComentariosSystem();
  Weather.init();
  ContactForm.init();
  HotelFilter.init();
  
  // Update copyright year
  document.getElementById('year').textContent = new Date().getFullYear();
});

// Fix map size on window load
window.addEventListener('load', () => {
  if (InteractiveMap.map) {
    InteractiveMap.map.invalidateSize();
  }
});