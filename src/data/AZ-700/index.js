// AZ-700 — barrel export
// Combines all question-type sub-files into a single sorted array.
// Import merged:    import az700 from './data/AZ-700'
// Import by type:   import { az700mcq } from './data/AZ-700'
// ID range: AZ-700-101 – AZ-700-125 (mcq/tf/task), AZ-700-126 – AZ-700-127 (image), AZ-700-HS-101+ (hotspot)

import az700mcq     from "./az-700-mcq.js";
import az700tf      from "./az-700-tf.js";
import az700task    from "./az-700-task.js";
import az700image   from "./az-700-image.jsx";
import az700hotspot from "./az-700-hotspot.jsx";

export { az700mcq, az700tf, az700task, az700image, az700hotspot };

export const meta = {
  exam: "AZ-700",
  fullName: "Microsoft Azure Network Engineer",
};

const az700 = [
  ...az700mcq,
  ...az700tf,
  ...az700task,
  ...az700image,
  ...az700hotspot,
].sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);

export default az700;
