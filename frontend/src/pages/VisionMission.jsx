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
            The vision of Government Girls Degree College Ghotki is to enhance
            its position as a premier seat of higher learning in the region and
            to achieve distinction for creativity, innovation and excellence.
            The College is committed to discovery, dissemination and
            preservation of knowledge based on creativity, innovation, and
            excellence in teaching. The college aims at inculcating an academic
            environment which values integrity, quality and teamwork and serves
            as an engine for socio-economic development of the country.
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
            To develop human resources by imparting quality education in all
            fields of science, arts and technology also to develop a body of
            teachers and taught who would be aware and proud of their culture
            and posses a high sense of honour and integrity and work with
            selfless dedication, commitment and responsibility towards society
            to contribute to the prosperity of people and peace and harmony in
            the country.
          </p>
        </div>
      </section>
    </main>
  );
};

export default VisionMission;
