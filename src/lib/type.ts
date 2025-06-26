import { AreaType } from "@prisma/client";

interface Contact {
  email: string;
  name: string;
  phone: string;
}

export interface Features {
  area: number;
  areaType:AreaType
  bathrooms: number;
  bedrooms: number;
  hasBalcony: boolean;
  hasGarage: boolean;
  hasGarden: boolean;
  hasPool: boolean;
  hasGardenYard: boolean;
  hasSwimmingPool: boolean;
  parkingSpots: number;
  propertyId: number;
}

export interface PriceRange {
  minPrice: number;
  maxPrice: number;
  projectId: string;
}

export interface AuthorizedAgent {
  email: string;
  phone: string;
  projectId: string;
}

/* Removed duplicate Project interface to resolve duplicate identifier error. */

interface Images {
  id: number;
  url: string;
  propertyId: number;
}

interface Location {
  city: {
    id: number;
    value: string;
    stateId: number;
  };
  stateId: number;
}

export interface Property {
  price: string;
  description: string;
  name: string;
  feature: Features;
  status: {
    id:number
    value: string;
  };
  type: {
    value: string;
  };
  images: Images[];
  location: Location;
  contact: Contact;
}


export interface RealEstateProject {
  id: string
  name: string
  developerName: string
  images: string[]
  projectType: string
  projectStatus: string
  launchDate: string
  expectedCompletion: string
  city: string
  area: string
  googleMapsLink: string
  nearbyLandmarks: string
  userId: string
  availableUnits: string[]
  basicAmenities: string[]
  bookingProcedure: string
  developerPhone: string
  governmentApprovals: string[]
  luxuryFeatures: string[]
  masterPlan: string | null
  nearbyFacilities: string[]  // Changed from string to string[]
  paymentPlan: string
  registrationDetails: string
  rendersAndPlans: string[]
  siteImagesVideos: string[]
  sizesAndLayouts: string
  priceRange?: {
    id: string
    minPrice: number
    maxPrice: number
    projectId: string
  }
  authorizedAgents?: AuthorizedAgent[]
}

export interface AuthorizedAgent {
  id: string
  email: string
  phone: string
  projectId: string
}

// Use RealEstateProject as the main type
export type Project = RealEstateProject
