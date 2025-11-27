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
      {/* Image wrapper */}
      <div className="w-full max-h-[40dvh] px-6 mt-2">
        <div className="w-full flex justify-center aspect-[4/4] rounded-xl overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-3/4 h-3/4 object-contain"
          />
        </div>
      </div>

      {/* Text Section */}
      <div className="px-6 leading-snug  mt-8 text-justify space-y-2 min-h-[80px]">
        <h2 className="text-lg font-bold text-secondColor">
          {title}
        </h2>

        <p
          className="text-md text-gray-600 whitespace-pre-line leading-snug line-clamp-3"
        >
          {description}
        </p>
      </div>

    </div>

  );
};

export default OnboardingSlide;
