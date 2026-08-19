const WHATSAPP_NUMBER = "628123456789";
const DEFAULT_MESSAGE = "Saya ingin pesan kue 50";

function whatsappUrl(message = DEFAULT_MESSAGE) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function formatRupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);
}

function createProductCard(product) {
  const message = `Saya ingin pesan ${product.nama} 50`;

  return `
    <article class="product-card">
      <img src="${product.gambar}" alt="${product.nama} Dapur Rani" loading="lazy">
      <div class="product-info">
        <div class="product-top">
          <h3>${product.nama}</h3>
          <span class="price">${formatRupiah(product.harga)}</span>
        </div>
        <p>${product.deskripsi}</p>
        <a class="btn secondary" href="${whatsappUrl(message)}" target="_blank" rel="noopener">
          Pesan ${product.nama}
        </a>
      </div>
    </article>
  `;
}

function setWhatsappLinks() {
  const linkIds = ["heroWhatsapp", "ctaWhatsapp", "footerWhatsapp"];

  linkIds.forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.href = whatsappUrl();
    }
  });
}

async function loadProducts() {
  const productGrid = document.getElementById("productGrid");

  try {
    const response = await fetch("data.json");

    if (!response.ok) {
      throw new Error("Data produk tidak bisa dimuat.");
    }

    const products = await response.json();
    productGrid.innerHTML = products.map(createProductCard).join("");
  } catch (error) {
    productGrid.innerHTML = `
      <p class="error-message">
        Maaf, katalog sedang tidak bisa ditampilkan. Silakan hubungi WhatsApp Dapur Rani.
      </p>
    `;
  }
}

setWhatsappLinks();
loadProducts();
