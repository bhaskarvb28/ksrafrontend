import {
  getBuildings,
  getBuilding,
  createBuilding,
  updateBuilding,
  addDiscipline,
  removeDiscipline,
  addEvent,
  removeEvent,
  createLane,
  updateLane,
  deleteLane,
  deleteBuilding,
} from "../api/building.api"

export class BuildingService {
  static getBuildings = getBuildings

  static getBuilding = getBuilding

  static createBuilding = createBuilding

  static updateBuilding = updateBuilding

  static addDiscipline = addDiscipline

  static removeDiscipline = removeDiscipline

  static addEvent = addEvent

  static removeEvent = removeEvent

  static createLane = createLane

  static updateLane = updateLane

  static deleteLane = deleteLane

  static deleteBuilding = deleteBuilding
}
