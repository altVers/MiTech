import { makeAutoObservable } from "mobx";

export default class DeviceStore {
  constructor() {
    this._types = [];
    this._brands = [];
    this._devices = [];
    this._selectedType = {};
    this._selectedBrand = {};
    this._page = 1;
    this._totalCount = 0;
    this._limit = 3;
    makeAutoObservable(this);
  }

  setTypes(types) {
    this._types = types;
  }
  get types() {
    return this._types;
  }
  setBrands(brands) {
    this._brands = brands;
  }
  get brands() {
    return this._brands;
  }
  setDevices(devices) {
    this._devices = devices;
  }
  get devices() {
    return this._devices;
  }
  setSelectedType(type) {
    this.setPage = 1
    this._selectedType = type;
  }
  get selectedType() {
    return this._selectedType;
  }
  setSelectedBrand(brand) {
    this._selectedBrand = brand;
  }
  get selectedBrand() {
    return this._selectedBrand;
  }
  setPage(page) {
    this._page = page;
  }
  get page() {
    return this._page;
  }
  setTotalCount(totalCount) {
    this._totalCount = totalCount;
  }
  get totalCount() {
    return this._totalCount;
  }
  setLimit(limit) {
    this._limit = limit;
  }
  get limit() {
    return this._limit;
  }
}
