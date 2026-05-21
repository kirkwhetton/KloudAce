// AZ-104 — barrel export
// Combines all question-type sub-files into a single array for use by the app.
// Import the merged array:  import az104 from './data/AZ-104'
// Or import individual sets: import az104mcq from './data/AZ-104/az-104-mcq'
// ID range: AZ-104-001 – AZ-104-038, AZ-104-090 – AZ-104-114, AZ-104-115 – AZ-104-138 (Networking), AZ-104-139 – AZ-104-143 (CS: Identity), AZ-104-144 – AZ-104-148 (CS: VNet), AZ-104-149 – AZ-104-153 (CS: Storage), AZ-104-154 – AZ-104-173 (Compute), AZ-104-HS-001 – AZ-104-HS-008

import az104mcq       from "./az-104-mcq.js";
import az104flashcard from "./az-104-flashcard.js";
import az104tf        from "./az-104-tf.js";
import az104multi     from "./az-104-multi.js";
import az104image     from "./az-104-image.jsx";
import az104hotspot   from "./az-104-hotspot.jsx";
import az104task      from "./az-104-task.js";

export { az104mcq, az104flashcard, az104tf, az104multi, az104image, az104hotspot, az104task };

export const meta = {
  exam: "AZ-104",
  fullName: "Microsoft Azure Administrator",
};

const az104 = [
  ...az104mcq,
  ...az104flashcard,
  ...az104tf,
  ...az104multi,
  ...az104image,
  ...az104hotspot,
  ...az104task,
].sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);

export default az104;
