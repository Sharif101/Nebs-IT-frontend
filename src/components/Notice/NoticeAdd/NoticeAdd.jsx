import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ChevronDown, Calendar, Paperclip, X } from "lucide-react";
import { SuccessModal } from "@/components/Resources/SuccessModal";
import { Link } from "react-router-dom";

export default function NoticeAdd({ onClose }) {
  const [formData, setFormData] = useState({
    targetType: "Individual",
    noticeTitle: "",
    employeeId: "",
    employeeName: "",
    position: "",
    noticeType: [],
    publishDate: "",
    noticeBody: "",
  });

  const [errors, setErrors] = useState({});
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isNoticeTypeOpen, setIsNoticeTypeOpen] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const noticeTypeOptions = [
    "Warning / Disciplinary",
    "Performance Improvement",
    "Appreciation / Recognition",
    "Attendance / Leave Issue",
    "Payroll / Compensation",
    "Contract / Role Update",
    "Advisory / Personal Reminder",
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.noticeTitle)
      newErrors.noticeTitle = "Notice title is required";
    if (!formData.employeeId) newErrors.employeeId = "Employee ID is required";
    if (!formData.employeeName)
      newErrors.employeeName = "Employee name is required";
    if (!formData.position) newErrors.position = "Position is required";
    if (formData.noticeType.length === 0)
      newErrors.noticeType = "Select at least one notice type";
    if (!formData.publishDate)
      newErrors.publishDate = "Publish date is required";
    if (!formData.noticeBody) newErrors.noticeBody = "Notice body is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;

    console.log("Notice Form Data:", {
      ...formData,
      file: uploadedFile,
    });
    setShowSuccessModal(true);
  };

  const toggleNoticeType = (type) => {
    setFormData((prev) => ({
      ...prev,
      noticeType: prev.noticeType.includes(type)
        ? prev.noticeType.filter((t) => t !== type)
        : [...prev.noticeType, type],
    }));
    setErrors((prev) => ({ ...prev, noticeType: "" }));
  };

  const handleFileUpload = (file) => {
    if (file) setUploadedFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileUpload(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const removeFile = () => setUploadedFile(null);

  const noticeTypeRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (noticeTypeRef.current && !noticeTypeRef.current.contains(e.target)) {
        setIsNoticeTypeOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-full">
        <div className="mb-6 flex items-center gap-3">
          <Link to="/employee/database">
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-300 bg-white hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4 text-gray-600" />
            </button>
          </Link>
          <h1 className="text-xl font-semibold text-gray-900">
            Create a Notice
          </h1>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
          <p className="mb-6 text-sm text-gray-600">
            Please fill in the details below
          </p>

          <div className="mb-6 bg-[#F5F6FA] p-3 rounded">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span> Target Department(s) or
              Individual
            </label>
            <div className="relative">
              <select
                value={formData.targetType}
                onChange={(e) =>
                  setFormData({ ...formData, targetType: e.target.value })
                }
                className="w-full appearance-none rounded-md border border-gray-300 bg-gray-50 px-3 py-2.5 text-sm text-[#0EA5E9] focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Individual">Individual</option>
                <option value="All Department">All Department</option>
                <option value="Finance">Finance</option>
                <option value="Sales Team">Sales Team</option>
                <option value="Web Team">Web Team</option>
                <option value="Database Team">Database Team</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-gray-500" />
            </div>
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span> Notice Title
            </label>
            <Input
              placeholder="Write the Title of Notice"
              value={formData.noticeTitle}
              onChange={(e) =>
                setFormData({ ...formData, noticeTitle: e.target.value })
              }
              className="bg-white"
            />
            {errors.noticeTitle && (
              <p className="text-sm text-red-500 mt-1">{errors.noticeTitle}</p>
            )}
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                <span className="text-red-500">*</span> Employee ID
              </label>
              <div className="relative">
                <select
                  value={formData.employeeId}
                  onChange={(e) =>
                    setFormData({ ...formData, employeeId: e.target.value })
                  }
                  className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select employee ID</option>
                  <option value="EMP001">EMP001</option>
                  <option value="EMP002">EMP002</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-gray-500" />
                {errors.employeeId && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.employeeId}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                <span className="text-red-500">*</span> Employee Name
              </label>
              <Input
                placeholder="Enter employee full name"
                value={formData.employeeName}
                onChange={(e) =>
                  setFormData({ ...formData, employeeName: e.target.value })
                }
                className="bg-white"
              />
              {errors.employeeName && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.employeeName}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                <span className="text-red-500">*</span> Position
              </label>
              <div className="relative">
                <select
                  value={formData.position}
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                  className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="">Select position</option>
                  <option value="Engineering">Engineering</option>
                  <option value="HR">HR</option>
                  <option value="Sales">Sales</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-3 h-4 w-4 text-gray-500" />
                {errors.position && (
                  <p className="text-sm text-red-500 mt-1">{errors.position}</p>
                )}
              </div>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div ref={noticeTypeRef}>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                <span className="text-red-500">*</span> Notice Type
              </label>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsNoticeTypeOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  {formData.noticeType.length > 0
                    ? formData.noticeType.join(", ")
                    : "Select Notice Type"}
                  <ChevronDown
                    className={`h-4 w-4 text-gray-500 transition-transform ${
                      isNoticeTypeOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isNoticeTypeOpen && (
                  <div className="absolute z-20 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-md">
                    {noticeTypeOptions.map((option) => (
                      <label
                        key={option}
                        className="flex cursor-pointer items-center gap-2 px-3 py-2 text-sm hover:bg-gray-100"
                      >
                        <input
                          type="checkbox"
                          checked={formData.noticeType.includes(option)}
                          onChange={() => toggleNoticeType(option)}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        {option}
                      </label>
                    ))}
                  </div>
                )}
              </div>
              {errors.noticeType && (
                <p className="text-sm text-red-500 mt-1">{errors.noticeType}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                <span className="text-red-500">*</span> Publish Date
              </label>
              <div className="relative">
                <Input
                  type="date"
                  value={formData.publishDate}
                  onChange={(e) =>
                    setFormData({ ...formData, publishDate: e.target.value })
                  }
                  className="bg-white pr-10"
                />
                <Calendar className="pointer-events-none absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                {errors.publishDate && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.publishDate}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              <span className="text-red-500">*</span> Notice Body
            </label>
            <textarea
              placeholder="Enter the notice content here..."
              value={formData.noticeBody}
              onChange={(e) =>
                setFormData({ ...formData, noticeBody: e.target.value })
              }
              rows={6}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.noticeBody && (
              <p className="text-sm text-red-500 mt-1">{errors.noticeBody}</p>
            )}
          </div>

          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Upload Document
            </label>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`rounded-lg border-2 border-dashed p-8 text-center transition-colors ${
                isDragging
                  ? "border-blue-400 bg-blue-50"
                  : "border-blue-200 bg-blue-50/50"
              }`}
            >
              <p className="text-sm text-gray-600">
                <span className="font-medium text-blue-600">Upload</span>{" "}
                nominee profile image or drag and drop.
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Accepted File Type: jpg, png
              </p>
            </div>

            {uploadedFile && (
              <div className="mt-3 flex items-center gap-2 rounded-md border border-gray-200 bg-gray-50 p-2">
                <Paperclip className="h-4 w-4 text-gray-500" />
                <span className="flex-1 text-sm text-gray-700">
                  {uploadedFile.name}
                </span>
                <button
                  onClick={removeFile}
                  className="text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-end gap-3">
          <Link to="/employee/database">
            <Button
              variant="outline"
              className="min-w-[120px] border-gray-300 bg-transparent"
              onClick={onClose}
            >
              Cancel
            </Button>
          </Link>

          <Button
            variant="outline"
            className="min-w-[140px] border-blue-500 text-blue-600 hover:bg-blue-50 bg-transparent"
          >
            Save as Draft
          </Button>
          <Button
            className="min-w-[140px] bg-orange-500 hover:bg-orange-600 text-white"
            onClick={handleSubmit}
          >
            <span className="mr-1">✓</span> Publish Notice
          </Button>
        </div>
      </div>

      {/* SuccessModal component */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        noticeTitle={formData.noticeTitle}
      />
    </div>
  );
}
