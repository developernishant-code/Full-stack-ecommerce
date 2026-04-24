import AddtoCartbtn from "./AddtoCartbtn";
import { Eye, Heart } from "lucide-react"; // Optional: Use icons for extra flair

const ProductCard = ({ product, i }) => {
  return (
    <div 
      key={i} 
      className="group relative bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Badge - Floating Style */}
      {product.badge && (
        <span className="absolute top-3 left-3 z-10 bg-emerald-500 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg shadow-sm">
          {product.badge}
        </span>
      )}

      {/* Action Buttons (Wishlist) - Appear on Hover */}
      <button className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full text-gray-400 hover:text-red-500 hover:bg-white shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Heart size={18} />
      </button>

      {/* Image Container with Hover Effect */}
      <div className="relative h-48 w-full overflow-hidden rounded-xl bg-gray-50 mb-4">
        <img
          src={process.env.NEXT_PUBLIC_PRODUCT_IMAGE + product.thumbnail}
          alt={product.name || "Product"}
          className="h-full w-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-semibold text-gray-700 flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
                <Eye size={14} /> Quick View
            </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-1">
        <p className="text-[10px] text-gray-400 uppercase tracking-widest font-semibold">
          {product.category || "General"}
        </p>
        
        <h3 className="text-gray-800 font-semibold text-base line-clamp-1 group-hover:text-blue-600 transition-colors">
          {product.name || "Sample Product"}
        </h3>

        {/* Status Indicator */}
        <div className="flex items-center gap-1.5 py-1">
            <span className={`h-1.5 w-1.5 rounded-full ${product.status === 'Out of Stock' ? 'bg-red-400' : 'bg-emerald-400'}`}></span>
            <p className="text-[11px] font-medium text-gray-500 uppercase tracking-tight">
                {product.status || "In stock"}
            </p>
        </div>

        {/* Pricing Section */}
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-xl font-bold text-gray-900">
            ${product.final_price || 579}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-gray-400 line-through decoration-gray-300">
              ${product.oldPrice}
            </span>
          )}
        </div>
      </div>

      {/* Add to Cart Button wrapper */}
      <div className="mt-4 pt-3 border-t border-gray-50">
        <AddtoCartbtn product={product} />
      </div>
    </div>
  );
};

export default ProductCard;