// AZ-305 — True / False
// Cards: AZ-305-103, 105, 108, 110, 112, 114, 116, 119

const az305tf = [
    {
        id: "AZ-305-TF-101",
        exam: "AZ-305",
        difficulty: "easy",
        type: "truefalse",
        category: "Design Storage Solutions",
        question: "Azure Storage Accounts can be configured for geo-redundant storage (GRS) to provide automatic replication of data to a secondary region for disaster recovery.",
        answer: true,
        explanation:
        "Geo-redundant storage (GRS) replicates your data asynchronously to a secondary region hundreds of miles away from the primary location, providing disaster recovery in case the primary region becomes unavailable.",
        learnUrl: "https://learn.microsoft.com/en-us/azure/storage/common/storage-redundancy",
    }
];

export default az305tf;