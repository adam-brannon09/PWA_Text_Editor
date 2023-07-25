// Import the 'openDB' function from the 'idb' module
import { openDB } from 'idb';

// The 'initdb' function opens the 'jate' database (or creates it if it doesn't exist)
// The second parameter is the version number of the database
// The 'upgrade' callback is called if this version number is greater than the existing stored version (or if the database doesn't exist yet)
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      // Check if an object store named 'jate' already exists in the database
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // Create an object store named 'jate' with a key path of 'id' and enable the autoIncrement option
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// The 'putDb' function takes some 'content' and adds it to the 'jate' object store in the 'jate' database
export const putDb = async (content) => {
  console.log('PUT to the database');
  // Open the database
  const jateDb = await openDB('jate', 1);
  // Begin a read/write transaction
  const tx = jateDb.transaction('jate', 'readwrite');
  // Get the 'jate' object store from the transaction
  const store = tx.objectStore('jate');
  // Put the 'content' in the object store, with an 'id' of 1
  const request = store.put({ id: 1, value: content });
  // Wait for the request to complete
  const result = await request;
  console.log(' Data saved to the database', result.value);
};

// The 'getDb' function retrieves data from the 'jate' object store in the 'jate' database
export const getDb = async () => {
  console.log('GET from the database');
  // Open the database
  const jateDb = await openDB('jate', 1);
  // Begin a read-only transaction
  const tx = jateDb.transaction('jate', 'readonly');
  // Get the 'jate' object store from the transaction
  const store = tx.objectStore('jate');
  // Get the item with an 'id' of 1 from the object store
  const request = store.get(1);
  // Wait for the request to complete
  const result = await request;
  result
    ? console.log('Data retrieved from the database', result.value)
    : console.log('Data not found in the database');
  // If 'result' is defined (i.e., if data was retrieved from the database), return it
  return result?.value;
};

// Call the 'initdb' function when the module is loaded to ensure the database is set up
initdb();
