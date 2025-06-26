import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  // Seed States
  const states = await prisma.state.createMany({
    data: [
      { id: 1, value: 'Sindh' },
      { id: 2, value: 'Punjab' },
      { id: 3, value: 'Balochistan' },
      { id: 4, value: "Khyber Pakhtunkhwa" },
      { id: 5, value: 'Gilgit-Baltistan' },
    ],
    skipDuplicates: true,
  });
  

  // Seed Cities
  const cities = await prisma.city.createMany({
    data: [
        { id: 1, value: "Karachi", stateId: 1 },
        { id: 2, value: "Hyderabad", stateId: 1 },
        { id: 3, value: "Sukkur", stateId: 1 },
        { id: 4, value: "Larkana", stateId: 1 },
        { id: 5, value: "Mirpur Khas", stateId: 1 },
        { id: 6, value: "Nawabshah", stateId: 1 },
        { id: 7, value: "Jacobabad", stateId: 1 },
        { id: 8, value: "Shikarpur", stateId: 1 },
        { id: 9, value: "Khairpur", stateId: 1 },
        { id: 10, value: "Dadu", stateId: 1 },
        { id: 11, value: "Lahore", stateId: 2 },
        { id: 12, value: "Faisalabad", stateId: 2 },
        { id: 13, value: "Rawalpindi", stateId: 2 },
        { id: 14, value: "Multan", stateId: 2 },
        { id: 15, value: "Gujranwala", stateId: 2 },
        { id: 16, value: "Sialkot", stateId: 2 },
        { id: 17, value: "Bahawalpur", stateId: 2 },
        { id: 18, value: "Sargodha", stateId: 2 },
        { id: 19, value: "Sahiwal", stateId: 2 },
        { id: 20, value: "Sheikhupura", stateId: 2 },
        { id: 21, value: "Quetta", stateId: 3 },
        { id: 22, value: "Turbat", stateId: 3 },
        { id: 23, value: "Khuzdar", stateId: 3 },
        { id: 24, value: "Chaman", stateId: 3 },
        { id: 25, value: "Gwadar", stateId: 3 },
        { id: 26, value: "Dera Murad Jamali", stateId: 3 },
        { id: 27, value: "Zhob", stateId: 3 },
        { id: 28, value: "Loralai", stateId: 3 },
        { id: 29, value: "Sibi", stateId: 3 },
        { id: 30, value: "Dera Allah Yar", stateId: 3 },
        { id: 31, value: "Peshawar", stateId: 4 },
        { id: 32, value: "Mardan", stateId: 4 },
        { id: 33, value: "Mingora", stateId: 4 },
        { id: 34, value: "Kohat", stateId: 4 },
        { id: 35, value: "Abbottabad", stateId: 4 },
        { id: 36, value: "Dera Ismail Khan", stateId: 4 },
        { id: 37, value: "Swabi", stateId: 4 },
        { id: 38, value: "Nowshera", stateId: 4 },
        { id: 39, value: "Bannu", stateId: 4 },
        { id: 40, value: "Charsadda", stateId: 4 },
        { id: 41, value: "Gilgit", stateId: 5 },
        { id: 42, value: "Skardu", stateId: 5 },
        { id: 43, value: "Chilas", stateId: 5 },
        { id: 44, value: "Ghizer", stateId: 5 },
        { id: 45, value: "Astore", stateId: 5 },
        { id: 46, value: "Hunza", stateId: 5 },
        { id: 47, value: "Nagar", stateId: 5 },
        { id: 48, value: "Ghanche", stateId: 5 },
        { id: 49, value: "Kharmang", stateId: 5 },
        { id: 50, value: "Shigar", stateId: 5 },
      ],
    skipDuplicates: true,
  });

  // Seed Property Types
  const propertyTypes = await prisma.propertyType.createMany({
    data: [
      { id: 1, value: 'Home' },
      { id: 2, value: 'Plots' },
      { id: 3, value: 'Commercial' },
      { id: 4, value: 'CO-Work Space' },
    ],
    skipDuplicates: true,
  });

  // Seed Property Statuses
  const statuses = await prisma.propertyStatus.createMany({
    data: [
      { id: 1, value: 'Sell' },
      { id: 2, value: 'Rent' },
    ],
    skipDuplicates: true,
  });

  const propertyDetails = await prisma.propertyTypeDetail.createMany({
    data: [
      { id: 1, value: 'House', propertyTypeId: 1 },
      { id: 2, value: 'Flat', propertyTypeId: 1 },
      { id: 3, value: 'Upper Portion', propertyTypeId: 1 },
      { id: 4, value: 'Lower Portion', propertyTypeId: 1 },
      { id: 5, value: 'Farm House', propertyTypeId: 1 },
      { id: 6, value: 'Room', propertyTypeId: 1 },
      { id: 7, value: 'Penthouse', propertyTypeId: 1 },
      { id: 8, value: 'Residential Plot', propertyTypeId: 2 },
      { id: 9, value: 'Commercial Plot', propertyTypeId: 2 },
      { id: 10, value: 'Agriculture Land', propertyTypeId: 2 },
      { id: 11, value: 'Industrial Land', propertyTypeId: 2 },
      { id: 12, value: 'Plot File', propertyTypeId: 2 },
      { id: 13, value: 'Plot Form', propertyTypeId: 2 },
      { id: 14, value: 'Office', propertyTypeId: 3 },
      { id: 15, value: 'Shop', propertyTypeId: 3 },
      { id: 16, value: 'Warehouse', propertyTypeId: 3 },
      { id: 17, value: 'Factory', propertyTypeId: 3 },
      { id: 18, value: 'Building', propertyTypeId: 3 },
      { id: 19, value: 'Other', propertyTypeId: 3 },
      { id: 20, value: 'Office Room', propertyTypeId: 4 },
      { id: 21, value: 'Software House', propertyTypeId: 4 },
    ],
    skipDuplicates: true,
  });

  
  

  console.log('✅ Seeding completed!');
}

main()
  .catch((error) => {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
