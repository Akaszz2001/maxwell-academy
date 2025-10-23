/* eslint-disable @typescript-eslint/no-explicit-any */
const DB_NAME = "ExamDB";
const DB_VERSION = 1;
let db: IDBDatabase | null = null;

// ---------- Initialize IndexedDB ----------
export const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;

      // Create examData store (subject, topic, class)
      if (!db.objectStoreNames.contains("examData")) {
        db.createObjectStore("examData", { keyPath: "id", autoIncrement: true });
      }

      // Create questions store (image, answer)
      if (!db.objectStoreNames.contains("questions")) {
        db.createObjectStore("questions", { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = () => {
      db = request.result;
      console.log("IndexedDB initialized successfully ✅");
      resolve(db);
    };

    request.onerror = () => {
      console.error("Failed to initialize IndexedDB ❌", request.error);
      reject(request.error);
    };
  });
};

// ---------- Add Data ----------
export const addExamData = async (data: { subject: string; topic: string; class: string }) => {
  if (!db) db = await initDB();
  const tx = db.transaction("examData", "readwrite");
  const store = tx.objectStore("examData");
  store.add(data);
  return new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
};

export const addQuestion = async (data: { image: Blob | string; answer: string }) => {
  if (!db) db = await initDB();
  const tx = db.transaction("questions", "readwrite");
  const store = tx.objectStore("questions");
  store.add(data);
  return new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
};

// ---------- Retrieve Data ----------
export const getExamData = async (): Promise<any[]> => {
  if (!db) db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db!.transaction("examData", "readonly");
    const store = tx.objectStore("examData");
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

export const getQuestions = async (): Promise<any[]> => {
  if (!db) db = await initDB();
  return new Promise((resolve, reject) => {
    const tx = db!.transaction("questions", "readonly");
    const store = tx.objectStore("questions");
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
};

// ---------- Manual Initialize Function ----------
export const initializeDatabase = async () => {
  try {
    console.log("here");
    
    await initDB();
  } catch (error) {
    console.error("Database initialization failed:", error);
  }
};
