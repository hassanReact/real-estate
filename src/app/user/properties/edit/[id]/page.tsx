import { prisma } from "@/lib/prisma";
import AddPropertyForm from "../../add/_components/AddPropertyForm";
import { notFound, redirect } from "next/navigation";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

interface Props {
  params: Promise<{ id: string }>
}

const EditPropertyPage = async ({ params }: Props) => {
  const [propertyTypes, propertyStatuses, PropertyTypeDetail, cities, state, property] = await Promise.all([
    prisma.propertyType.findMany(),
    prisma.propertyStatus.findMany(),
    prisma.propertyTypeDetail.findMany(),
    prisma.city.findMany(),
    prisma.state.findMany(),
    prisma.property.findUnique({
      where: {
        id: +(await params).id,
      },
      include: {
        location: true,
        feature: true,
        contact: true,
        images: true,
      },
    }),
  ]);

  const { getUser } = getKindeServerSession();
  const user = await getUser();
console.log(propertyTypes, propertyStatuses, PropertyTypeDetail, cities, state, property,"edit page");

  if (!property) return notFound();
  if (!user || property.userId !== user.id) redirect("/unauthorized");
  return (
    <AddPropertyForm
      city={cities}
      state={state}
      details={PropertyTypeDetail}
      types={propertyTypes}
      statuses={propertyStatuses}
      property={property}
      isEdit={true}
    />
  );
};

export default EditPropertyPage;
