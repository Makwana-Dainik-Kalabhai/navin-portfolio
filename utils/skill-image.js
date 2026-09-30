import photoshop from "../app/assets/svg/skills/photoshop.svg";
import illustrator from "../app/assets/svg/skills/illustrator.svg";
import indesign from "../app/assets/svg/skills/indesign.svg";
import canva from "../app/assets/svg/skills/canva.svg";
import figma from "../app/assets/svg/skills/figma.svg";
import afterEffect from "../app/assets/svg/skills/after-effect.svg";
import behance from "../app/assets/svg/skills/behance.svg";

export const skillsImage = (skill) => {
  const skillID = skill.toLowerCase();
  switch (skillID) {
    case "photoshop":
      return photoshop;

    case "illustrator":
      return illustrator;

    case "indesign":
      return indesign;

    case "canva":
      return canva;

    case "figma":
      return figma;

    case "after-effect":
      return afterEffect;

    case "behance":
      return behance;

    default:
      break;
  }
};
