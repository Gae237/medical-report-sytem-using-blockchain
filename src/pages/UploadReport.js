import React, { useState }  from 'react';


export default function UploadReport() {
  const [formData, setFormData] = useState({
    patient: "",
    title: "",
    description: "",
    file: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement IPFS upload + smart contract logic
    console.log("Submitting report:", formData);
    alert("Report submitted (not yet saved).");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center px-4 py-10">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-xl">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Upload Medical Report
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 text-sm text-gray-600">Patient Name</label>
            <input
              type="text"
              name="patient"
              value={formData.patient}
              onChange={handleChange}
              placeholder="e.g. Jane Doe"
              className="w-full px-4 py-2 border rounded-lg border-gray-300"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-600">Report Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Blood Test"
              className="w-full px-4 py-2 border rounded-lg border-gray-300"
              required
            />
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-600">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Optional description"
              className="w-full px-4 py-2 border rounded-lg border-gray-300"
              rows={3}
            ></textarea>
          </div>

          <div>
            <label className="block mb-1 text-sm text-gray-600">Report File</label>
            <input
              type="file"
              name="file"
              accept=".pdf,.jpg,.png"
              onChange={handleChange}
              className="w-full"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Upload Report
          </button>
        </form>
      </div>
    </div>
  );
}
