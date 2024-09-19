// src/hooks/useIconOptions.js
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import {
  FaUserGraduate,
  // FaSchoolCircleCheck,
  FaBook,
  FaLaptop,
  FaBrain,
  FaLeaf,
  FaPenAlt,
} from "react-icons/fa";
import { RiGovernmentLine } from "react-icons/ri";
import { BsBuildingAdd } from "react-icons/bs";
import { AiOutlineFileProtect } from "react-icons/ai";
import { FaConnectdevelop } from "react-icons/fa6";

export const useIconOptions = () => {
  const iconOptions = [
    {
      name: "Teacher Education",
      icon: <LiaChalkboardTeacherSolid className="text-3xl" />,
    },
    {
      name: "Teacher Professional Development",
      icon: <FaUserGraduate className="text-3xl" />,
    },
    // {
    //   name: "School Governance",
    //   icon: <FaSchoolCircleCheck className="text-3xl" />,
    // },
    {
      name: "Ministry of Education",
      icon: <FaConnectdevelop className="text-3xl" />,
    },
    {
      name: "IT and EdTech",
      icon: <RiGovernmentLine className="text-3xl" />,
    },
    {
      name: "Buildings and Facilities",
      icon: <BsBuildingAdd className="text-3xl" />,
    },
    {
      name: "Quality Assurance",
      icon: <AiOutlineFileProtect className="text-3xl" />,
    },
    { name: "Educational Research", icon: <FaBook className="text-3xl" /> },
    {
      name: "Information Technology in Education",
      icon: <FaLaptop className="text-3xl" />,
    },
    {
      name: "Inclusion and Neuro-divergence",
      icon: <FaBrain className="text-3xl" />,
    },
    {
      name: "Student Wellbeing and Enrichment",
      icon: <FaLeaf className="text-3xl" />,
    },
    {
      name: "Assessment and Examination",
      icon: <FaPenAlt className="text-3xl" />,
    },
  ];

  return iconOptions;
};
