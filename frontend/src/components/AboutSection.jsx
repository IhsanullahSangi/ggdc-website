const AboutSection = () => {
  // 🌟 STATIC DATA: Hardcoded image URL
  const displayImage =
    "https://res.cloudinary.com/lpoftm4n/image/upload/v1791531242/IMG_20261009_102922.jpg.jpg";

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
              The Principal
            </h3>

            <p className="text-gray-700 font-body text-base md:text-lg mb-8">
              Professor Mir Hassan Waseer
            </p>
            <div className="font-body text-gray-800 space-y-5 text-sm md:text-base leading-relaxed max-w-3xl text-justify">
              <p>
                Welcome to our official platform, a digital reflection of our steadfast commitment to providing accessible, equitable, and excellent higher education that empowers young women to become confident leaders and socially responsible citizens. Our institution stands as a beacon of learning, dedicated to fostering an inclusive, forward-looking environment where students can discover their full potential, cultivate critical thinking, and build strong ethical values.
              </p>
              <p>
                Through a seamless blend of rigorous academics, modern skill development, and the tireless mentorship of our dedicated faculty, we strive to bridge educational divides and nurture the holistic growth of every learner. We deeply value the collaborative journey with our wider community and stakeholders, working together to maintain a secure, progressive campus that equips our students with the practical competencies necessary to champion inclusive values, achieve academic excellence, and drive positive socio-economic progress in an ever-evolving world.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
