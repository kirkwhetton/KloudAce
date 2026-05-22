// AZ-305 — barrel export
// Combines all question-type sub-files into a single array for use by the app.
// Import the merged array:  import az305 from './data/AZ-305'
// Or import individual sets: import az305mcq from './data/AZ-305/az-305-mcq'

import az305mcq       from "./az-305-mcq.js";
import az305flashcard from "./az-305-flashcard.js";
import az305tf        from "./az-305-tf.js";
import az305multi     from "./az-305-multi.js";

export { az305mcq, az305flashcard, az305tf, az305multi };

export const meta = {
  exam: "AZ-305",
  fullName: "Microsoft Azure Solutions Architect Expert",
};

const az305 = [
  ...az305mcq,
  ...az305flashcard,
  ...az305tf,
  ...az305multi,
].sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);

export default az305;
