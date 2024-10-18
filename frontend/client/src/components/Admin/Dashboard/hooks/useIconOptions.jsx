// src/hooks/useIconOptions.js
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import {
  FaUserGraduate,
  FaBook,
  FaLaptop,
  FaBrain,
  FaLeaf,
  FaPenAlt,
} from "react-icons/fa";
import { RiGovernmentLine } from "react-icons/ri";
import { BsBuildingAdd } from "react-icons/bs";
import { AiOutlineFileProtect } from "react-icons/ai";
import { FaConnectdevelop, FaSchoolCircleCheck } from "react-icons/fa6";


export const useIconOptions = () => {

  const iconOptions = [
    {
      name: "Teachers Education",
      icon: <LiaChalkboardTeacherSolid className="text-5xl" />,
    },
    {
      name: "Teacher Professional Development",
      icon: <FaUserGraduate className="text-5xl" />,
    },
    {
      name: "Ministry of Education",
      icon: <FaConnectdevelop className="text-5xl" />,
    },
    {
      name: "IT and EdTech",
      icon: <RiGovernmentLine className="text-5xl" />,
    },
    {
      name: "Buildings and Facilities",
      icon: <BsBuildingAdd className="text-5xl" />,
    },
    {
      name: "Quality Assurance",
      icon: <AiOutlineFileProtect className="text-5xl" />,
    },
    {
      name: "Educational Research",
      icon: <FaBook className="text-5xl" />,
    },
    {
      name: "Information Technology in Schools",
      icon: <FaLaptop className="text-5xl" />,
    },
    {
      name: "Inclusion and Neuro-divergence",
      icon: <FaBrain className="text-5xl" />,
    },
    {
      name: "Student Wellbeing and Enrichment",
      icon: <FaLeaf className="text-5xl" />,
    },
    {
      name: "Assessment and Examination",
      icon: <FaPenAlt className="text-5xl" />,
    },
    {
      name: "School Governance",
      icon: <FaSchoolCircleCheck className="text-5xl" />,
    },

  ];

  return iconOptions;
};
