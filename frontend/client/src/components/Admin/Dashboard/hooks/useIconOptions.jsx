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
import { useTranslation } from 'react-i18next'; // Import the hook

export const useIconOptions = () => {
  const { t } = useTranslation('navbar'); // Use translation for topics

  const iconOptions = [
    {
      name: t("topics.Teacher Education"),
      icon: <LiaChalkboardTeacherSolid className="text-8xl" />,
    },
    {
      name: t("topics.Teacher Professional Development"),
      icon: <FaUserGraduate className="text-5xl" />,
    },
    {
      name: t("topics.Ministry of Education"),
      icon: <FaConnectdevelop className="text-5xl" />,
    },
    {
      name: t("topics.IT and EdTech"),
      icon: <RiGovernmentLine className="text-5xl" />,
    },
    {
      name: t("topics.Buildings and Facilities"),
      icon: <BsBuildingAdd className="text-5xl" />,
    },
    {
      name: t("topics.Quality Assurance"),
      icon: <AiOutlineFileProtect className="text-5xl" />,
    },
    {
      name: t("topics.Educational Research"),
      icon: <FaBook className="text-5xl" />,
    },
    {
      name: t("topics.Information Technology in Education"),
      icon: <FaLaptop className="text-5xl" />,
    },
    {
      name: t("topics.Inclusion and Neuro-divergence"),
      icon: <FaBrain className="text-5xl" />,
    },
    {
      name: t("topics.Student Wellbeing and Enrichment"),
      icon: <FaLeaf className="text-5xl" />,
    },
    {
      name: t("topics.Assessment and Examination"),
      icon: <FaPenAlt className="text-5xl" />,
    },
  ];

  return iconOptions;
};
