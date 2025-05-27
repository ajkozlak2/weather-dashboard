// : Define a City class with name and id properties]
import fs from 'fs/promises';
import path from 'path';

// : Define a City class with name and id properties
class City {
  public name: string;
  public id: string;
  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}

// : Complete the HistoryService class
class HistoryService {
  private filePath: string;
  private cities: City[];
  constructor() {
    this.filePath = path.join(process.cwd(), 'server', 'data', 'searchHistory.json');
    this.cities = [];
  }
  // : Define a read method that reads from the searchHistory.json file
 private async read() {
    try {
      const data = await fs.readFile(this.filePath, 'utf-8');
      this.cities = JSON.parse(data);
    } catch (error:any) {
      if (error.code === 'ENOENT') {
        // If the file does not exist, initialize with an empty array
        this.cities = [];
      } else {
        console.error('Error reading search history:', error);
        throw error;
      }
    }
 }
  // : Define a write method that writes the updated cities array to the searchHistory.json file
   private async write(cities: City[]) {
    try {
      await fs.writeFile(this.filePath, JSON.stringify(cities, null, 2), 'utf-8');
    } catch (error) {
      console.error('Error writing search history:', error);
      throw error;
    }
   }
  // : Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
   async getCities() {
    await this.read();
    return this.cities;
   }
  //  Define an addCity method that adds a city to the searchHistory.json file
   async addCity(city: string) {
    await this.read();
    const newCity = new City(city, Date.now().toString());
    this.cities.push(newCity);
    await this.write(this.cities);
    return newCity;
   }
  // * : Define a removeCity method that removes a city from the searchHistory.json file
   async removeCity(id: string) {
    await this.read();
    const index = this.cities.findIndex(city => city.id === id);
    if (index === -1) {
      throw new Error('City not found');
    }
    this.cities.splice(index, 1);
    await this.write(this.cities);
    return { message: 'City removed successfully' };
   }
}

export default new HistoryService();
