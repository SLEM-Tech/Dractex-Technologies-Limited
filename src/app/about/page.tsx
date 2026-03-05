import AppLayout from "@src/components/AppLayout";
import Picture from "@src/components/picture/Picture";

const page = () => {
  return (
    <AppLayout>
      <main className="bg-white mx-auto mt-28 slg:mt-36 pb-10 slg:pb-32">
        <section className="flex w-full flex-col items-center pt-7 slg:pt-16 gap-4 px-4 slg:px-16 text-center">
          <h3 className="font-semibold text-xl md:text-3xl tracking-tighter">
            About Us
          </h3>
          <p className="text-sm text-gray-500 max-w-xl">
            Discover who we are, what drives us, and why thousands of customers
            trust Dractex Brand Foundation for premium appliances.
          </p>
        </section>

        {/* Hero Section */}
        <div className="grid slg:grid-cols-2 mt-2 sm:mt-5 slg:mt-10 px-4 slg:px-16 gap-8 overflow-hidden">
          <div className="flex flex-col gap-3 justify-center">
            <h3 className="slg:text-2xl text-lg font-semibold text-center slg:text-start">
              Welcome to Dractex Brand Foundation!
            </h3>
            <p className="text-xs sm:text-sm slg:text-base !leading-[180%] text-black">
              Dractex Brand Foundation is a leading distributor in Nigeria,
              offering a wide range of high-quality appliances designed to meet
              the diverse needs of our customers. Our products include; <br />
              Kitchen Appliances, Laundry Appliances, Office Equipment, Home
              Comforts such as Air Conditioners, Heaters, Fans and more, as well
              as Home Entertainment Equipment such as TVs, Sound Systems, and
              multimedia devices.
            </p>
          </div>

          <div className="flex items-center justify-center">
            <Picture
              src="/images/about-hero.png"
              alt="Dractex Brand Foundation Showroom"
              className="rounded-2xl overflow-hidden shadow-lg w-full max-w-[500px]"
            />
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid slg:grid-cols-2 mt-10 slg:mt-16 px-4 slg:px-16 gap-8">
          <div className="flex flex-col gap-3 bg-gray-50 rounded-2xl p-6 slg:p-8">
            <h4 className="text-lg slg:text-xl font-semibold text-black">
              🎯 Our Mission
            </h4>
            <p className="text-xs sm:text-sm slg:text-base !leading-[180%] text-gray-700">
              To provide Nigerians with access to world-class home and office
              appliances at competitive prices, backed by exceptional customer
              service and reliable after-sales support. We strive to make modern
              living comfortable and accessible for every household.
            </p>
          </div>

          <div className="flex flex-col gap-3 bg-gray-50 rounded-2xl p-6 slg:p-8">
            <h4 className="text-lg slg:text-xl font-semibold text-black">
              🔭 Our Vision
            </h4>
            <p className="text-xs sm:text-sm slg:text-base !leading-[180%] text-gray-700">
              To become Nigeria&apos;s most trusted appliance distributor by
              continuously expanding our product range, embracing innovation,
              and building lasting relationships with our customers and partners
              across the nation.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-10 slg:mt-16 px-4 slg:px-16">
          <h4 className="text-lg slg:text-2xl font-semibold text-center mb-6 slg:mb-8 text-black">
            Why Choose Us?
          </h4>
          <div className="grid sm:grid-cols-2 slg:grid-cols-4 gap-5">
            {[
              {
                icon: "✅",
                title: "Quality Guaranteed",
                desc: "All our products are sourced from reputable global manufacturers with full warranty coverage.",
              },
              {
                icon: "🚚",
                title: "Fast Delivery",
                desc: "We deliver to all major cities across Nigeria with reliable and timely logistics partners.",
              },
              {
                icon: "💰",
                title: "Competitive Pricing",
                desc: "Enjoy the best prices in the market without compromising on quality or service.",
              },
              {
                icon: "🤝",
                title: "Dedicated Support",
                desc: "Our customer support team is always ready to help with product inquiries and after-sales service.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="flex flex-col items-center text-center gap-3 bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
                <span className="text-3xl">{item.icon}</span>
                <h5 className="font-semibold text-sm slg:text-base text-black">
                  {item.title}
                </h5>
                <p className="text-xs slg:text-sm text-gray-600 !leading-[170%]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </AppLayout>
  );
};

export default page;
