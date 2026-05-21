import az104image   from "./az-104-image.jsx";
import az104hotspot from "./az-104-hotspot.jsx";

export const meta = {
  exam: "AZ-104",
  fullName: "Microsoft Azure Administrator",
};

const az104 = [...az104image, ...az104hotspot];
export default az104;
