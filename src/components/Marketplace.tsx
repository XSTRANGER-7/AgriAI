import React, { useState } from 'react';
import { ShoppingCart, Search, Filter, Star, MapPin, Clock, TrendingUp, Users, Package } from 'lucide-react';

const Marketplace: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'vegetables', name: 'Vegetables' },
    { id: 'fruits', name: 'Fruits' },
    { id: 'grains', name: 'Grains' },
    { id: 'herbs', name: 'Herbs' },
    { id: 'organic', name: 'Organic' }
  ];

  const products = [
    {
      id: 1,
      name: 'Fresh Organic Tomatoes',
      price: '$4.50/kg',
      seller: 'Green Valley Farm',
      location: 'California, USA',
      rating: 4.8,
      reviews: 156,
      quantity: '500 kg available',
      image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'vegetables',
      organic: true,
      harvest: '2 days ago'
    },
    {
      id: 2,
      name: 'Premium Bell Peppers',
      price: '$6.20/kg',
      seller: 'Sunny Acres',
      location: 'Texas, USA',
      rating: 4.7,
      reviews: 89,
      quantity: '200 kg available',
      image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'vegetables',
      organic: false,
      harvest: '1 day ago'
    },
    {
      id: 3,
      name: 'Organic Wheat Grain',
      price: '$2.80/kg',
      seller: 'Prairie Gold Farm',
      location: 'Kansas, USA',
      rating: 4.9,
      reviews: 234,
      quantity: '2000 kg available',
      image: 'https://images.pexels.com/photos/2252618/pexels-photo-2252618.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'grains',
      organic: true,
      harvest: '1 week ago'
    },
    {
      id: 4,
      name: 'Fresh Sweet Corn',
      price: '$3.20/kg',
      seller: 'Midwest Harvest',
      location: 'Iowa, USA',
      rating: 4.6,
      reviews: 78,
      quantity: '800 kg available',
      image: 'https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'vegetables',
      organic: false,
      harvest: '3 days ago'
    }
  ];

  const myListings = [
    {
      id: 1,
      name: 'Organic Lettuce',
      price: '$3.80/kg',
      quantity: '150 kg',
      status: 'active',
      views: 45,
      inquiries: 8,
      image: 'https://images.pexels.com/photos/1339192/pexels-photo-1339192.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      name: 'Cherry Tomatoes',
      price: '$7.50/kg',
      quantity: '75 kg',
      status: 'sold',
      views: 89,
      inquiries: 15,
      image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const marketInsights = [
    { crop: 'Tomatoes', trend: 'up', change: '+15%', price: '$4.20/kg' },
    { crop: 'Bell Peppers', trend: 'up', change: '+8%', price: '$5.90/kg' },
    { crop: 'Lettuce', trend: 'down', change: '-3%', price: '$3.50/kg' },
    { crop: 'Corn', trend: 'stable', change: '0%', price: '$3.20/kg' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-primary-500/20 rounded-full text-primary-300 text-sm font-medium mb-4">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Direct Farm-to-Market Platform
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Farmer Marketplace</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Connect directly with buyers and sellers. No middlemen, better prices for everyone.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-1 border border-white/20">
            <button
              onClick={() => setActiveTab('buy')}
              className={`px-8 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'buy'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Buy Products
            </button>
            <button
              onClick={() => setActiveTab('sell')}
              className={`px-8 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'sell'
                  ? 'bg-primary-500 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Sell Products
            </button>
          </div>
        </div>

        {activeTab === 'buy' ? (
          <>
            {/* Search and Filters */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search for products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary-400 focus:outline-none"
                  />
                </div>
                <div className="flex gap-4">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-primary-400 focus:outline-none"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id} className="bg-slate-800">
                        {category.name}
                      </option>
                    ))}
                  </select>
                  <button className="flex items-center px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-gray-300 hover:text-white hover:bg-white/20 transition-all">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Market Insights */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Market Trends
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {marketInsights.map((insight, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">{insight.crop}</span>
                      <span className={`text-sm ${
                        insight.trend === 'up' ? 'text-green-400' :
                        insight.trend === 'down' ? 'text-red-400' : 'text-gray-400'
                      }`}>
                        {insight.change}
                      </span>
                    </div>
                    <div className="text-gray-300 text-sm">{insight.price}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden hover:border-primary-400/50 transition-all duration-300">
                  <div className="relative">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    {product.organic && (
                      <span className="absolute top-2 left-2 px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-medium">
                        Organic
                      </span>
                    )}
                    <span className="absolute top-2 right-2 px-2 py-1 bg-black/50 text-white rounded-full text-xs">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {product.harvest}
                    </span>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-white mb-2">{product.name}</h3>
                    
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-white text-sm ml-1">{product.rating}</span>
                        <span className="text-gray-400 text-sm ml-1">({product.reviews})</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-300">Price:</span>
                        <span className="text-primary-400 font-semibold">{product.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-300">Available:</span>
                        <span className="text-white">{product.quantity}</span>
                      </div>
                      <div className="flex items-center text-gray-300 text-sm">
                        <MapPin className="h-4 w-4 mr-1" />
                        {product.location}
                      </div>
                      <div className="text-gray-300 text-sm">
                        Seller: {product.seller}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="flex-1 px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-300">
                        Contact Seller
                      </button>
                      <button className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all">
                        <Package className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-8">
            {/* Seller Dashboard */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <Package className="h-8 w-8 text-primary-400" />
                  <span className="text-2xl font-bold text-white">12</span>
                </div>
                <h3 className="text-white font-medium">Active Listings</h3>
                <p className="text-gray-300 text-sm">Products available for sale</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <Users className="h-8 w-8 text-blue-400" />
                  <span className="text-2xl font-bold text-white">248</span>
                </div>
                <h3 className="text-white font-medium">Total Views</h3>
                <p className="text-gray-300 text-sm">This month</p>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="h-8 w-8 text-green-400" />
                  <span className="text-2xl font-bold text-white">$18,500</span>
                </div>
                <h3 className="text-white font-medium">Revenue</h3>
                <p className="text-gray-300 text-sm">Last 30 days</p>
              </div>
            </div>

            {/* Add New Listing */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-6">List New Product</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Product Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Organic Tomatoes"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Category</label>
                  <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-primary-400 focus:outline-none">
                    <option value="vegetables" className="bg-slate-800">Vegetables</option>
                    <option value="fruits" className="bg-slate-800">Fruits</option>
                    <option value="grains" className="bg-slate-800">Grains</option>
                    <option value="herbs" className="bg-slate-800">Herbs</option>
                  </select>
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Price per kg</label>
                  <input
                    type="number"
                    placeholder="0.00"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-white font-medium mb-2">Quantity (kg)</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary-400 focus:outline-none"
                  />
                </div>
              </div>
              <div className="mt-6">
                <button className="px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-300">
                  Create Listing
                </button>
              </div>
            </div>

            {/* My Listings */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-6">My Listings</h2>
              <div className="space-y-4">
                {myListings.map((listing) => (
                  <div key={listing.id} className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img 
                          src={listing.image} 
                          alt={listing.name}
                          className="w-16 h-16 rounded-lg object-cover mr-4"
                        />
                        <div>
                          <h3 className="text-white font-medium">{listing.name}</h3>
                          <p className="text-gray-400 text-sm">{listing.quantity} • {listing.price}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          listing.status === 'active' 
                            ? 'bg-green-500/20 text-green-400' 
                            : 'bg-gray-500/20 text-gray-400'
                        }`}>
                          {listing.status}
                        </span>
                        <div className="text-gray-300 text-sm mt-1">
                          {listing.views} views • {listing.inquiries} inquiries
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;