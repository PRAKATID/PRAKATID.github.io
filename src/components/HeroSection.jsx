import React, { useState, useRef, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';

const HeroSection = () => {
  const handleContactClick = () => {
    window.location.href = "/contact-us";
  };

  const [selected, setSelected] = useState('');
  const tabRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    email: '',
    mobile: '',
    course: '',
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tabRef.current && !tabRef.current.contains(event.target)) {
        setSelected('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting data:', formData, 'Mode:', selected);
    try {
      const docRef = await addDoc(collection(db, 'enrollments'), {
        ...formData,
        mode: selected,
        timestamp: new Date(),
      });
      console.log('Document written with ID:', docRef.id);
      alert("Enrollment Successful!");
      setFormData({
        name: '',
        designation: '',
        email: '',
        mobile: '',
        course: '',
      });
      setSelected('');
    } catch (error) {
      console.error('Error adding document:', error.message, error.code);
      alert("Submission Failed: " + error.message);
    }
  };

  return (
    <div className="bg-white w-full overflow-x-hidden">
      {/* Mobile View */}
      <div className="block sm:hidden px-4 py-6 mt-16 text-center">
        <div className="max-w-md mx-auto">
          <h1
            className="text-2xl font-bold text-black leading-tight mb-6"
            style={{ fontFamily: "Poppins, sans-serif" }}
          >
            <span className="text-blue-500" style={{ color: "#00B4D9" }}>Let's</span> Pioneer.Produce.Propel <br />
            Innovate with <span className="text-blue-500" style={{ color: "#00B4D9" }}>Azhizen</span>
          </h1>
          <p className="text-xs text-gray-600 mb-4 px-2">
            Master in-demand skills with expert-led training in MedTech, DeepTech, EduTech, and beyond.
            Kickstart your career journey with innovation, insight, and industry excellence.
          </p>
          <button
            className="rounded bg-gradient-to-br from-[#0078B4] to-[#00B4D9] text-white px-4 py-2 text-xs hover:brightness-110"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Tablet, Desktop, and 4K View */}
      <div className="hidden sm:block bg-white h-auto lg:min-h-screen flex items-center px-4 sm:px-6 lg:px-8 2xl:px-12 relative py-15 sm:py-12 lg:py-0 mt-20">
  <div className="w-full sm:w-3/4 lg:w-1/2">
    <h1
      className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-black leading-tight mb-6 sm:ml-4 lg:ml-10 2xl:ml-12"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <span className="text-blue-500" style={{ color: "#00B4D9" }}>Let's </span>
      Pioneer.Produce.Propel <br />
      Innovate At <span className="text-blue-500" style={{ color: "#00B4D9" }}>Azhizen</span>
    </h1>

    <p className="text-gray-600 mb-8 max-w-sm sm:max-w-md lg:max-w-lg 2xl:max-w-xl text-sm sm:text-base lg:text-lg 2xl:text-xl sm:ml-4 lg:ml-10 2xl:ml-12">
      Master in-demand skills with expert-led training in MedTech, DeepTech, EduTech, and beyond.
      Kickstart your career journey with innovation, insight, and industry excellence.
    </p>

    <div className="flex space-x-4 sm:ml-4 lg:ml-10 2xl:ml-12">
      <button
        className="text-white px-4 sm:px-5 lg:px-6 2xl:px-8 py-2 sm:py-2.5 lg:py-3 2xl:py-4 rounded-full transition-all hover:brightness-110 w-28 sm:w-32 lg:w-40 2xl:w-48 text-xs sm:text-sm lg:text-base 2xl:text-lg"
        style={{ background: "linear-gradient(135deg, #0078B4 0%, #00B4D9 100%)" }}
        onClick={handleContactClick}
      >
        Contact us
      </button>
      <button
        className="text-white px-4 sm:px-5 lg:px-6 2xl:px-8 py-2 sm:py-2.5 lg:py-3 2xl:py-4 rounded-full transition-all hover:brightness-110 w-28 sm:w-32 lg:w-40 2xl:w-48 text-xs sm:text-sm lg:text-base 2xl:text-lg"
        style={{ backgroundColor: "#2A2A2A" }}
      >
        Join us
      </button>
    </div>
  </div>

  <div
    className="absolute right-0 w-1/3 sm:w-1/4 lg:w-1/5 2xl:w-1/6 h-full bg-gradient-to-br from-[#017FB8] to-[#01ABD3] blur-[35.5px] opacity-25 z-0 ipad-half-circle"
    style={{
      borderRadius: '591.69px 0 0 591.69px',
      top: '-20%',
      overflow: 'hidden',
    }}
  ></div>
</div>

    </div>
  );
};

export default HeroSection;