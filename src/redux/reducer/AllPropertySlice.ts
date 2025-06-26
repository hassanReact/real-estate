import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { boolean } from "zod";

interface PropertyType {
    id: number;
    name: string;
    description: string;
    price: number;
    userId: string;
    typeId: number;
    statusId: number;
    DetailId: number;
    createdAt: string;
    type: PropertyType;
    status: PropertyStatus;
    location: PropertyLocation;
    feature: PropertyFeature;
    images: PropertyImage[];
    contact: PropertyContact;
  }
  
  interface PropertyType {
    id: number;
    value: string;
    created: string;
  }
  
  interface PropertyStatus {
    id: number;
    value: string;
    created: string;
  }
  
  interface PropertyLocation {
    city: City;
    stateId: number;
  }
  
  interface City {
    id: number;
    value: string;
    stateId: number;
    createdAt: string;
  }
  
  interface PropertyFeature {
    id: number;
    bedrooms: number;
    bathrooms: number;
    parkingSpots: number;
    area: number;
    hasSwimmingPool: boolean;
    hasGardenYard: boolean;
    hasBalcony: boolean;
    propertyId: number;
    areaType: string;
    created: string;
  }
  
  interface PropertyImage {
    id: number;
    url: string;
    propertyId: number;
    createdAt: string;
  }
  
  interface PropertyContact {
    id: number;
    name: string;
    phone: string;
    email: string;
    propertyId: number;
    createdAt: string;
  }
  
  
interface PropertyState {
  allPropertyList: PropertyType[] | null;
  loader: boolean;
}

const initialState: PropertyState = {
  allPropertyList: null,
  loader: true,
};

const AllPropertySlice = createSlice({
  name: "propertyList",
  initialState,
  reducers: {
    listProperty: (state, action: PayloadAction<PropertyType[]>) => {
      state.allPropertyList = action.payload;
      state.loader = false;
    },
    removeListProperty: (state) => {
      state.allPropertyList = null;
      state.loader = false;
    },
  },
});

export default AllPropertySlice;

export const { listProperty, removeListProperty } = AllPropertySlice.actions;