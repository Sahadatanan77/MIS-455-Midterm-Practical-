/**
 * AuraPulse Audio - Interactive Script
 * MIS 455 Midterm Practical Submission
 * Student: Md.Sahadat Hossain | ID: 2221634
 */

// Application State
let cart = JSON.parse(localStorage.getItem('aurapulse_cart')) || [];

// Update cart counter badge on load
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  setupToastContainer();
});

// Setup dynamic toast container
function setupToastContainer() {
  if (!document.getElementById('toast-container')) {
    const container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
}

// Show Toast Notification
function showToast(message, type = 'info') {
  setupToastContainer();
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = '🔔';
  if (type === 'success') icon = '✅';
  if (type === 'warning') icon = '⚠️';
  if (type === 'discount') icon = '🎉';
  
  toast.innerHTML = `<span>${icon}</span> <div>${message}</div>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// -------------------------------------------------------------
// Interactive Function 1: Add to Cart (Used by Product Buttons)
// -------------------------------------------------------------
function addToCart(productName, price) {
  cart.push({ name: productName, price: price, timestamp: new Date() });
  localStorage.setItem('aurapulse_cart', JSON.stringify(cart));
  updateCartBadge();
  showToast(`Added <strong>${productName}</strong> ($${price}) to your cart!`, 'success');
}

// Update Cart Badge Counter
function updateCartBadge() {
  const badge = document.getElementById('cart-count');
  if (badge) {
    badge.innerText = cart.length;
    badge.style.transform = 'scale(1.35)';
    setTimeout(() => { badge.style.transform = 'scale(1)'; }, 200);
  }
}

// -------------------------------------------------------------
// Interactive Function 2: Filter Products by Category
// -------------------------------------------------------------
function filterCategory(category, buttonElement) {
  // Update active state of filter buttons
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => btn.classList.remove('active'));
  if (buttonElement) {
    buttonElement.classList.add('active');
  }

  // Filter product cards
  const cards = document.querySelectorAll('.product-card');
  let visibleCount = 0;

  cards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'all' || cardCat === category) {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });

  showToast(`Showing ${visibleCount} product${visibleCount === 1 ? '' : 's'} in "${category.toUpperCase()}"`, 'info');
}

// -------------------------------------------------------------
// Interactive Function 3: Claim VIP Discount (Home Page Button)
// -------------------------------------------------------------
function claimOffer() {
  const couponCode = 'AURA-VIP-15';
  showToast(`Congratulations! Use coupon code <strong>${couponCode}</strong> at checkout for 15% OFF!`, 'discount');
  
  // Also display interactive alert
  setTimeout(() => {
    alert(`🎉 VIP Voucher Activated!\n\nCoupon Code: ${couponCode}\nDiscount: 15% Off Any Audio Hardware\nValidity: Next 24 Hours\n\nStudent Project Submission for: Md.Sahadat Hossain (ID: 2221634)`);
  }, 350);
}

// -------------------------------------------------------------
// Interactive Function 4: Audio Calibration / Acoustic Sample
// -------------------------------------------------------------
function playAudioDemo() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime); // 440 Hz (Concert A)
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.4);
      osc.frequency.exponentialRampToValueAtTime(523.25, ctx.currentTime + 0.8);
      
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
      
      showToast('🔊 Playing 96kHz Hi-Res Acoustic Sweep Demo...', 'info');
    } else {
      showToast('🔊 Spatial Acoustic simulation activated!', 'info');
    }
  } catch (e) {
    showToast('🔊 Spatial Acoustic simulation activated!', 'info');
  }
}

// -------------------------------------------------------------
// Interactive Function 5: Newsletter Subscription
// -------------------------------------------------------------
function subscribeNewsletter(event) {
  if (event) event.preventDefault();
  const input = document.getElementById('newsletter-email');
  if (!input || !input.value.trim()) {
    showToast('Please enter a valid email address.', 'warning');
    return;
  }
  const email = input.value.trim();
  showToast(`Subscribed ${email} to AuraPulse VIP Insider updates!`, 'success');
  input.value = '';
}

// -------------------------------------------------------------
// Interactive Function 6: Quick View Modal Specs
// -------------------------------------------------------------
function openQuickView(productName, price, specs) {
  const modal = document.getElementById('app-modal');
  const modalBody = document.getElementById('modal-body-content');
  if (modal && modalBody) {
    modalBody.innerHTML = `
      <div style="text-align: center; margin-bottom: 1.25rem;">
        <span style="display:inline-block; padding: 4px 12px; background: rgba(6,182,212,0.15); color: #38bdf8; border-radius: 9999px; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.5rem;">QUICK SPECIFICATION</span>
        <h2 style="color: #fff; font-size: 1.6rem; margin-bottom: 0.25rem;">${productName}</h2>
        <p style="color: #38bdf8; font-size: 1.3rem; font-weight: 800;">$${price}</p>
      </div>
      <div style="background: #0f172a; padding: 1.2rem; border-radius: 8px; border: 1px solid #27354f; margin-bottom: 1.5rem;">
        <h4 style="color: #e2e8f0; margin-bottom: 0.5rem; font-size: 0.95rem;">Key Engineering Specs:</h4>
        <p style="color: #94a3b8; font-size: 0.9rem; line-height: 1.6;">${specs}</p>
      </div>
      <div style="display: flex; gap: 1rem; justify-content: flex-end;">
        <button class="btn btn-secondary" onclick="closeModal()">Close</button>
        <button class="btn btn-primary" onclick="addToCart('${productName}', ${price}); closeModal();">Add to Cart</button>
      </div>
    `;
    modal.classList.add('active');
  }
}

// Close Modal
function closeModal() {
  const modal = document.getElementById('app-modal');
  if (modal) modal.classList.remove('active');
}

// -------------------------------------------------------------
// Interactive Function 7: Open Cart Drawer / Modal
// -------------------------------------------------------------
function openCartModal() {
  const modal = document.getElementById('app-modal');
  const modalBody = document.getElementById('modal-body-content');
  if (!modal || !modalBody) return;

  if (cart.length === 0) {
    modalBody.innerHTML = `
      <div style="text-align: center; padding: 1.5rem 0;">
        <div style="font-size: 3rem; margin-bottom: 1rem;">🛒</div>
        <h3 style="color: #fff; margin-bottom: 0.5rem;">Your Cart is Empty</h3>
        <p style="color: #94a3b8; margin-bottom: 1.5rem;">Explore our studio audio gear and add products to your bag.</p>
        <a href="products.html" class="btn btn-primary" onclick="closeModal()">Browse Products</a>
      </div>
    `;
  } else {
    let subtotal = cart.reduce((sum, item) => sum + Number(item.price), 0);
    let itemsHtml = cart.map((item, idx) => `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 0.6rem 0; border-bottom: 1px solid #27354f;">
        <div>
          <strong style="color: #f8fafc; font-size: 0.95rem;">${item.name}</strong>
          <div style="color: #64748b; font-size: 0.8rem;">Item #${idx + 1}</div>
        </div>
        <div style="color: #38bdf8; font-weight: 700;">$${item.price}</div>
      </div>
    `).join('');

    modalBody.innerHTML = `
      <div style="margin-bottom: 1rem;">
        <h3 style="color: #fff; font-size: 1.4rem; margin-bottom: 0.25rem;">Your Shopping Bag (${cart.length})</h3>
        <p style="color: #94a3b8; font-size: 0.85rem;">Review items and proceed to student demo checkout.</p>
      </div>
      <div style="max-height: 240px; overflow-y: auto; margin-bottom: 1.25rem;">
        ${itemsHtml}
      </div>
      <div style="display: flex; justify-content: space-between; align-items: center; padding-block: 0.75rem; border-top: 2px solid #334155; margin-bottom: 1.5rem;">
        <span style="font-size: 1.1rem; font-weight: 700; color: #fff;">Subtotal:</span>
        <span style="font-size: 1.3rem; font-weight: 800; color: #38bdf8;">$${subtotal.toFixed(2)}</span>
      </div>
      <div style="display: flex; gap: 0.75rem; justify-content: flex-end; flex-wrap: wrap;">
        <button class="btn btn-outline" onclick="clearCart()">Empty Cart</button>
        <button class="btn btn-primary" onclick="checkoutDemo(${subtotal.toFixed(2)})">Checkout ($${subtotal.toFixed(2)})</button>
      </div>
    `;
  }
  modal.classList.add('active');
}

// Clear Cart
function clearCart() {
  cart = [];
  localStorage.removeItem('aurapulse_cart');
  updateCartBadge();
  closeModal();
  showToast('Your shopping cart has been cleared.', 'info');
}

// Checkout simulation
function checkoutDemo(total) {
  closeModal();
  alert(`🛍️ Order Placed Successfully!\n\nOrder Reference: #AURA-${Math.floor(100000 + Math.random() * 900000)}\nTotal Paid: $${total}\n\nThank you for exploring this MIS 455 project created by:\nMd.Sahadat Hossain (ID: 2221634)`);
  cart = [];
  localStorage.removeItem('aurapulse_cart');
  updateCartBadge();
}

// -------------------------------------------------------------
// Interactive Function 8: Contact Form Submission & Validation
// -------------------------------------------------------------
function submitContactForm() {
  const nameInput = document.getElementById('contact-name');
  const emailInput = document.getElementById('contact-email');
  const subjectInput = document.getElementById('contact-subject');
  const messageInput = document.getElementById('contact-message');

  if (!nameInput || !emailInput || !messageInput) return;

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const subject = subjectInput ? subjectInput.value.trim() : 'General Inquiry';
  const message = messageInput.value.trim();

  // Validate inputs
  if (!name) {
    showToast('Please enter your full name.', 'warning');
    nameInput.focus();
    return;
  }
  if (!email || !email.includes('@') || !email.includes('.')) {
    showToast('Please provide a valid email address.', 'warning');
    emailInput.focus();
    return;
  }
  if (!message || message.length < 10) {
    showToast('Please enter a message of at least 10 characters.', 'warning');
    messageInput.focus();
    return;
  }

  // Display simulated success
  showToast(`Thank you, ${name}! Your inquiry has been dispatched to our engineering team.`, 'success');
  
  // Alert confirmation
  setTimeout(() => {
    alert(`📨 Message Dispatched Successfully!\n\nRecipient: AuraPulse Customer Support\nFrom: ${name} (${email})\nSubject: ${subject}\n\nTicket ID: #TK-${Math.floor(1000 + Math.random() * 9000)}\nEstimated response time: Under 15 minutes.\n\nProject Submitted by: Md.Sahadat Hossain (ID: 2221634)`);
    // Clear inputs
    resetContactForm(false);
  }, 300);
}

// Reset Contact Form
function resetContactForm(notify = true) {
  const form = document.getElementById('contact-form');
  if (form) form.reset();
  if (notify) {
    showToast('Contact form fields have been reset.', 'info');
  }
}

// -------------------------------------------------------------
// Interactive Function 9: Schedule Studio Demo
// -------------------------------------------------------------
function scheduleAudioDemo() {
  const studentInfo = 'Md.Sahadat Hossain (ID: 2221634)';
  alert(`🎧 VIP Acoustic Studio Demo Scheduled!\n\nLocation: Plot 15, Block B, Aftabnagar, Dhaka\nDate: Tomorrow at 3:00 PM\nSession: High-Fidelity Lossless Listening Lounge\nHost: Senior Acoustic Engineer\n\nDeveloper & Submitter: ${studentInfo}`);
  showToast('VIP Studio Demo session reserved successfully!', 'success');
}
