'use client';

import { useState } from 'react';
import { useCart } from '@/context/cart';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { FiShoppingBag, FiCreditCard, FiTruck, FiLock, FiChevronRight, FiChevronLeft, FiMail, FiPhone, FiMapPin, FiCheck } from 'react-icons/fi';

type FormData = {
  // Contact Information
  email: string;
  phone: string;

  // Shipping Information
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;

  // Payment Information
  cardNumber: string;
  cardName: string;
  expiryDate: string;
  cvv: string;

  // Billing same as shipping
  billingSameAsShipping: boolean;
};

export default function CheckoutPage() {
  const { items, count, clear } = useCart();
  const router = useRouter();
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState<FormData>({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    province: 'Gauteng',
    postalCode: '',
    country: 'South Africa',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    billingSameAsShipping: true,
  });

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const shipping = subtotal > 50000 ? 0 : 9900; // Free shipping over R500
  const total = subtotal + shipping;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const validateShipping = () => {
    const { email, firstName, lastName, address, city, postalCode, phone } = formData;
    return email && firstName && lastName && address && city && postalCode && phone;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 'shipping') {
      if (validateShipping()) {
        setStep('payment');
      } else {
        alert('Please fill in all shipping information');
      }
      return;
    }

    // Process payment
    setLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // In a real app, you would send this to your payment processor
    console.log('Processing order:', { formData, items, total });
    
    // Clear cart and redirect to success page
    clear();
    router.push('/checkout/success');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-32 text-center">
          <FiShoppingBag className="w-16 h-16 mx-auto mb-6 text-white/40" />
          <h1 className="text-3xl font-black mb-4">Your cart is empty</h1>
          <p className="text-white/60 mb-8">Add some items to your cart to checkout</p>
          <Link
            href="/merch"
            className="inline-flex items-center gap-2 bg-brand-yellow text-black px-6 py-3 rounded-full font-bold hover:bg-yellow-300 transition"
          >
            Continue Shopping
            <FiChevronRight />
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-24 md:py-32">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black mb-4">Checkout</h1>
          <div className="flex items-center gap-4 text-sm">
            <div className={`flex items-center gap-2 ${step === 'shipping' ? 'text-brand-yellow' : 'text-white'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'shipping' ? 'bg-brand-yellow text-black' : 'bg-white/10'}`}>
                1
              </div>
              <span className="hidden sm:inline">Shipping</span>
            </div>
            <div className="flex-1 h-px bg-white/10" />
            <div className={`flex items-center gap-2 ${step === 'payment' ? 'text-brand-yellow' : 'text-white/40'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step === 'payment' ? 'bg-brand-yellow text-black' : 'bg-white/10'}`}>
                2
              </div>
              <span className="hidden sm:inline">Payment</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form Section */}
          <div className="order-2 lg:order-1">
            <form onSubmit={handleSubmit} className="space-y-8">
              {step === 'shipping' && (
                <>
                  {/* Contact Information */}
                  <section className="space-y-4">
                    <h2 className="text-xl font-black flex items-center gap-2">
                      <FiTruck className="text-brand-yellow" />
                      Contact Information
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold mb-2">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-yellow transition"
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-semibold mb-2">
                          Phone Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-yellow transition"
                          placeholder="+27 XX XXX XXXX"
                        />
                      </div>
                    </div>
                  </section>

                  {/* Shipping Address */}
                  <section className="space-y-4">
                    <h2 className="text-xl font-black">Shipping Address</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-semibold mb-2">
                          First Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-yellow transition"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-semibold mb-2">
                          Last Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-yellow transition"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="address" className="block text-sm font-semibold mb-2">
                        Street Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-yellow transition"
                        placeholder="123 Main Street"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-semibold mb-2">
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-yellow transition"
                        />
                      </div>
                      <div>
                        <label htmlFor="province" className="block text-sm font-semibold mb-2">
                          Province <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="province"
                          name="province"
                          value={formData.province}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-yellow transition"
                        >
                          <option value="Gauteng">Gauteng</option>
                          <option value="Western Cape">Western Cape</option>
                          <option value="Eastern Cape">Eastern Cape</option>
                          <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                          <option value="Free State">Free State</option>
                          <option value="Limpopo">Limpopo</option>
                          <option value="Mpumalanga">Mpumalanga</option>
                          <option value="Northern Cape">Northern Cape</option>
                          <option value="North West">North West</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="postalCode" className="block text-sm font-semibold mb-2">
                          Postal Code <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          required
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-yellow transition"
                          placeholder="0000"
                        />
                      </div>
                      <div>
                        <label htmlFor="country" className="block text-sm font-semibold mb-2">
                          Country <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          readOnly
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/60"
                        />
                      </div>
                    </div>
                  </section>

                  <button
                    type="submit"
                    className="w-full bg-brand-yellow text-black px-6 py-4 rounded-full font-black text-lg hover:bg-yellow-300 transition flex items-center justify-center gap-2"
                  >
                    Continue to Payment
                    <FiChevronRight />
                  </button>
                </>
              )}

              {step === 'payment' && (
                <>
                  {/* Payment Information */}
                  <section className="space-y-4">
                    <h2 className="text-xl font-black flex items-center gap-2">
                      <FiCreditCard className="text-brand-yellow" />
                      Payment Information
                    </h2>

                    <div className="bg-white/5 border border-white/10 rounded-lg p-4 flex items-center gap-3 text-sm">
                      <FiLock className="text-brand-yellow" />
                      <span className="text-white/80">Your payment information is secure and encrypted</span>
                    </div>

                    <div>
                      <label htmlFor="cardNumber" className="block text-sm font-semibold mb-2">
                        Card Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="cardNumber"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                        maxLength={19}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-yellow transition"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>

                    <div>
                      <label htmlFor="cardName" className="block text-sm font-semibold mb-2">
                        Cardholder Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="cardName"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-yellow transition"
                        placeholder="Name on card"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block text-sm font-semibold mb-2">
                          Expiry Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="expiryDate"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          required
                          maxLength={5}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-yellow transition"
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <label htmlFor="cvv" className="block text-sm font-semibold mb-2">
                          CVV <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          required
                          maxLength={4}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-brand-yellow transition"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </section>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      type="button"
                      onClick={() => setStep('shipping')}
                      className="flex-1 border border-white/10 text-white px-6 py-4 rounded-full font-bold hover:bg-white/5 transition"
                    >
                      Back to Shipping
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex-1 bg-brand-yellow text-black px-6 py-4 rounded-full font-black text-lg hover:bg-yellow-300 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <span className="animate-spin">⏳</span>
                          Processing...
                        </>
                      ) : (
                        <>
                          <FiLock />
                          Complete Order
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>

          {/* Order Summary */}
          <div className="order-1 lg:order-2">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 lg:sticky lg:top-24">
              <h2 className="text-xl font-black mb-6">Order Summary</h2>

              {/* Items */}
              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size || 'nosize'}`} className="flex gap-4">
                    <div className="relative w-20 h-20 bg-white/5 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-contain"
                      />
                      <div className="absolute -top-2 -right-2 bg-brand-yellow text-black w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                        {item.qty}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{item.product.name}</h3>
                      {item.size && (
                        <p className="text-xs text-white/60 mt-1">Size: {item.size}</p>
                      )}
                      <p className="text-sm text-white/80 mt-1">
                        R {(item.product.price / 100).toFixed(2)} × {item.qty}
                      </p>
                    </div>
                    <div className="font-bold">
                      R {((item.product.price * item.qty) / 100).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-white/10 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Subtotal</span>
                  <span className="font-semibold">R {(subtotal / 100).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/60">Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-brand-yellow">FREE</span>
                    ) : (
                      `R ${(shipping / 100).toFixed(2)}`
                    )}
                  </span>
                </div>
                {subtotal < 50000 && (
                  <div className="text-xs text-white/60 bg-brand-yellow/10 border border-brand-yellow/20 rounded p-2">
                    Add R {((50000 - subtotal) / 100).toFixed(2)} more for free shipping
                  </div>
                )}
                <div className="border-t border-white/10 pt-3 flex justify-between text-lg font-black">
                  <span>Total</span>
                  <span className="text-brand-yellow">R {(total / 100).toFixed(2)}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                <div className="flex items-center gap-3 text-sm text-white/60">
                  <FiLock className="text-brand-yellow" />
                  <span>Secure checkout</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/60">
                  <FiTruck className="text-brand-yellow" />
                  <span>Free returns within 30 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
