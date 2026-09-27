import { Landmark, Award, GraduationCap, ShieldCheck } from "lucide-react";

const AffiliationGovernance = () => {
  return (
    <main className="font-body w-full min-h-screen bg-slate-50">
      {/* Page Header */}
      <div className="bg-collegeDark py-10 md:py-14 text-center border-b-4 border-collegeCyan">
        <h1 className="text-2xl md:text-4xl font-heading font-bold text-white uppercase tracking-wider">
          Affiliation & Governance
        </h1>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        {/* AFFILIATIONS SECTION */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-collegeDark uppercase tracking-wide">
              Academic Affiliations
            </h2>
            <div className="w-24 h-1 bg-collegeGreen mx-auto mt-4"></div>
          </div>
          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1: BISE Sukkur */}
            <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-collegeDark hover:shadow-xl transition-shadow group">
              <div className="w-16 h-16 bg-[#f0f8fb] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-collegeDark transition-colors">
                <GraduationCap className="w-8 h-8 text-collegeDark group-hover:text-collegeCyan" />
              </div>
              <h3 className="text-lg font-heading font-bold text-collegeDark mb-3 text-center">
                BISE Sukkur
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                All Intermediate programs (Pre-Medical, Pre-Engineering,
                Commerce, and Computer Science) are officially affiliated with
                the Board of Intermediate and Secondary Education (BISE) Sukkur.
              </p>
            </div>

            {/* Card 2: SALU Khairpur */}
            <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-collegeCyan hover:shadow-xl transition-shadow group">
              <div className="w-16 h-16 bg-[#f0f8fb] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-collegeCyan transition-colors">
                <Landmark className="w-8 h-8 text-collegeCyan group-hover:text-white" />
              </div>
              <h3 className="text-lg font-heading font-bold text-collegeDark mb-3 text-center">
                SALU Khairpur
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our Degree and BS Programs are conducted under the prestigious
                affiliation of Shah Abdul Latif University (SALU), Khairpur,
                ensuring recognized and high-quality higher education.
              </p>
            </div>

            {/* Card 3: HEC */}
            <div className="bg-white p-8 rounded-lg shadow-md border-t-4 border-collegeGreen hover:shadow-xl transition-shadow group">
              <div className="w-16 h-16 bg-[#f0f8fb] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-collegeGreen transition-colors">
                <Award className="w-8 h-8 text-collegeGreen group-hover:text-white" />
              </div>
              <h3 className="text-lg font-heading font-bold text-collegeDark mb-3 text-center">
                HEC Recognized
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                The degree programs offered at Government Girls Degree College
                Ghotki are fully recognized by the Higher Education Commission
                (HEC) of Pakistan.
              </p>
            </div>
          </div>
        </div>

        {/* GOVERNANCE SECTION */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-heading font-bold text-collegeDark uppercase tracking-wide">
              Governance & Administration
            </h2>
            <div className="w-24 h-1 bg-collegeCyan mx-auto mt-4"></div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col md:flex-row">
            {/* Left side accent */}
            <div className="bg-collegeDark w-full md:w-1/3 p-8 flex flex-col justify-center items-center text-center">
              <img
                src="/government_of_sindh_logo.png"
                alt="Government of Sindh Logo"
                className="w-20 h-20 md:w-24 md:h-24 object-contain mb-4"
              />
              <h3 className="text-xl font-heading font-bold text-white">
                Government of Sindh
              </h3>
              <p className="text-collegeCyan text-sm mt-2 font-medium">
                College Education Department
              </p>
            </div>
            {/* Right side content */}
            <div className="p-8 md:p-12 md:w-2/3">
              <p className="text-gray-700 leading-loose text-justify">
                Government Girls Degree College Ghotki operates directly under
                the administrative control of the{" "}
                <strong>
                  College Education Department, Government of Sindh
                </strong>
                .
                <br />
                <br />
                The institution is headed by the Principal, who acts as the
                supreme administrative and academic head on campus. The
                Principal is supported by the College Management Committee and
                various academic councils to ensure strict adherence to
                provincial educational policies, merit-based admissions, and the
                maintenance of a highly disciplined, secure, and empowering
                environment for female students in the region.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default AffiliationGovernance;
