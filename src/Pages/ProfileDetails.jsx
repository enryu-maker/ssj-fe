import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile, selectUser, updateUserProfile } from "../features/Auth/authSlice";
import Avatar from '../assets/avatar.jpeg'; // Default fallback image

const ProfileDetails = () => {
  const dispatch = useDispatch();
  const profile = useSelector(selectUser);
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [panCard, setPanCard] = useState('');
  const [address, setAddress] = useState('');
  const [gst, setGst] = useState('');
  const [imagePreview, setImagePreview] = useState(Avatar); // Default to Avatar
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({}); // Object to hold validation errors

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setName(profile.name || '');
      setEmail(profile.email || '');
      setMobile(profile.mobile_number || '');
      setPanCard(profile.pan_no || '');
      setAddress(profile.address || '');
      setGst(profile.gst_no || '');
      setImagePreview(profile.photo ? `https://api.saishraddhajewellers.com${profile.photo}` : Avatar);
    }
  }, [profile]);

  const validateInputs = () => {
    const newErrors = {};
    const mobilePattern = /^[6-9]\d{9}$/; // Mobile number should be a 10-digit number starting with 6-9
    const panPattern = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/; // PAN card format (e.g., ABCDE1234F)

    if (!mobilePattern.test(mobile)) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number.";
    }

    if (!panPattern.test(panCard)) {
      newErrors.panCard = "Please enter a valid PAN card number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSave = () => {
    if (!validateInputs()) return; // Stop if validation fails

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email); // Ensure email is included
    formData.append('address', address);
    formData.append('pan_no', panCard);
    formData.append('gst_no', gst);
    formData.append('mobile_number', mobile);

    if (image) {
      formData.append('photo', image); // Append image file
    }

    dispatch(updateUserProfile(formData)); // Dispatch the formData
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsLoading(true);
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setIsLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setName(profile.name || '');
    setEmail(profile.email || '');
    setMobile(profile.mobile_number || '');
    setPanCard(profile.pan_no || '');
    setAddress(profile.address || '');
    setGst(profile.gst_no || '');
    setImagePreview(profile.photo ? `https://api.saishraddhajewellers.com${profile.photo}` : Avatar);
    setErrors({}); // Clear errors on cancel
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  if (!profile) {
    return <div className="flex justify-center items-center h-screen text-lg text-gray-600">Loading...</div>;
  }

  return (
    <div className="w-full min-h-screen bg-gray-100 flex flex-col items-center pt-12 px-4 sm:px-6 md:px-8 lg:px-12">
      <div className="max-w-4xl w-full bg-white rounded-lg p-6 sm:p-8 lg:p-12">
        <h1 className="text-2xl sm:text-3xl font-semibold text-primary-color mb-6 sm:mb-8">Account Overview</h1>
        <div className="bg-white p-6 sm:p-8 rounded-lg">
          <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Personal Information</h2>
          {isEditing ? (
            <div>
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex flex-col items-center md:w-1/2">
                  <label className="text-gray-700 mb-2 text-lg">Profile Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-primary-color transition-colors duration-300 w-full"
                  />
                  {isLoading ? (
                    <div className="flex justify-center items-center mt-2">
                      <div className="loader"></div>
                    </div>
                  ) : (
                    <img src={imagePreview} alt="Profile Preview" className="mt-4 w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover" />
                  )}
                </div>
                <div className="flex flex-col md:w-1/2 space-y-4">
                  {[
                    { label: "Name", value: name, setter: setName },
                    { label: "Email", value: email, setter: () => {}, readonly: true }, // Email is readonly
                    { label: "Mobile", value: mobile, setter: setMobile, error: errors.mobile },
                    { label: "PAN Card", value: panCard, setter: setPanCard, error: errors.panCard },
                    { label: "Address", value: address, setter: setAddress },
                    { label: "GST", value: gst, setter: setGst },
                  ].map(({ label, value, setter, readonly, error }, index) => (
                    <div className="flex flex-col" key={index}>
                      <label className="text-gray-700 mb-2 text-lg">{label}</label>
                      {readonly ? (
                        <div className="border border-gray-300 p-3 rounded-md bg-gray-100 text-gray-700 text-lg w-full">
                          <span>{value}</span>
                        </div>
                      ) : (
                        <div>
                          <input
                            type="text"
                            value={value}
                            onChange={(e) => setter(e.target.value)}
                            readOnly={label === "Email"} // Make email field readonly
                            className={`border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-primary-color transition-colors duration-300 text-lg w-full ${error ? 'border-red-500' : ''}`} // Make other fields full width
                            placeholder={label}
                          />
                          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row justify-end space-x-0 md:space-x-4 mt-6 sm:mt-8">
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-700 transition-colors duration-300 w-full sm:w-auto text-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-primary-color text-white py-2 px-6 rounded-md hover:bg-primary-dark transition-colors duration-300 w-full sm:w-auto text-lg"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col-reverse md:flex-row gap-6">
              <div className="flex flex-col space-y-4 md:w-1/2">
                <p className="text-gray-700 text-lg"><strong>Name:</strong> {profile.name || '-'}</p>
                <p className="text-gray-700 text-lg"><strong>Email:</strong> {profile.email || '-'}</p>
                <p className="text-gray-700 text-lg"><strong>Mobile:</strong> {profile.mobile_number || '-'}</p>
                <p className="text-gray-700 text-lg"><strong>PAN Card:</strong> {profile.pan_no || '-'}</p>
                <p className="text-gray-700 text-lg"><strong>Address:</strong> {profile.address || '-'}</p>
                <p className="text-gray-700 text-lg"><strong>GST:</strong> {profile.gst_no || '-'}</p>
              </div>
              <div className="flex justify-center items-center md:w-1/2">
                <img
                  src={imagePreview}
                  alt="Profile"
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover"
                />
              </div>
            </div>
          )}
          {!isEditing && (
            <button
              onClick={handleEdit}
              className="mt-6 sm:mt-8 bg-primary-color text-white py-2 px-6 rounded-md hover:bg-primary-dark transition-colors duration-300 w-full sm:w-auto text-lg"
            >
              Edit Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;
