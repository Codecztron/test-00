import React, { useState, useEffect } from "react";
import { UniversityData } from "../types";

interface UniversitySelectionProps {
  data: UniversityData[] | null;
  onSelectionChange: (university: string, major: string) => void;
}

const UniversitySelection: React.FC<UniversitySelectionProps> = ({
  data,
  onSelectionChange,
}) => {
  const [selectedUniversity, setSelectedUniversity] = useState<string>("");
  const [selectedMajor, setSelectedMajor] = useState<string>("");
  const [universities, setUniversities] = useState<string[]>([]);
  const [majors, setMajors] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      const uniqueUniversities = Array.from(
        new Set(data.map((item) => item.UNIV)),
      );
      setUniversities(uniqueUniversities);
      setSelectedUniversity(uniqueUniversities[0] ?? ""); // Set default university
    }
  }, [data]);

  useEffect(() => {
    if (data && selectedUniversity) {
      const filteredMajors = data
        .filter((item) => item.UNIV === selectedUniversity)
        .map((item) => item.JURUSAN);
      setMajors(filteredMajors);
      setSelectedMajor(filteredMajors[0] ?? ""); // Set default major
    }
  }, [data, selectedUniversity]);

  useEffect(() => {
    if (selectedUniversity && selectedMajor) {
      onSelectionChange(selectedUniversity, selectedMajor);
    }
  }, [selectedUniversity, selectedMajor]);

  return (
    <div className="mb-4">
      <h3 className="text-xl font-bold mb-2">
        Pilihan Universitas dan Jurusan
      </h3>
      <div className="mb-2">
        <label htmlFor="university" className="block mb-1">
          Pilih Universitas
        </label>
        <select
          id="university"
          value={selectedUniversity}
          onChange={(e) => setSelectedUniversity(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {universities.map((uni) => (
            <option key={uni} value={uni}>
              {uni}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-2">
        <label htmlFor="major" className="block mb-1">
          Pilih Jurusan
        </label>
        <select
          id="major"
          value={selectedMajor}
          onChange={(e) => setSelectedMajor(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {majors.map((major) => (
            <option key={major} value={major}>
              {major}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default UniversitySelection;
