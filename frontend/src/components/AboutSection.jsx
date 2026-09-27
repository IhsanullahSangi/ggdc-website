const AboutSection = () => {
  // 🌟 STATIC DATA: Hardcoded image URL
  const displayImage =
    "https://placehold.co/600x800/0F2841/FFFFFF?text=Principal+Portrait";

  return (
    <section
      id="principal-message"
      className="scroll-mt-24 relative py-12 md:py-20"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* Top Gray Header */}
        <h2 className="text-gray-400 font-bold text-xl md:text-2xl tracking-[0.2em] uppercase mb-8 md:mb-12">
          Message
        </h2>

        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          {/* Left Column: Image with Green Offset Block */}
          <div className="w-full md:w-5/12 lg:w-4/12 relative pl-4 md:pl-6">
            {/* The Green Block */}
            <div className="absolute left-0 top-0 w-8 md:w-12 h-32 md:h-48 bg-collegeGreen z-0"></div>

            {/* 🌟 DYNAMIC Sharp, Flat Image */}
            <img
              src={displayImage}
              alt="Principal of GGDC Ghotki"
              className="w-full h-auto object-cover object-top relative z-10"
            />
          </div>

          {/* Right Column: Clean Text Content */}
          <div className="w-full md:w-7/12 lg:w-8/12 flex flex-col justify-start">
            <h3 className="font-body font-extrabold text-3xl md:text-5xl text-black mb-6 leading-tight">
              The Principal Message
            </h3>

            <p className="text-gray-700 font-body text-base md:text-lg mb-8">
              Principal, Government Girls Degree College Ghotki
            </p>

            <div className="font-body text-gray-800 space-y-5 text-sm md:text-base leading-relaxed max-w-3xl">
              <p>Dear Faculty, Officers, Staff and Students,</p>
              <p>
                It is with profound gratitude and a strong sense of
                responsibility that I welcome you to Government Girls Degree
                College, Ghotki. It is both a privilege and an honor to lead
                this historic and prestigious institution — one that has stood
                as a symbol of learning, progress, and enlightenment for women
                in our region.
              </p>
              <p>
                We all recognize that colleges exist for their students, gain
                distinction through their teachers, earn pride from the success
                of their graduates, and achieve excellence through the quality
                of education they provide. We will continue to build on this
                legacy by strengthening all these key pillars with renewed
                dedication and purpose.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
