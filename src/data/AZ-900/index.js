// AZ-900 — barrel export
// Combines all question-type sub-files into a single array for use by the app.
// Import the merged array:  import az900 from './data/AZ-900'
// Or import individual sets: import az900mcq from './data/AZ-900/az-900-mcq'

import az900mcq       from "./az-900-mcq.js";
import az900flashcard from "./az-900-flashcard.js";
import az900tf        from "./az-900-tf.js";
import az900multi     from "./az-900-multi.js";

export { az900mcq, az900flashcard, az900tf, az900multi };

export const meta = {
  exam: "AZ-900",
  fullName: "Microsoft Azure Fundamentals",
};

const az900 = [
  ...az900mcq,
  ...az900flashcard,
  ...az900tf,
  ...az900multi,
].sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);

export default az900;
