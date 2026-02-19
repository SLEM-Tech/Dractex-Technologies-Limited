"use client";
import React, { useEffect, useRef, useState } from "react";

import Picture from "../picture/Picture";
import { useCategories, WooCommerce } from "../lib/woocommerce";
import ProductCard from "../Cards/ProductCard";
import HomeCard from "../Cards/HomeCard";
import Carousel from "../Reusables/Carousel";
import Link from "next/link";
import { convertToSlug, convertToSlug2 } from "@constants";
import { useEncryptionHelper } from "../EncryptedData";
import { useDispatch } from "react-redux";
import { updateCategorySlugId } from "../config/features/subCategoryId";
import { useRouter } from "next/navigation";
import { heroBg, heroImage, heroImage2, heroImage3 } from "@public/images";
import HeroCarousel from "../Cards/HeroCarousel";
import { FormatMoney2 } from "../Reusables/FormatMoney";
import { useCart } from "react-use-cart";
import TrustBadges from "./TrustBadges";
import BuyAccessories from "./BuyAccessories";

const AllCategorySection = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [maxScrollTotal, setMaxScrollTotal] = useState(0);
  const [scrollLeftTotal, setScrollLeftTotal] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [latestProducts, setLatestProducts] = useState<ProductType[]>([]);
  const dispatch = useDispatch();
  const router = useRouter();
  const { addItem, getItem } = useCart();

  // State to hold products by category
  const [categoryProductsMap, setCategoryProductsMap] = useState<{
    [key: string]: ProductType[];
  }>({});
  // WooCommerce API Category
  const {
    data: categories,
    isLoading: categoryWpIsLoading,
    isError: categoryIsError,
  } = useCategories("");

  const Categories: CategoryType[] = categories;
  const TotalCatgory = Categories?.length - 1;

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setIsLoading(true);

        const filteredCategories = categories
          ?.filter((category: CategoryType) => category?.count > 0)
          ?.slice(0, 5);

        if (filteredCategories) {
          const productsPromises = filteredCategories.map(
            async (category: CategoryType) => {
              const response = await WooCommerce.get(
                `products?category=${category?.id}`,
              );

              // Check if there is at least one product in the category
              const firstProductImage =
                response?.data.length > 0 ?
                  response?.data[0]?.images[0]?.src
                : null;

              return {
                categoryId: category?.id,
                firstProductImage: firstProductImage, // Store the first product's image
              };
            },
          );

          const productsResults = await Promise.all(productsPromises);

          // Update the state with the first product images mapped by category
          const productsMap = productsResults.reduce(
            (acc: any, result: any) => ({
              ...acc,
              [result.categoryId]: result.firstProductImage,
            }),
            {},
          );

          setCategoryProductsMap(productsMap);
        }
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (categories?.length) {
      fetchCategoryProducts();
    }
  }, [categories]);

  // Fetch latest products for New Arrivals
  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await WooCommerce.get(
          "products?orderby=date&order=desc&per_page=8",
        );
        if (response?.data) {
          setLatestProducts(response.data);
        }
      } catch (error) {
        console.error("Error fetching latest products:", error);
      }
    };
    fetchLatestProducts();
  }, []);

  const handleNext = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollLeftTotal(scrollLeft);
      setMaxScrollTotal(maxScroll);

      sliderRef.current.scrollLeft += 600; // Adjust the scroll distance as needed
      setCurrentIndex((prevIndex) =>
        prevIndex < TotalCatgory - 1 ? prevIndex + 1 : prevIndex,
      );
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      const maxScroll = scrollWidth - clientWidth;
      setScrollLeftTotal(scrollLeft);
      setMaxScrollTotal(maxScroll);
      // console.log(scrollLeft);
      if (scrollLeft > 0) {
        sliderRef.current.scrollLeft -= 600; // Adjust the scroll distance as needed
        setCurrentIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex,
        );
      }
    }
  };

  return (
    <>
      {/* Hero Concept inspired by the image */}
      <div className="relative w-full h-screen overflow-hidden">
        {/* The Background Image */}
        <Picture
          src={heroBg}
          alt="Brand New Collection"
          className="w-full h-full object-cover scale-105"
        />

        {/* Content Overlay — Centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-black leading-tight tracking-tight">
            Brand New <br />
            Collection
          </h1>
          <p className="mt-6 text-sm md:text-base text-black/70 max-w-xl leading-relaxed">
            Upgrade your setup with our Brand New Collection of cutting-edge
            computer accessories, designed for performance, style, durability,
            and seamless productivity.
          </p>
          <Link
            href="/category"
            className="mt-8 inline-block bg-[#E91E8C] hover:bg-[#d4177f] text-white text-xs md:text-sm font-bold uppercase tracking-[0.2em] px-8 py-3.5 rounded transition-colors">
            Explore Shop
          </Link>
        </div>
      </div>

      <TrustBadges />

      {/* New Arrivals Section */}
      <div className="max-w-[1256px] mx-auto px-4 py-10 sm:py-16">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-sm text-emerald-500 font-medium mb-1">
              Check out latest products
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-black tracking-tight">
              New Arrivals
            </h2>
          </div>
          <Link
            href="/category"
            className="border border-gray-300 text-black text-xs sm:text-sm font-semibold uppercase tracking-wider px-5 py-2.5 rounded hover:bg-black hover:text-white transition-colors">
            View All
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {latestProducts.length > 0 ?
            latestProducts.slice(0, 4).map((product: ProductType) => {
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
                    className="relative aspect-square bg-[#F5F5F5] rounded-lg overflow-hidden flex items-center justify-center mb-4">
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
                    dangerouslySetInnerHTML={{ __html: product?.name }}
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
                      className="w-full bg-[#E91E8C] hover:bg-[#d4177f] text-white text-xs sm:text-sm font-bold py-2.5 rounded transition-colors cursor-pointer">
                      {cartItem ? "Added ✓" : "Add to cart"}
                    </button>
                  )}
                </div>
              );
            })
          : /* Loading Skeleton */
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
                <div className="h-9 bg-gray-200 rounded w-full" />
              </div>
            ))
          }
        </div>
      </div>
      <BuyAccessories />
    </>
  );
};

export default AllCategorySection;
