"use client";
import { convertToSlug } from "@constants";
import Picture from "@src/components/picture/Picture";
import { FormatMoney2 } from "@src/components/Reusables/FormatMoney";
import { useCategories, WooCommerce } from "@src/components/lib/woocommerce";
import GlobalLoader from "@src/components/modal/GlobalLoader";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState, useTransition } from "react";
import { useCart } from "react-use-cart";

export const Loader = () => (
  <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6 w-full">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="animate-pulse">
        <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
        <div className="h-9 bg-gray-200 rounded w-full" />
      </div>
    ))}
  </div>
);

const SortedProducts = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [saleProducts, setSaleProducts] = useState<ProductType[]>([]);
  const [popularProducts, setPopularProducts] = useState<ProductType[]>([]);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { addItem, getItem } = useCart();

  // Fetch sale products (on_sale) and popular products (by popularity)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const [saleRes, popularRes] = await Promise.all([
          WooCommerce.get(
            "products?on_sale=true&per_page=6&orderby=date&order=desc",
          ),
          WooCommerce.get("products?orderby=popularity&per_page=8&order=desc"),
        ]);
        if (saleRes?.data) setSaleProducts(saleRes.data);
        if (popularRes?.data) setPopularProducts(popularRes.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      {/* ─── Popular Products Section ─── */}
      <div className="max-w-[1256px] mx-auto px-4 py-10 sm:py-16">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-8">
          <p className="text-sm text-emerald-500 font-medium mb-1">
            Check out popular products
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
            Popular Products
          </h2>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-6">
          {isLoading ?
            <Loader />
          : popularProducts.slice(0, 4).map((product: ProductType) => {
              const price = parseInt(product?.price || "0");
              const oldPrice =
                product?.regular_price ? parseInt(product.regular_price) : null;
              const slugDesc = convertToSlug(product?.name);
              const ID = product?.id?.toString();
              const cartItem = getItem(ID);

              return (
                <div key={product.id} className="group flex flex-col bg-white">
                  {/* Image Container */}
                  <Link
                    href={`/home-item/product/${slugDesc}-${product.id}`}
                    className="relative aspect-square bg-neutral rounded-lg overflow-hidden flex items-center justify-center mb-4">
                    {/* AVAILABLE Badge */}
                    {product?.stock_status === "instock" && (
                      <span className="absolute top-3 left-3 bg-emerald-500 text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded z-10">
                        Available
                      </span>
                    )}
                    <Picture
                      src={product?.images?.[0]?.src}
                      alt={product?.name}
                      className="object-contain w-[80%] h-[80%] group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* Product Info */}
                  <Link
                    href={`/home-item/product/${slugDesc}-${product.id}`}
                    className="text-sm font-semibold text-black line-clamp-2 mb-2 hover:text-emerald-600 transition-colors leading-snug"
                    dangerouslySetInnerHTML={{
                      __html: product?.name,
                    }}
                  />

                  {/* Price */}
                  <div className="flex items-baseline gap-2 mb-3">
                    <span className="text-base sm:text-lg font-black text-black">
                      {price ?
                        <FormatMoney2 value={price} />
                      : "N/A"}
                    </span>
                    {oldPrice && oldPrice > price && (
                      <span className="text-xs text-gray-400 line-through">
                        <FormatMoney2 value={oldPrice} />
                      </span>
                    )}
                  </div>

                  {/* Add to Cart Button */}
                  {price > 0 && (
                    <button
                      onClick={() =>
                        addItem({
                          id: ID,
                          name: product?.name,
                          price,
                          quantity: 1,
                          image: product?.images?.[0]?.src,
                        })
                      }
                      className="w-full bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold py-2.5 rounded transition-colors cursor-pointer">
                      {cartItem ? "Added ✓" : "Add to cart"}
                    </button>
                  )}
                </div>
              );
            })
          }
        </div>
      </div>
      {/* ─── Sale Section — Purple Background ─── */}
      <div className="w-full bg-secondary py-10 sm:py-16 mt-8 sm:mt-0">
        <div className="max-w-[1256px] mx-auto px-4">
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ?
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="h-10 bg-white/10 rounded-t-lg" />
                  <div className="aspect-square bg-white/5 rounded-b-lg" />
                </div>
              ))
            : saleProducts.slice(0, 3).map((product: ProductType) => {
                const price = parseInt(product?.price || "0");
                const slugDesc = convertToSlug(product?.name);
                const ID = product?.id?.toString();
                const cartItem = getItem(ID);

                return (
                  <div
                    key={product.id}
                    className="group flex flex-col bg-white rounded-lg overflow-hidden">
                    {/* Dark Header with Price */}
                    <div className="bg-dark px-4 py-3">
                      <span className="text-primary font-black text-lg sm:text-xl tracking-wide">
                        {price ?
                          <>
                            <FormatMoney2 value={price} /> ONLY!
                          </>
                        : "SALE!"}
                      </span>
                    </div>

                    {/* Image */}
                    <Link
                      href={`/home-item/product/${slugDesc}-${product.id}`}
                      className="relative aspect-square bg-neutral flex items-center justify-center">
                      {/* SALE Badge */}
                      <span className="absolute top-3 left-3 bg-primary text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded z-10">
                        Sale
                      </span>
                      <Picture
                        src={product?.images?.[0]?.src}
                        alt={product?.name}
                        className="object-contain w-[80%] h-[80%] group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    {/* Product Name */}
                    <div className="p-4 flex flex-col gap-3">
                      <Link
                        href={`/home-item/product/${slugDesc}-${product.id}`}
                        className="text-sm font-semibold text-black line-clamp-2 hover:text-primary transition-colors leading-snug"
                        dangerouslySetInnerHTML={{
                          __html: product?.name,
                        }}
                      />

                      {/* Add to Cart */}
                      {price > 0 && (
                        <button
                          onClick={() =>
                            addItem({
                              id: ID,
                              name: product?.name,
                              price,
                              quantity: 1,
                              image: product?.images?.[0]?.src,
                            })
                          }
                          className="w-full bg-primary hover:bg-primary-hover text-white text-xs sm:text-sm font-bold py-2.5 rounded transition-colors cursor-pointer">
                          {cartItem ? "Added ✓" : "Add to cart"}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>

      <GlobalLoader isPending={isPending} />
    </>
  );
};

export default SortedProducts;
