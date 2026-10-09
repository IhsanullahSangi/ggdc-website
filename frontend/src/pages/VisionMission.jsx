const VisionMission = () => {
  return (
    <main className="font-body w-full min-h-screen bg-white">
      {/* Subtle Page Header */}
      <div className="bg-collegeDark py-10 md:py-14 text-center border-b-4 border-collegeCyan">
        <h1 className="text-2xl md:text-4xl font-heading font-bold text-white uppercase tracking-wider">
          Vision & Mission
        </h1>
      </div>

      {/* VISION SECTION (White Background) */}
      <section className="relative bg-white py-16 md:py-24 overflow-hidden">
        {/* Green Accent Box - Top Left */}
        <div className="absolute top-0 left-0 w-8 h-16 md:w-16 md:h-32 bg-collegeGreen"></div>

        <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-collegeDark mb-6 tracking-wide uppercase">
            Vision
          </h2>
          <p className="text-gray-700 leading-loose text-base md:text-lg text-justify md:text-left">
            In steadfast alignment with the Government of Sindh’s mandate to provide accessible, equitable, and excellent higher education, Government Girls Degree College Ghotki envisions emerging as a premier center of academic excellence and female empowerment. We are committed to fostering an inclusive, forward-looking learning environment that equips young women with modern knowledge, critical thinking, and strong ethical values. Our ultimate vision is to transform our students into confident leaders, skilled professionals, and socially responsible citizens who champion inclusive values and drive positive socio-economic progress within their communities and beyond.
          </p>
        </div>
      </section>

      {/* MISSION SECTION (Light Blue Background mimicking your screenshot) */}
      <section className="relative bg-[#f0f8fb] py-16 md:py-24 overflow-hidden">
        {/* Green Accent Box - Top Right (Alternating balance) */}
        <div className="absolute top-0 right-0 w-8 h-16 md:w-16 md:h-32 bg-collegeGreen"></div>

        <div className="max-w-4xl mx-auto px-6 sm:px-8 relative z-10">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-collegeDark mb-6 tracking-wide uppercase">
            Mission
          </h2>
          <p className="text-gray-700 leading-loose text-base md:text-lg text-justify md:text-left">
           To deliver accessible, high-quality higher education that fosters the intellectual, personal, and moral growth of young women in Ghotki and its surrounding regions. We are committed to providing a secure, inclusive, and dynamic learning environment that strictly upholds the academic standards and progressive educational policies of the Government of Sindh. Through a blend of rigorous academics, modern skill development, and character-building initiatives, our mission is to nurture critical thinking, bridge regional educational divides, and equip our students with the practical competencies required to excel in their future careers and civic lives.
          </p>
        </div>
      </section>
    </main>
  );
};

export default VisionMission;
