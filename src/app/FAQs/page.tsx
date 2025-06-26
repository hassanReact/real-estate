import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"; // ShadCN Accordion
import { Card } from "@/components/ui/card"; // ShadCN Card for styling

export default function FAQPage() {
  return (
    <div className="w-full px-4 sm:px-10 lg:px-16 mt-10">
      <h1 className="md:text-5xl text-3xl text-primary font-bold text-center mb-5">Still Have Questions?</h1>
      <h2 className="text-xl  text-center mb-3">Check out our FAQs.</h2>

      <Card className="w-full p-6 bg-background text-foreground">
        <Accordion type="single" collapsible>

          <AccordionItem value="item-1">
            <AccordionTrigger className=" text-lg md:text-xl  flex items-center gap-2 hover:no-underline ">
              How do I search for properties on ZYCK Property?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600 md:text-lg">
              Our advanced filters, right on the front page, let you search for property at your convenience. Make a shortlist by clicking the location, kind of property you're interested in, price range, and selection criteria.            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-lg md:text-xl  flex items-center gap-2 hover:no-underline ">
              How can I advertise to sell or let my property?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Yes! ZYCK Property is the easiest way to sell or rent your property. All you have to do is sign up and input the property information, and we will take care of getting it seen by the buyer or tenant.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3">
            <AccordionTrigger className="text-lg md:text-xl  flex items-center gap-2 hover:no-underline ">
              Are the properties verified on ZYCK Property?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Yes, we ensure any property on our website comes from trusted sources and verified owners. We make efforts to offer you listings in the most correct and reliable manner.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4">
            <AccordionTrigger className="text-lg md:text-xl  flex items-center gap-2 hover:no-underline ">
              How do I contact an agent or landlord through ZYCK Property?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              You can refer to the contact details provided in the listing of properties for sale to contact the agent or landlord. You can also reach out to our customer service team for assistance concerning specific transactions.
            </AccordionContent>
          </AccordionItem>

          {/* FAQ 4 */}
          <AccordionItem value="item-5">
            <AccordionTrigger className="text-lg md:text-xl   flex items-center gap-2 hover:no-underline ">
              Do you have neighborhood insights?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Yes! We offer more than 34 detailed neighborhood map overlays to help you find a neighborhood, community vibe, and all the local amenities.
            </AccordionContent>
          </AccordionItem>

          {/* FAQ 5 */}
          <AccordionItem value="item-6">
            <AccordionTrigger className="text-lg md:text-xl  flex items-center gap-2 hover:no-underline ">
              Do I get listed for free?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Yes! No listing fee on ZYCK Property. You only pay when your property is sold successfully.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-7">
            <AccordionTrigger className="text-lg md:text-xl  flex items-center gap-2 hover:no-underline ">
              How can I book a property visit?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              To book a property visit, you can simply contact the agent or landlord using the contact details provided in the listing or reach out to us for further assistance.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-9">
            <AccordionTrigger className="text-lg md:text-xl  flex items-center gap-2 hover:no-underline ">
              Can I save my favorite properties on ZYCK Property?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              Yes, you can create an account to save your favorite properties and receive updates when there are changes or new listings that match your preferences.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-10">
            <AccordionTrigger className="text-lg md:text-xl  flex items-center gap-2 hover:no-underline ">
              What areas do you cover for property listings?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              We are servicing cities of Pakistan such as Karachi, Lahore, Islamabad, etc., catering to both residential and commercial properties.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-11">
            <AccordionTrigger className="text-lg md:text-xl  flex items-center gap-2 hover:no-underline ">
              What support can I access if I need help?
            </AccordionTrigger>
            <AccordionContent className="text-gray-600">
              You may reach out to our support team through email at [support@zyckproperty.com] or call us at [phone number]. We'll be more than happy to help you with your question.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </div>
  );
}
