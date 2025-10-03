import React, { useState } from 'react'
import { BackgroundBeamsWithCollision } from '../src/Components/BackgroundBeamsWithCollisionDemo.jsx';
import { Globe } from '@/Components/ui/globe.jsx';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    subject: ''
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First name required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number required';
    if (!formData.email.trim()) newErrors.email = 'Email required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email';
    if (!formData.subject.trim()) newErrors.subject = 'Subject required';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      console.log('Form submitted:', formData);
    } else {
      setErrors(newErrors);
    }
  };

return (
  <BackgroundBeamsWithCollision 
    beamGradient="linear-gradient(184deg, #4b8da8 0%, #38d9a9 52%, #155dfc 100%) " className={'h-[100vh]'}
  > 
    <div className="px-8 ">
      <h2 className="text-2xl relative z-20 md:text-4xl lg:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-[#4b8da8] via-[#38d9a9] to-[#155dfc] pt-16 mb-8">
        Contact Me.
      </h2>

      <div className='bg-black/80 backdrop-blur-sm rounded-lg min-w-[90%] sm:min-w-[85%] md:min-w-[80%] xl:min-w-[50%] 2xl:min-w-[60%] mx-auto relative z-20 overflow-hidden min-h-[40vh] sm:min-h-[45vh] md:min-h-[50vh] p-4 sm:p-6 md:p-8'>

       <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-0'>

          {/* Form */}
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:border-[#38d9a9]"
                  />
                  {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
                </div>
                <div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:border-[#38d9a9]"
                  />
                  {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
                </div>
              </div>
              
              <div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:border-[#38d9a9]"
                />
                {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
              </div>
              
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:border-[#38d9a9]"
                />
                {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <div>
                <textarea
                  name="subject"
                  placeholder="Subject"
                  rows="4"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/70 focus:outline-none focus:border-[#38d9a9] resize-none"
                />
                {errors.subject && <p className="text-red-400 text-sm mt-1">{errors.subject}</p>}
              </div>
              
              <button
                type="submit"
                className="w-full p-3 bg-gradient-to-r from-[#4b8da8] via-[#38d9a9] to-[#155dfc] text-white font-semibold rounded-lg hover:opacity-90 transition-opacity"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Globe */}
<div className="relative h-full flex justify-end pr-6">
  <div className="w-100 h-100 relative">
    <Globe className="!absolute !right-0 !left-auto !mx-0" />
  </div>
</div>

        </div>
      </div>
    </div>
  </BackgroundBeamsWithCollision>
)

}

export default Contact
