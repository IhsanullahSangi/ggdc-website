const GallerySection = () => {
  // 🌟 STATIC DATA: Hardcoded gallery images
  const images = [
    {
      _id: "gal1",
      imageUrl:
        "https://res.cloudinary.com/lpoftm4n/image/upload/v1790402486/491652199_122126248412792790_182650166893475462_n_-_Copy.jpg",
      title: "Campus Event 1",
    },
    {
      _id: "gal2",
      imageUrl:
        "https://res.cloudinary.com/lpoftm4n/image/upload/v1790402569/528866967_122147450516792790_5731356665609983133_n.jpg",
      title: "Campus Event 2",
    },
    {
      _id: "gal3",
      imageUrl:
        "https://res.cloudinary.com/lpoftm4n/image/upload/v1790402755/596727372_122164642982792790_3080185773605122425_n.jpg",
      title: "Campus Event 3",
    },
  ];

  return (
    <section
      id="gallery"
      className="scroll-mt-24 py-16 bg-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-gray-400 font-bold text-xl md:text-2xl tracking-[0.2em] uppercase mb-10 md:mb-14 text-center">
          Gallery
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 h-auto md:h-[500px]">
          {/* Left Column: 1 Tall Image */}
          <div className="relative w-full h-[300px] md:h-full rounded-sm overflow-hidden bg-slate-200">
            <img
              src={images[0].imageUrl}
              alt={images[0].title}
              className="absolute inset-0 w-full h-full object-cover transform hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300 cursor-pointer"
            />
          </div>

          {/* Right Column: 2 Stacked Images */}
          <div className="flex flex-col gap-4 md:gap-6 h-[500px] md:h-full">
            <div className="relative flex-1 w-full rounded-sm overflow-hidden bg-slate-200">
              <img
                src={images[1].imageUrl}
                alt={images[1].title}
                className="absolute inset-0 w-full h-full object-cover transform hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300 cursor-pointer"
              />
            </div>

            <div className="relative flex-1 w-full rounded-sm overflow-hidden bg-slate-200">
              <img
                src={images[2].imageUrl}
                alt={images[2].title}
                className="absolute inset-0 w-full h-full object-cover transform hover:scale-[1.02] active:scale-[0.98] transition-transform duration-300 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
