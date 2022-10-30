import { openDB } from 'idb';

const initdb = async () =>
  openDB('jote', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jote')) {
        console.log('jote database already exists');
        return;
      }
      db.createObjectStore('jote', { keyPath: 'id', autoIncrement: true });
      console.log('jote database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const joteDB = await openDB("jote", 1);
  const tx = joteDB.transaction("jote", "readwrite");
  const store = tx.objectStore("jote");
  const request = store.put({ jote: content });
  const result = await request;
  console.log("logged to the database", result);
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const joteDB = await openDB("jote", 1);
  const tx = joteDB.transaction("jote", "readonly");
  const store = tx.objectStore("jote");
  const request = store.getAll();
  const result = await request;
  console.log(result);
};

initdb();
