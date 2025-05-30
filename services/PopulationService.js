const { sequelize } = require('../models');
const brandData = require("../data/brands.json")
const usersData = require("../data/users.json")
const colorData = require("../data/colors.json")
const modelData = require("../data/models.json")
const guitarData = require("../data/guitars.json")

class PopulationService {
  constructor(db) {
    this.client = db.sequelize;
    this.User = db.User;
    this.Guitar = db.Guitar;
    this.Color = db.Color;
    this.Brand = db.Brand;
    this.Model = db.Model;
  }

  async populateDatabase() {
    try {
      if (!this.isPopulated) {
        for (const item of brandData) {
          const existingBrands = await this.Brand.findOne({ where: { id: item.Id } });
          if (!existingBrands) {
            await this.client.query(item.query);
          }
        }
        for (const item of colorData) {
          const existingColors = await this.Color.findOne({ where: { id: item.Id } });
          if (!existingColors) {
            await this.client.query(item.query);
          }
        }
        for (const item of modelData) {
          const existingModels = await this.Model.findOne({ where: { id: item.Id } });
          if (!existingModels) {
            await this.client.query(item.query);
          }
        }
        for (const item of guitarData) {
          const existingGuitars = await this.Guitar.findOne({ where: { id: item.Id } });
          if (!existingGuitars) {
            await this.client.query(item.query);
          }
        }
        for (const item of usersData) {
          const existingUsers = await this.User.findOne({ where: { id: item.Id } });
          if (!existingUsers) {
            await this.client.query(item.query);
          }
        }
        this.isPopulated = true;
      }
    } catch (error) {
      console.error("Error populating database in PopulationService:", error);
      throw error; // Important! Rethrow so route can return 500 properly
    }
  }
}

module.exports = PopulationService;
