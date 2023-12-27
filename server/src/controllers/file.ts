import fs from "fs";

export const writeToFile = async (data: any) => {
  try {
    fs.writeFileSync("output.txt", JSON.stringify(data, null, 2));
    console.log("Data written to file successfully!");
  } catch (err) {
    console.error("Error writing to file:", err);
  }
};

export const readFromFile = () => {
  try {
    const data = fs.readFileSync("output.txt", "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading from file:", err);
    return null;
  }
};

export const appendToFile = (data: any) => {
  try {
    const existingData = readFromFile() || [];
    existingData.push(data);

    fs.writeFileSync("output.txt", JSON.stringify(existingData, null, 2));
    console.log("Data appended to file successfully!");
  } catch (err) {
    console.error("Error appending to file:", err);
  }
};
