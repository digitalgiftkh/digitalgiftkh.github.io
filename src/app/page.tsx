"use client"; // Required for client-side interactivity
import { useState } from "react";
import { categories, products, Product, Variation } from "../data/product";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeVariations, setActiveVariations] = useState<{ [productId: number]: string }>({});

  const filteredProducts = products.filter(
    (p) => selectedCategory === "all" || p.category === selectedCategory
  );

  const handleVariationClick = (productId: number, variationId: string) => {
    setActiveVariations((prev) => ({ ...prev, [productId]: variationId }));
  };

  return (
    <div className="container">
      <header>
        <div className="logo">
          <img src="/logo.JPG" alt="Digital Gift KH Logo" style={{ height: 50 }} />
        </div>
      </header>

      <section className="page-title">
        <h2>Our Digital Products</h2>
        <p>Discover our collection of unique digital gifts perfect for any occasion</p>
      </section>

      <section className="categories">
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-btn ${selectedCategory === cat.id ? "active" : ""}`}
            onClick={() => setSelectedCategory(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </section>

      <section className={`products-grid ${filteredProducts.length <= 3 ? "few-products" : ""}`}>
        {filteredProducts.map((product) => {
          const activeVariationId = activeVariations[product.id] || product.variations[0]?.id;
          const activeVariation = product.variations.find((v) => v.id === activeVariationId);

          return (
            <div key={product.id} className="product-card">
              <div className="product-image">
                {product.discount > 0 && <div className="discount-badge">{product.discount}% OFF</div>}
                {product.comingSoon && <div className="coming-soon-badge">Coming Soon</div>}
                <img src={activeVariation?.image || product.image} alt={product.name} className="product-main-image" />
              </div>

              <div className="product-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>

                {product.variations.length > 0 && (
                  <div className="variations">
                    <span className="variation-label">Theme:</span>
                    <div className="color-options">
                      {product.variations.map((v) => (
                        <div
                          key={v.id}
                          className={`color-option ${v.id === activeVariationId ? "active" : ""} ${product.variations.length === 1 ? "single-option" : ""}`}
                          style={{ backgroundColor: v.color }}
                          onClick={() => handleVariationClick(product.id, v.id)}
                        >
                          <div className="tooltip">{v.name}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="product-price">
                  <span className="price">
                    {product.originalPrice && <span className="original-price">${product.originalPrice.toFixed(2)}</span>}
                    ${product.price.toFixed(2)}
                  </span>
                  {product.comingSoon ? (
                    <button className="coming-soon-btn">Coming Soon</button>
                  ) : (
                    <button className="contact-us">Contact Us</button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <footer>
        <div className="social-icons">
          <a href="#"><i className="fab fa-facebook-f"></i></a>
          <a href="#"><i className="fab fa-instagram"></i></a>
          <a href="#"><i className="fab fa-tiktok"></i></a>
        </div>
        <p>&copy; 2025 Digital Gift KH. All rights reserved.</p>
      </footer>
    </div>
  );
}
