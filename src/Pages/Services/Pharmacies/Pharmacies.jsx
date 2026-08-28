import { useState, useEffect } from "react";
import { MOCK_MEDICINES, MOCK_PHARMACIES } from "../../../services/apiService";
import { Link } from "react-router-dom";

const Pharmacies = () => {
  const [medicines, setMedicines] = useState(MOCK_MEDICINES);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const categories = ["All", "Pain Relief", "Antibiotics", "Vitamins & Immunity", "Chronic Care", "Skincare"];

  useEffect(() => {
    try {
      const storedCart = JSON.parse(localStorage.getItem('medx_cart') || '[]');
      setCart(storedCart);
    } catch (e) {
      setCart([]);
    }
  }, []);

  const saveCartToStorage = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem('medx_cart', JSON.stringify(updatedCart));
  };

  const handleAddToCart = (med) => {
    const existingIndex = cart.findIndex(item => item.id === med.id);
    let updated;
    if (existingIndex > -1) {
      updated = [...cart];
      updated[existingIndex].quantity += 1;
    } else {
      updated = [...cart, { ...med, quantity: 1 }];
    }
    saveCartToStorage(updated);
  };

  const handleRemoveFromCart = (id) => {
    const updated = cart.filter(item => item.id !== id);
    saveCartToStorage(updated);
  };

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCheckoutSuccess(false);
      setShowCart(false);
      saveCartToStorage([]);
    }, 2500);
  };

  const filteredMedicines = medicines.filter(m => {
    const matchesCat = selectedCategory === "All" || m.category === selectedCategory;
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="pharmacy-page min-h-screen bg-slate-50 pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-7xl space-y-10">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-cyan-950 rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row justify-between items-center gap-8 shadow-xl">
          <div className="space-y-3 text-center md:text-left max-w-2xl">
            <span className="bg-[#19A7CE]/20 text-[#19A7CE] text-xs font-bold px-3.5 py-1.5 rounded-full uppercase tracking-wider">
              Integrated Healthcare Pharmacy
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">MedX E-Pharmacy & Prescription Fulfillment</h1>
            <p className="text-slate-300 text-sm leading-relaxed">
              Order OTC wellness items or fulfill digital prescriptions from accredited partner pharmacy networks with fast home delivery.
            </p>
          </div>

          <button
            onClick={() => setShowCart(true)}
            className="px-6 py-3.5 bg-[#19A7CE] hover:bg-[#148AA1] text-white font-bold rounded-2xl text-sm shadow-lg transition-all flex items-center gap-2 flex-shrink-0 relative"
          >
            <i className="fa-solid fa-cart-shopping"></i>
            <span>View Cart ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-extrabold w-6 h-6 rounded-full flex items-center justify-center border-2 border-slate-900">
                {cart.length}
              </span>
            )}
          </button>
        </div>

        {/* Toolbar & Category Tabs */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200/80 space-y-6">
          <div className="relative">
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search products by name or therapeutic use (e.g. Panadol, Augmentin, Vitamin C)..."
              className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 focus:border-[#19A7CE] focus:bg-white rounded-2xl outline-none text-sm text-slate-800 placeholder-slate-400 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">Category:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#19A7CE] text-white shadow-md'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMedicines.map((med) => (
            <div key={med.id} className="bg-white rounded-3xl border border-slate-200/80 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group">
              
              <div className="p-5 space-y-4">
                <div className="relative aspect-square bg-slate-50 rounded-2xl overflow-hidden mb-2">
                  <img src={med.image} alt={med.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  
                  {/* Rx / OTC Badge */}
                  <span className={`absolute top-3 left-3 text-[10px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                    med.requires_prescription
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  }`}>
                    {med.requires_prescription ? 'Rx Prescription Required' : 'OTC Over The Counter'}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] font-bold text-[#19A7CE] uppercase tracking-wider block">{med.category}</span>
                  <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">{med.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{med.description}</p>
                </div>
              </div>

              <div className="p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">Price</span>
                  <span className="text-base font-extrabold text-slate-900">{med.price} {med.currency}</span>
                </div>

                <button
                  onClick={() => handleAddToCart(med)}
                  className="px-4 py-2 bg-[#19A7CE] hover:bg-[#148AA1] text-white font-bold rounded-xl text-xs transition-all shadow-sm flex items-center gap-1.5"
                >
                  <i className="fa-solid fa-plus"></i>
                  <span>Add to Cart</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Partner Pharmacies List */}
        <div className="pt-10 space-y-6">
          <h2 className="text-xl font-bold text-slate-900">Accredited Partner Pharmacies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_PHARMACIES.map((pharmacy) => (
              <div key={pharmacy.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-slate-900 text-base">{pharmacy.name}</h3>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">{pharmacy.hours}</span>
                </div>
                <p className="text-xs text-slate-500">{pharmacy.address}</p>
                <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-100 text-slate-600 font-semibold">
                  <span>Delivery: {pharmacy.delivery_time}</span>
                  <span className="text-amber-500 font-bold"><i className="fa-solid fa-star mr-1"></i>{pharmacy.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Cart Drawer Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-end">
          <div className="bg-white w-full max-w-md h-full p-6 shadow-2xl flex flex-col justify-between animate-fadeIn space-y-6">
            
            <div className="flex items-center justify-between border-b pb-4">
              <div className="flex items-center gap-2">
                <i className="fa-solid fa-cart-shopping text-[#19A7CE]"></i>
                <h3 className="font-extrabold text-slate-900 text-base">Your MedX Order Cart</h3>
              </div>
              <button onClick={() => setShowCart(false)} className="text-slate-400 hover:text-slate-600">
                <i className="fa-solid fa-times text-xl"></i>
              </button>
            </div>

            {checkoutSuccess ? (
              <div className="my-auto text-center space-y-4 py-12">
                <i className="fa-solid fa-circle-check text-emerald-500 text-5xl"></i>
                <h4 className="text-2xl font-extrabold text-slate-900">Order Placed Successfully!</h4>
                <p className="text-xs text-slate-500">Your pharmacy order has been routed to partner fulfillment.</p>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto space-y-4 pr-1">
                  {cart.length === 0 ? (
                    <div className="py-20 text-center text-slate-400 space-y-2">
                      <i className="fa-solid fa-basket-shopping text-4xl"></i>
                      <p className="text-sm font-semibold">Your cart is currently empty.</p>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div key={item.id} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex justify-between items-center">
                        <div>
                          <h4 className="font-bold text-slate-900 text-xs">{item.name}</h4>
                          <span className="text-[11px] font-extrabold text-[#19A7CE]">{item.price} EGP x {item.quantity}</span>
                          {item.requires_prescription && (
                            <span className="block text-[10px] font-bold text-amber-700 mt-0.5">⚠️ Rx Required</span>
                          )}
                        </div>
                        <button onClick={() => handleRemoveFromCart(item.id)} className="text-red-500 hover:text-red-700 text-sm">
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="border-t pt-4 space-y-4">
                    <div className="flex justify-between items-center font-extrabold text-slate-900 text-base">
                      <span>Total Amount:</span>
                      <span>{cartTotal} EGP</span>
                    </div>

                    <button
                      onClick={handleCheckout}
                      className="w-full py-3.5 bg-[#19A7CE] hover:bg-[#148AA1] text-white font-bold rounded-2xl text-sm shadow-md transition-all"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                )}
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
};

export default Pharmacies;
