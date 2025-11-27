import React from "react";

interface OnboardingSlideProps {
  title: string;
  description: string;
  image: string;
}

const OnboardingSlide: React.FC<OnboardingSlideProps> = ({
  title,
  description,
  image,
}) => {
  return (
    <div className="flex flex-col items-center text-center w-full">

      <div className="w-full px-6 mt-2">
        <div className="w-full aspect-[4/4] rounded-xl overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain"
          />
        </div>
      </div>


      {/* Text Section */}
      <div className="px-6 mt-12 text-justify space-y-3">
        <h2 className="text-2xl font-bold text-secondColor">{title}</h2>

        <p className="text-lg text-gray-600 whitespace-pre-line">
          {description}
        </p>
      </div>
    </div>
  );
};

export default OnboardingSlide;
