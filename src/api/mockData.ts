import type { Banner, Category, Product } from '../types';

export const MOCK_BANNERS: Banner[] = [
  {
    id: 1,
    title: "Yangi Kolleksiya 2025",
    subtitle: "Eng yaxshi mahsulotlar sizni kutmoqda — tez yetkazib beramiz",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&h=560&fit=crop",
    ctaText: "Xarid qilish"
  },
  {
    id: 2,
    title: "Yozgi Chegirmalar 50%",
    subtitle: "Faqat bu hafta — barcha elektronika mahsulotlarda",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1400&h=560&fit=crop",
    ctaText: "Ko'rish"
  },
  {
    id: 3,
    title: "Sport Mavsumi Boshlandi",
    subtitle: "Nike, Adidas, Puma — eng yaxshi sporttovarlar",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1400&h=560&fit=crop",
    ctaText: "Tanlash"
  }
];

export const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: "Elektronika", icon: "💻" },
  { id: 2, name: "Kiyim", icon: "👕" },
  { id: 3, name: "Sport", icon: "⚽" },
  { id: 4, name: "Uy jihozlari", icon: "🛋️" },
  { id: 5, name: "Kitoblar", icon: "📚" },
  { id: 6, name: "Go'zallik", icon: "💄" },
  { id: 7, name: "O'yinchoqlar", icon: "🧸" },
  { id: 8, name: "Oziq-ovqat", icon: "🍎" }
];

export const MOCK_PRODUCTS: Product[] = [
  // Elektronika
  {
    id: 1, title: 'Apple MacBook Pro 16"', price: 18990000,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop",
    categoryId: 1, rating: 4.9, brand: "Apple", stock: 8,
    description: "Apple M3 Pro chip, 18GB unified memory, 512GB SSD. 16 dyuymli Liquid Retina XDR ekran, 22 soat batareya muddati. Professional ishlar uchun eng kuchli noutbuk."
  },
  {
    id: 2, title: "Samsung Galaxy S24 Ultra", price: 9990000,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600&h=600&fit=crop",
    categoryId: 1, rating: 4.7, brand: "Samsung", stock: 22,
    description: "Snapdragon 8 Gen 3, 12GB RAM, 256GB xotira. 200MP kamera, 5000mAh batareya, S Pen bilan. Galaxy AI funksiyalari mavjud."
  },
  {
    id: 3, title: "Sony WH-1000XM5", price: 3990000,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
    categoryId: 1, rating: 4.8, brand: "Sony", stock: 15,
    description: "Dunyoning eng yaxshi shovqin o'chiruvchi quloqchini. 30 soat batareya, 8 mikrofon, LDAC kodek. Bir vaqtda 2 ta qurilmaga ulaning."
  },
  {
    id: 4, title: "Apple AirPods Pro 2", price: 3490000,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&h=600&fit=crop",
    categoryId: 1, rating: 4.6, brand: "Apple", stock: 30,
    description: "H2 chip, Adaptive Audio, Personalized Spatial Audio. 6 soat tinglash + 30 soat quti. MagSafe zaryadlash."
  },
  {
    id: 5, title: "Apple Watch Series 9", price: 4990000,
    image: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=600&h=600&fit=crop",
    categoryId: 1, rating: 4.7, brand: "Apple", stock: 12,
    description: "S9 chip, Double Tap gest, 2000 nit yorqinlik. Qon kislorodi, yurak urish sensori. WR50 suv himoyasi. 18 soat batareya."
  },
  {
    id: 6, title: "iPad Pro 12.9\" M2", price: 12500000,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&h=600&fit=crop",
    categoryId: 1, rating: 4.8, brand: "Apple", stock: 10,
    description: "M2 chip, 12.9 dyuymli Liquid Retina XDR ekran, 8GB RAM, 256GB. Apple Pencil va Magic Keyboard qo'llab-quvvatlash."
  },
  {
    id: 7, title: "Samsung 4K QLED TV 55\"", price: 8500000,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829e1?w=600&h=600&fit=crop",
    categoryId: 1, rating: 4.5, brand: "Samsung", stock: 6,
    description: "55 dyuymli QLED 4K, 120Hz, HDR10+, Dolby Atmos. Smart TV, WiFi, Bluetooth. Gaming Mode va Motion Xcelerator 120."
  },
  {
    id: 8, title: "Canon EOS R6 Mark II", price: 22000000,
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=600&h=600&fit=crop",
    categoryId: 1, rating: 4.9, brand: "Canon", stock: 4,
    description: "40 MP full-frame sensor, 40fps burst shooting, 6K RAW video. In-body stabilization, weather-sealed korpus. Professional fotograf uchun."
  },
  // Kiyim
  {
    id: 9, title: "Nike Air Max 270", price: 1490000,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
    categoryId: 2, rating: 4.5, brand: "Nike", stock: 45,
    description: "Nike Air Max 270 — maksimal qulaylik va zamonaviy dizayn. Eng katta Air birliği, yengil mesh yuqori qism. Kundalik foydalanish uchun ideal."
  },
  {
    id: 10, title: "Adidas Ultraboost 23", price: 1290000,
    image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&h=600&fit=crop",
    categoryId: 2, rating: 4.3, brand: "Adidas", stock: 35,
    description: "Boost texnologiyasi maksimal energiya qaytaradi. Primeknit+ yuqori qism. Yugurish va sport uchun. Hamma mavsumda qulaylik."
  },
  {
    id: 11, title: "Levi's 501 Original Jeans", price: 890000,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&h=600&fit=crop",
    categoryId: 2, rating: 4.4, brand: "Levi's", stock: 60,
    description: "1873 yildan beri eng mashhur jins. 100% paxta, klassik kesim. Har qanday kiyim bilan mos keladi. Mustahkam va uzoq xizmat qiladi."
  },
  {
    id: 12, title: "The North Face Puffer Jacket", price: 2490000,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=600&fit=crop",
    categoryId: 2, rating: 4.6, brand: "The North Face", stock: 20,
    description: "700-fill duck down, DWR himoya qoplamasi. -20°C gacha issiqlik. Yengil va siqiluvchan. Tog' va shahar uchun universal kiyim."
  },
  // Sport
  {
    id: 13, title: "Yoga Mat Pro 6mm", price: 450000,
    image: "https://images.unsplash.com/photo-1601925228008-d68da5a36f27?w=600&h=600&fit=crop",
    categoryId: 3, rating: 4.4, brand: "Liforme", stock: 55,
    description: "6mm qalinlik, yopishqoq yuzasi, ekologik toza materialdan. 185x68 sm. Yelka tasmalari bilan. Barcha yoga turlari uchun ideal."
  },
  {
    id: 14, title: "Wilson Pro Tennis Racket", price: 1890000,
    image: "https://images.unsplash.com/photo-1617083934551-ac1f56e4e48b?w=600&h=600&fit=crop",
    categoryId: 3, rating: 4.6, brand: "Wilson", stock: 18,
    description: "Carbon fiber frame, 100 sq inch head size. Amatördan professional darajagacha. Vibration dampening texnologiyasi. Cover bilan birga."
  },
  {
    id: 15, title: "Garmin Forerunner 955", price: 5990000,
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600&h=600&fit=crop",
    categoryId: 3, rating: 4.7, brand: "Garmin", stock: 10,
    description: "GPS, yurak urish, kislorod sensori. Triathlon rejimi, 15 sport turi. 15 kun batareya muddati. Harita yuklab olish imkoniyati."
  },
  {
    id: 16, title: "Adidas Football Pro", price: 290000,
    image: "https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=600&h=600&fit=crop",
    categoryId: 3, rating: 4.2, brand: "Adidas", stock: 80,
    description: "FIFA sertifikatlangan professional futbol to'pi. Thermally bonded panellar, barqaror uchish. Har qanday maydon uchun mos."
  },
  // Uy jihozlari
  {
    id: 17, title: "Dyson V15 Detect", price: 7990000,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
    categoryId: 4, rating: 4.8, brand: "Dyson", stock: 9,
    description: "Lazer texnologiyasi changlarnı ko'rsatadi. 60 daqiqa ishlash, HEPA filtr. 14 aksesuar bilan. Simsiz, engil va kuchli."
  },
  {
    id: 18, title: "Nespresso Vertuo Next", price: 2190000,
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&h=600&fit=crop",
    categoryId: 4, rating: 4.5, brand: "Nespresso", stock: 25,
    description: "Barcode texnologiyasi — har bir kapsulani avtomatik taniydi. 5 o'lcham kofe. 15 soniyada qiziydi. 1.1L suv idishi."
  },
  {
    id: 19, title: "IKEA POÄNG Armchair", price: 1590000,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop",
    categoryId: 4, rating: 4.3, brand: "IKEA", stock: 30,
    description: "Klassik Skandinaviya dizayni. Bukiluvchan qayin ramka, yum. to'ldirish. Oson yig'ish. Ko'plab rang variantlari mavjud."
  },
  {
    id: 20, title: "Philips Hue Starter Kit", price: 1890000,
    image: "https://images.unsplash.com/photo-1558089687-f282ffcbc0d6?w=600&h=600&fit=crop",
    categoryId: 4, rating: 4.4, brand: "Philips", stock: 35,
    description: "3 ta aqlli chiroq + Bridge. 16 million rang, tovush bilan boshqarish. Alexa, Google Assistant, Apple HomeKit bilan mos."
  },
  // Kitoblar
  {
    id: 21, title: "Atomic Habits — James Clear", price: 129000,
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&h=600&fit=crop",
    categoryId: 5, rating: 4.9, brand: "Penguin Books", stock: 100,
    description: "Yaxshi odatlar yaratish va yomon odatlardan qutulish bo'yicha #1 bestseller. 10 million nusxa sotilgan. O'zbek tilida."
  },
  {
    id: 22, title: "The Psychology of Money", price: 115000,
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&h=600&fit=crop",
    categoryId: 5, rating: 4.8, brand: "Harriman House", stock: 80,
    description: "Morgan Housel — pul va boylik haqida 19 ta qisqa hikoya. Moliyaviy qarorlar qabul qilishni o'rgatadi. Dunyoda 4M+ nusxa."
  },
  // Go'zallik
  {
    id: 23, title: "La Mer Moisturizing Cream", price: 3990000,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop",
    categoryId: 6, rating: 4.7, brand: "La Mer", stock: 15,
    description: "Miracle Broth formulasi, dengiz o'tlari ekstrakti. Terini tiklovchi va namlovchi premium krem. 60ml. Barcha teri turlari uchun."
  },
  {
    id: 24, title: "Dyson Airwrap Complete", price: 8990000,
    image: "https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=600&h=600&fit=crop",
    categoryId: 6, rating: 4.8, brand: "Dyson", stock: 8,
    description: "Curl, wave, smooth, dry — hammasi bir qurilmada. Coanda effekti. Issiqlik sensori 40 marta/soniya o'lchaydi. Bepul quti."
  }
];
