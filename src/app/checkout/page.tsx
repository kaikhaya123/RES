'use client';

import { useState, useEffect } from 'react';
import { useCart } from '@/context/cart';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Check } from 'lucide-react';

export default function CheckoutPage() {
  const { items, clear } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deliveryType, setDeliveryType] = useState<'delivery' | 'pickup'>('delivery');
  const [discountCode, setDiscountCode] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: 'South Africa',
    city: '',
    state: 'Gauteng',
    zipCode: '',
    shippingMethod: 'standard',
    paymentMethod: 'card',
  });

  const cartEntries = items.map(item => ({
    item: item.product,
    size: item.size,
    quantity: item.qty,
  }));

  // Convert prices from cents to rands
  const subtotal = items.reduce(
    (sum, item) => sum + (item.product.price / 100) * item.qty,
    0
  );

  const getShippingCost = () => {
    if (deliveryType === 'pickup') return 0;
    switch (formData.shippingMethod) {
      case 'courier-guy':
        return 85;
      case 'express':
        return 120;
      case 'standard':
      default:
        return 50;
    }
  };

  const shippingCost = getShippingCost();
  const savings = 0; // Can add discount logic
  const total = subtotal + shippingCost - savings;

  useEffect(() => {
    const emailInput = document.getElementById('email');
    emailInput?.focus();
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!agreeTerms) {
      alert('Please agree to the Terms and Conditions');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    clear();
    router.push('/checkout/success');
  };

  const applyDiscount = () => {
    // Discount logic here
    console.log('Applying discount:', discountCode);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)] pt-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center px-6"
          >
            <div className="w-24 h-24 mx-auto bg-amber-500/10 rounded-full flex items-center justify-center mb-6">
              <ShieldCheck className="w-12 h-12 text-amber-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Explore our exclusive R.E.S. merchandise!
            </p>
            <Link
              href="/merch"
              className="inline-block bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-700 transition-all"
            >
              Continue shopping
            </Link>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200 mt-20">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
          <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-8">
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500 flex items-center justify-center">
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-900 hidden sm:inline">Cart</span>
            </div>
            <div className="w-8 sm:w-12 md:w-20 h-0.5 bg-gray-300"></div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500 flex items-center justify-center">
                <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-900 hidden sm:inline">Review</span>
            </div>
            <div className="w-8 sm:w-12 md:w-20 h-0.5 bg-gray-300"></div>
            <div className="flex items-center gap-1 sm:gap-2">
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-amber-600 flex items-center justify-center text-white text-xs font-bold">
                3
              </div>
              <span className="text-xs sm:text-sm font-medium text-amber-600">Checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8">Checkout</h1>

        {/* Layout */}
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Left Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              {/* Shipping Information Card */}
              <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-200">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Shipping Information</h2>

                {/* Delivery/Pickup Toggle */}
                <div className="flex gap-2 sm:gap-3 mb-6">
                  <button
                    type="button"
                    onClick={() => setDeliveryType('delivery')}
                    className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 py-3 px-2 sm:px-4 rounded-lg border-2 transition-all text-sm sm:text-base ${
                      deliveryType === 'delivery'
                        ? 'border-amber-600 bg-amber-50 text-amber-700'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {/* Delivery icon here */}
                    <Image src="/Icons/fast-delivery.png" alt="Delivery" width={20} height={20} />
                    <span className="font-medium">Delivery</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeliveryType('pickup')}
                    className={`flex-1 flex items-center justify-center gap-1 sm:gap-2 py-3 px-2 sm:px-4 rounded-lg border-2 transition-all text-sm sm:text-base ${
                      deliveryType === 'pickup'
                        ? 'border-amber-600 bg-amber-50 text-amber-700'
                        : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                    }`}
                  >
                    {/* Pickup icon here */}
                    <Image src="/Icons/package-delivered.png" alt="Pick-up" width={20} height={20} />
                    <span className="font-medium">Pick-up</span>
                  </button>
                </div>

                {/* Full Name */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full name *</label>
                  <input
                    name="fullName"
                    type="text"
                    placeholder="Brandon John"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
                  />
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email address *</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter email address"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
                  />
                </div>

                {/* Phone Number */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone number *</label>
                  <div className="flex gap-2">
                    <select className="px-2 sm:px-3 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all w-20 sm:w-24">
                      <option value="+27">🇿🇦</option>
                      <option value="+1">🇺🇸</option>
                      <option value="+44">🇬🇧</option>
                    </select>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="flex-1 px-3 sm:px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
                    />
                  </div>
                </div>

                {/* Country */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full px-3 sm:px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
                  >
                    <option value="South Africa">South Africa</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                  </select>
                </div>

                {/* City, State, ZIP */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
                    <input
                      name="city"
                      type="text"
                      placeholder="Enter city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
                    >
                      <option value="Gauteng">Gauteng</option>
                      <option value="Western Cape">Western Cape</option>
                      <option value="KwaZulu-Natal">KwaZulu-Natal</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
                    <input
                      name="zipCode"
                      type="text"
                      placeholder="Enter ZIP"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                      className="w-full px-3 sm:px-4 py-3 text-base border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100 transition-all"
                    />
                  </div>
                </div>

                {/* Terms Checkbox */}
                <div className="mt-6">
                  <label className="flex items-start gap-2 sm:gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-1 w-4 h-4 sm:w-5 sm:h-5 accent-amber-600 shrink-0"
                    />
                    <span className="text-xs sm:text-sm text-gray-600 group-hover:text-gray-900">
                      I have read and agree to the{' '}
                      <Link href="/terms" className="text-amber-600 hover:underline">
                        Terms and Conditions
                      </Link>
                    </span>
                  </label>
                </div>
              </div>

              {/* Shipping Method */}
              {deliveryType === 'delivery' && (
                <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-200">
                  <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Shipping Method</h2>

                  <div className="space-y-3">
                    <label className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-amber-500 transition-all has-[:checked]:border-amber-600 has-[:checked]:bg-amber-50">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="standard"
                        checked={formData.shippingMethod === 'standard'}
                        onChange={handleChange}
                        className="w-5 h-5 accent-amber-600 shrink-0 mt-0.5 sm:mt-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 text-sm sm:text-base">Standard Shipping</div>
                        <div className="text-xs sm:text-sm text-gray-600">5–7 business days</div>
                      </div>
                      <div className="font-bold text-gray-900 text-base sm:text-lg shrink-0">R50</div>
                    </label>

                    <label className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-amber-500 transition-all has-[:checked]:border-amber-600 has-[:checked]:bg-amber-50">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="courier-guy"
                        checked={formData.shippingMethod === 'courier-guy'}
                        onChange={handleChange}
                        className="w-5 h-5 accent-amber-600 shrink-0 mt-0.5 sm:mt-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 text-sm sm:text-base">The Courier Guy</div>
                        <div className="text-xs sm:text-sm text-gray-600">3–4 business days • Tracking included</div>
                      </div>
                      <div className="font-bold text-gray-900 text-base sm:text-lg shrink-0">R85</div>
                    </label>

                    <label className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-amber-500 transition-all has-[:checked]:border-amber-600 has-[:checked]:bg-amber-50">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value="express"
                        checked={formData.shippingMethod === 'express'}
                        onChange={handleChange}
                        className="w-5 h-5 accent-amber-600 shrink-0 mt-0.5 sm:mt-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 text-sm sm:text-base">Express Shipping</div>
                        <div className="text-xs sm:text-sm text-gray-600">2–3 business days</div>
                      </div>
                      <div className="font-bold text-gray-900 text-base sm:text-lg shrink-0">R120</div>
                    </label>
                  </div>
                </div>
              )}

              {/* Payment Method */}
              <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-200">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Payment Method</h2>

                <div className="space-y-3">
                  <label className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 p-3 sm:p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-amber-500 transition-all has-[:checked]:border-amber-600 has-[:checked]:bg-amber-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === 'card'}
                      onChange={handleChange}
                      className="w-5 h-5 accent-amber-600 shrink-0 mt-0.5 sm:mt-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        {/* Add your card payment icons here */}
                        <Image src="/Icons/256px-Mastercard-logo.svg.png" alt="Visa" width={32} height={20} className="sm:w-[40px] sm:h-[25px]" />
                        <Image src="/Images/mastercard-icon.png" alt="Mastercard" width={32} height={20} className="sm:w-[40px] sm:h-[25px]" />
                        <Image src="/Icons/amex.png" alt="Amex" width={32} height={20} className="sm:w-[40px] sm:h-[25px]" />
                      </div>
                      <div className="font-semibold text-gray-900 text-sm sm:text-base">Credit/Debit Card</div>
                      <div className="text-xs sm:text-sm text-gray-600">Pay securely with your card</div>
                    </div>
                  </label>

                  <label className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 p-3 sm:p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-amber-500 transition-all has-[:checked]:border-amber-600 has-[:checked]:bg-amber-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="eft"
                      checked={formData.paymentMethod === 'eft'}
                      onChange={handleChange}
                      className="w-5 h-5 accent-amber-600 shrink-0 mt-0.5 sm:mt-0"
                    />
                    <div className="flex-1 min-w-0">
                      {/* Add your EFT/Bank Transfer icon here */}
                      {/* <Image src="/Images/bank-icon.png" alt="Bank Transfer" width={32} height={32} className="sm:w-[40px] sm:h-[40px] mb-2" /> */}
                      <div className="font-semibold text-gray-900 text-sm sm:text-base">EFT / Bank Transfer</div>
                      <div className="text-xs sm:text-sm text-gray-600">Direct bank payment</div>
                    </div>
                  </label>

                  <label className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4 p-3 sm:p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-amber-500 transition-all has-[:checked]:border-amber-600 has-[:checked]:bg-amber-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="ozow"
                      checked={formData.paymentMethod === 'ozow'}
                      onChange={handleChange}
                      className="w-5 h-5 accent-amber-600 shrink-0 mt-0.5 sm:mt-0"
                    />
                    <div className="flex-1 min-w-0">
                      {/* Add your Ozow icon here */}
                      <Image src="/Icons/ozow-pty-ltd-seeklogo.png" alt="Ozow" width={64} height={24} className="sm:w-[80px] sm:h-[30px] mb-2" />
                      <div className="font-semibold text-gray-900 text-sm sm:text-base">Ozow</div>
                      <div className="text-xs sm:text-sm text-gray-600">Instant EFT payment</div>
                    </div>
                  </label>
                </div>
              </div>
            </form>
          </motion.div>

          {/* Right Cart Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:sticky lg:top-32 h-fit"
          >
            <div className="bg-white rounded-xl p-4 sm:p-6 md:p-8 shadow-sm border border-gray-200">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-4 sm:mb-6">Review your cart</h2>

              {/* Cart Items */}
              <div className="space-y-4 mb-6 max-h-[300px] sm:max-h-[400px] overflow-y-auto">
                {cartEntries.map((entry, index) => (
                  <div key={`${entry.item.id}-${entry.size}-${index}`} className="flex gap-4">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={entry.item.image}
                        alt={entry.item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">{entry.item.name}</h3>
                      <p className="text-sm text-gray-600">Size: {entry.size}</p>
                      <p className="text-sm text-gray-600">Qty: {entry.quantity}</p>
                    </div>
                    <div className="font-bold text-gray-900">
                      R{((entry.item.price / 100) * entry.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Discount Code */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Discount code"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="flex-1 px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                  />
                  <button
                    type="button"
                    onClick={applyDiscount}
                    className="px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base text-amber-600 font-semibold hover:text-amber-700 border border-amber-600 rounded-lg hover:bg-amber-50 transition-all whitespace-nowrap"
                  >
                    Apply
                  </button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 py-4 border-t border-gray-200">
                <div className="flex justify-between text-gray-700 text-sm sm:text-base">
                  <span>Subtotal</span>
                  <span className="font-semibold">R{subtotal.toFixed(2)}</span>
                </div>
                {savings > 0 && (
                  <div className="flex justify-between text-green-600 text-sm sm:text-base">
                    <span>Saving</span>
                    <span className="font-semibold">-R{savings.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-700 text-sm sm:text-base">
                  <span>Shipping</span>
                  <span className="font-semibold">{shippingCost === 0 ? 'Free' : `R${shippingCost.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-base sm:text-lg font-bold text-gray-900 pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span>R{total.toFixed(2)}</span>
                </div>
              </div>

              {/* Pay Now Button */}
              <button
                onClick={handleSubmit}
                disabled={loading || !agreeTerms}
                className="w-full bg-amber-600 text-white py-3.5 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-amber-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl mt-6 min-h-[48px]"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </span>
                ) : (
                  'Pay Now'
                )}
              </button>

              {/* Security Badge */}
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
                <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-gray-600">
                  <Lock className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 shrink-0" />
                  <span>Secure Checkout - SSL Encrypted</span>
                </div>
                <p className="text-xs text-center text-gray-500 mt-2 px-2">
                  Ensuring your financial and personal details are secure during every transaction
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
