import React from "react";
import Image from "next/image";
import { useLocale } from "next-intl";

const Hero = () => {
  const locale = useLocale();
  const Arabic = locale === 'ar';

  return (
    <div className="w-full min-h-[90vh] flex items-center max-lg:flex-wrap justify-center gap-10 px-10 md:px-20 bg-gradient-to-r  ">
      
      {/* Left Side - Texts */}
      <div className="max-w-[500px] space-y-6 max-lg:w-full">
        <div className="bg-[#ffcad3] text-[#F33756] px-4 py-1 rounded-md text-sm font-semibold w-fit shadow-sm">
          🍽️ {Arabic?'افضل الاطعمة الصحية':'Best Healty Food'}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          {Arabic?'استمتع ':'Enjoy'} <span className="text-pink-500">{Arabic?'بالطعام':'Delicious'}</span><br className="max-lg:hidden" />
         {Arabic?'  اللذيذ في' :' Food in Your'} <br className="max-lg:hidden" />
          {Arabic?' حياتك الصحية':'Healty life'}
        </h1>

        <p className="text-gray-600">
          {Arabic?'هذا هو نوع من المطاعم التي تقدم عادة الطعام والشراب، بالإضافة إلى المرطبات الخفيفة مثل المخبوزات.':"This is a type of restaurant which typically serves food and drink, in addition to light refreshments such as baked goods."}
        </p>

        {/* Buttons */}
        <div className="flex gap-4">
          <button className="bg-[#E93553] hover:bg-pink-600 text-white px-6 py-3 rounded-md shadow-md transition">
            {Arabic?'البدء':'Get Started'}
          </button>
          <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-md shadow-md transition">
          {Arabic?'اطلب الان':'Order Now'}
          </button>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className=" md:block relative w-[600px] max-md:w-[400px] max-md:h-[400px] h-[600px]">
        <Image
          src="/hero.png" // لازم تتأكد إن الصورة موجودة في public/hero.png
          alt="food"
          layout="fill"
          objectFit="contain"
          priority
        />
      </div>
    </div>
  );
};

export default Hero;
